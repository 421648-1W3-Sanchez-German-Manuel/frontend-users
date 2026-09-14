import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, catchError, finalize, map, of, shareReplay, switchMap, tap } from 'rxjs';
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

  private refreshInFlight$: Observable<SessionResponse> | null = null;
  private silentRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  login(body: LoginRequest): Observable<LoginChallengeResponse> {
    return this.http.post<LoginChallengeResponse>(API.login, body);
  }

  /**
   * El servidor deja fu_at/fu_rt puestas como Set-Cookie; acá solo llega
   * expiresIn. Encadena un GET /me antes de completar: es la única forma de
   * conocer roles/gates ahora que no hay JWT que decodificar, y el llamador
   * (login-flow-state, guards) necesita esos claims ya poblados apenas esto
   * emite — por eso va con switchMap y no como una suscripción aparte.
   */
  verify2fa(body: Verify2faRequest): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(API.verify2fa, body).pipe(
      tap((session) => this.scheduleSilentRefresh(session.expiresIn)),
      switchMap((session) => this.pobladoDeClaims(session))
    );
  }

  /** Single-flight refresh: concurrent callers share the same in-flight request. */
  refresh(): Observable<SessionResponse> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    // Sin body: fu_rt viaja sola, como cookie — el navegador la adjunta.
    this.refreshInFlight$ = this.http.post<SessionResponse>(API.refresh, {}).pipe(
      tap((session) => this.scheduleSilentRefresh(session.expiresIn)),
      switchMap((session) => this.pobladoDeClaims(session)),
      shareReplay(1),
      finalize(() => {
        this.refreshInFlight$ = null;
      })
    );
    return this.refreshInFlight$;
  }

  /**
   * Puebla tokenStore desde /me y vuelve a emitir el SessionResponse
   * original. Marca la sesión establecida ANTES de llamar a /me: una cuenta
   * recién logueada pero con un gate pendiente (PENDING_COURSE, onboarding)
   * hace que /me responda 403 — el login en sí fue exitoso igual, y
   * authGuard necesita ver isAuthenticated()=true para no rebotar la
   * redirección del interceptor (a /cuenta-pendiente o /onboarding) de
   * vuelta a /login.
   */
  private pobladoDeClaims(session: SessionResponse): Observable<SessionResponse> {
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
    // Sin body: fu_rt viaja sola, como cookie. El servidor la lee de ahí para
    // revocar la familia, y responde con fu_at/fu_rt puestas en Max-Age=0.
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
   * Al bootear la app (ver app.config.ts): la única forma de saber si hay
   * sesión es preguntarle al servidor. Nunca falla ni bloquea el arranque —
   * un 401 acá es el caso normal de un visitante sin sesión, no un error.
   * SILENT_AUTH_CHECK le dice al interceptor que no redirija a /login por
   * este 401 en particular: haría eso por encima de la ruta pública que la
   * persona en realidad quería abrir (login, activación por link, etc).
   */
  restoreSession(): Observable<void> {
    const context = new HttpContext().set(SILENT_AUTH_CHECK, true);
    return this.http.get<MeResponse>(API.me, { context }).pipe(
      tap((me) => this.tokenStore.setFromMe(me)),
      map(() => void 0),
      catchError((error: unknown) => {
        // Un gate (pending-account, onboarding-pending, password-change) NO
        // es "sin sesión": la cookie es válida, el interceptor ya redirigió
        // a la pantalla del gate, y esa ruta necesita isAuthenticated()=true
        // para no rebotarla a /login. Solo se limpia la sesión de verdad
        // ante not-authenticated/session-closed/session-superseded.
        const esGate =
          error instanceof ApiError &&
          !['not-authenticated', 'session-closed', 'session-superseded'].includes(error.slug ?? '');
        if (esGate) {
          this.tokenStore.markSessionEstablished();
        } else {
          this.tokenStore.clear();
        }
        return of(void 0);
      })
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
