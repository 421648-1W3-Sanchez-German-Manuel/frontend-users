import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import {
  Observable,
  catchError,
  defer,
  finalize,
  firstValueFrom,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { API } from '../config/api.config';
import { SILENT_AUTH_CHECK } from '../interceptors/auth.interceptor';
import { ApiError } from '../models/problem-details.model';
import { TokenStoreService } from './token-store.service';
import {
  ActivateAccountRequest,
  GestorRegistrationRequest,
  LoginChallengeResponse,
  LoginRequest,
  OnboardingRequest,
  PasswordChangeRequest,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  ProfessorRegistrationRequest,
  ResendActivationRequest,
  SessionResponse,
  StudentRegistrationRequest,
  TermsOfService,
  Verify2faRequest,
  MeResponse,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStore = inject(TokenStoreService);

  /** Name of the Web Lock that serializes refresh() across tabs — see postRefresh(). */
  private static readonly REFRESH_LOCK = 'fu-auth-refresh';

  private refreshInFlight$: Observable<SessionResponse> | null = null;
  private silentRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  login(body: LoginRequest): Observable<LoginChallengeResponse> {
    return this.http.post<LoginChallengeResponse>(API.login, body);
  }

  /**
   * The server sets fu_at/fu_rt as Set-Cookie; only expiresIn arrives here.
   * Chains a GET /me before completing: it's the only way to know
   * roles/gates now that there's no JWT to decode, and the caller
   * (login-flow-state, guards) needs those claims already populated as soon
   * as this emits — that's why it uses switchMap instead of a separate
   * subscription.
   */
  verify2fa(body: Verify2faRequest): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(API.verify2fa, body).pipe(
      tap((session) => this.scheduleSilentRefresh(session.expiresIn)),
      switchMap((session) => this.populateClaims(session))
    );
  }

  /**
   * Single-flight refresh: concurrent callers share the same in-flight
   * request. `silent` keeps the interceptor from redirecting to /login if
   * THIS call fails — used by restoreSession() on startup, where a 401
   * without fu_rt is an anonymous visitor, not a lost session (see there).
   */
  refresh(opts: { silent?: boolean } = {}): Observable<SessionResponse> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    // No body: fu_rt travels on its own, as a cookie — the browser attaches it.
    const context = new HttpContext().set(SILENT_AUTH_CHECK, opts.silent ?? false);
    this.refreshInFlight$ = this.postRefresh(context).pipe(
      tap((session) => this.scheduleSilentRefresh(session.expiresIn)),
      switchMap((session) => this.populateClaims(session)),
      shareReplay(1),
      finalize(() => {
        this.refreshInFlight$ = null;
      })
    );
    return this.refreshInFlight$;
  }

  /**
   * refreshInFlight$ is per-instance — one per tab — so it doesn't prevent
   * two tabs from sending POST /auth/refresh with the same fu_rt at once
   * (two F5s, or two tabs opening together after restoreSession()). The
   * backend rotates the jti on every refresh and revokes the ENTIRE family on
   * reuse (AuthService.refresh in users), so that race kicks out every tab
   * without anyone doing anything wrong.
   *
   * navigator.locks.request serializes the POST across tabs of the same
   * origin: the first one sends it, the rest wait their turn. By the time
   * their turn comes, the browser already has the fu_rt rotated by the
   * previous one — its POST uses the current jti, not the one that just got
   * marked as rotated.
   */
  private postRefresh(context: HttpContext): Observable<SessionResponse> {
    const request = () => this.http.post<SessionResponse>(API.refresh, {}, { context });
    if (typeof navigator === 'undefined' || !navigator.locks) {
      return request();
    }
    // lib.dom types LockGrantedCallback<T> as (lock) => T, without the
    // PromiseLike<T> that the real spec does allow (LockManager waits for the
    // returned promise to resolve before releasing the lock): T gets inferred
    // as Promise<SessionResponse>, hence the cast — the runtime unwraps the
    // promise anyway.
    return defer(() =>
      from(
        navigator.locks.request(AuthService.REFRESH_LOCK, () =>
          firstValueFrom(request())
        ) as unknown as Promise<SessionResponse>
      )
    );
  }

  /**
   * Populates tokenStore from /me and re-emits the original SessionResponse.
   * Marks the session as established BEFORE calling /me: an account that just
   * logged in but has a pending gate (PENDING_COURSE, onboarding) makes /me
   * respond 403 — the login itself still succeeded, and authGuard needs to
   * see isAuthenticated()=true so it doesn't bounce the interceptor's
   * redirect (to /cuenta-pendiente or /onboarding) back to /login.
   */
  private populateClaims(session: SessionResponse): Observable<SessionResponse> {
    this.tokenStore.markSessionEstablished();
    return this.me().pipe(
      tap((me) => this.tokenStore.setFromMe(me)),
      map(() => session)
    );
  }

  private scheduleSilentRefresh(expiresInSeconds: number): void {
    if (this.silentRefreshTimer) clearTimeout(this.silentRefreshTimer);
    const fireInMs = Math.max((expiresInSeconds - 60) * 1000, 5000);
    this.silentRefreshTimer = setTimeout(() => {
      this.refresh().subscribe({ error: () => void 0 });
    }, fireInMs);
  }

  logout(): Observable<void> {
    // No body: fu_rt travels on its own, as a cookie. The server reads it
    // from there to revoke the family, and responds with fu_at/fu_rt set to Max-Age=0.
    return this.http.post<void>(API.logout, {}).pipe(
      catchError(() => of(void 0)),
      finalize(() => this.clearLocalSession())
    );
  }

  clearLocalSession(): void {
    if (this.silentRefreshTimer) clearTimeout(this.silentRefreshTimer);
    this.tokenStore.clear();
  }

  /**
   * On app boot (see app.config.ts): the only way to know whether there's a
   * session is to ask the server. Never fails or blocks startup — a 401 here
   * is the normal case of a visitor without a session, not an error.
   * SILENT_AUTH_CHECK tells the interceptor not to redirect to /login for
   * this particular 401: it would do so over the public route the person
   * actually meant to open (login, activation via link, etc).
   */
  restoreSession(): Observable<void> {
    const context = new HttpContext().set(SILENT_AUTH_CHECK, true);
    return this.http.get<MeResponse>(API.me, { context }).pipe(
      tap((me) => this.tokenStore.setFromMe(me)),
      switchMap(() => this.silentRefresh()),
      catchError((error: unknown) => {
        // A gate (pending-account, onboarding-pending, password-change) is
        // NOT "no session": the cookie is valid, the interceptor already
        // redirected to the gate screen, and that route needs
        // isAuthenticated()=true so it doesn't get bounced to /login. Only
        // truly clear the session on not-authenticated/session-closed/
        // session-superseded.
        const isGate =
          error instanceof ApiError &&
          !['not-authenticated', 'session-closed', 'session-superseded'].includes(error.slug ?? '');
        if (isGate) {
          this.tokenStore.markSessionEstablished();
          return this.silentRefresh();
        }

        // fu_at (access-ttl: PT10M) could have expired with fu_rt still alive
        // (refresh-ttl: P7D) — e.g. the tab was closed for more than 10
        // minutes. { silent: true } is needed here and not in
        // silentRefresh(): an anonymous visitor on a public route also has no
        // fu_rt, and that 401 is the normal case for this bootstrap, not a
        // lost session that warrants sending them to /login.
        return this.refresh({ silent: true }).pipe(
          map(() => void 0),
          catchError(() => {
            this.clearLocalSession();
            return of(void 0);
          })
        );
      })
    );
  }

  /**
   * scheduleSilentRefresh's timer lives in memory: it doesn't survive an F5.
   * Without this extra refresh after restoring the session, fu_at stays
   * un-renewed until it expires (~10 min) and the interceptor sends the user
   * to /login even though fu_rt is still alive. The error is ignored on
   * purpose: restoreSession() never fails, and if fu_rt isn't valid either
   * the interceptor already handles it on the next real call.
   */
  private silentRefresh(): Observable<void> {
    return this.refresh().pipe(
      map(() => void 0),
      catchError(() => of(void 0))
    );
  }

  registerStudent(body: StudentRegistrationRequest): Observable<void> {
    return this.http.post<void>(API.registerStudent, body);
  }

  registerProfessor(body: ProfessorRegistrationRequest): Observable<void> {
    return this.http.post<void>(API.registerProfessor, body);
  }

  registerGestor(body: GestorRegistrationRequest): Observable<void> {
    return this.http.post<void>(API.registerGestor, body);
  }

  activate(body: ActivateAccountRequest): Observable<void> {
    return this.http.post<void>(API.activate, body);
  }

  resendActivation(body: ResendActivationRequest): Observable<void> {
    return this.http.post<void>(API.resendActivation, body);
  }

  requestPasswordReset(body: PasswordResetRequest): Observable<void> {
    return this.http.post<void>(API.passwordReset, body);
  }

  confirmPasswordReset(body: PasswordResetConfirmRequest): Observable<void> {
    return this.http.post<void>(API.passwordResetConfirm, body);
  }

  changePassword(body: PasswordChangeRequest): Observable<void> {
    return this.http.post<void>(API.passwordChange, body);
  }

  patchOnboarding(body: OnboardingRequest): Observable<void> {
    return this.http.patch<void>(API.onboarding, body);
  }

  /** Patch in-memory claims after onboarding completes (no network call). */
  patchOnboardingClaims(): void {
    this.tokenStore.patchClaims({ onb: false });
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(API.me);
  }

  terms(): Observable<TermsOfService> {
    return this.http.get<TermsOfService>(API.terms);
  }
}
