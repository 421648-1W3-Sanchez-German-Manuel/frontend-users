import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, finalize, of, shareReplay, tap, throwError, timer } from 'rxjs';
import { API } from '../config/api.config';
import { TokenStoreService } from './token-store.service';
import {
  ActivateAccountRequest,
  LoginChallengeResponse,
  LoginRequest,
  LogoutRequest,
  OnboardingRequest,
  PasswordChangeRequest,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  ProfessorRegistrationRequest,
  RefreshRequest,
  ResendActivationRequest,
  StudentRegistrationRequest,
  TermsOfService,
  TokenResponse,
  Verify2faRequest,
  MeResponse,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStore = inject(TokenStoreService);

  private refreshInFlight$: Observable<TokenResponse> | null = null;
  private silentRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  login(body: LoginRequest): Observable<LoginChallengeResponse> {
    return this.http.post<LoginChallengeResponse>(API.login, body);
  }

  verify2fa(body: Verify2faRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(API.verify2fa, body).pipe(
      tap((tokens) => {
        this.tokenStore.setSession(tokens);
        this.scheduleSilentRefresh(tokens.expiresIn);
      })
    );
  }

  /** Single-flight refresh: concurrent callers share the same in-flight request. */
  refresh(): Observable<TokenResponse> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    const refreshToken = this.tokenStore.refreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('no-refresh-token'));
    }
    const body: RefreshRequest = { refreshToken };
    this.refreshInFlight$ = this.http.post<TokenResponse>(API.refresh, body).pipe(
      tap((tokens) => {
        this.tokenStore.setSession(tokens);
        this.scheduleSilentRefresh(tokens.expiresIn);
      }),
      shareReplay(1),
      finalize(() => {
        this.refreshInFlight$ = null;
      })
    );
    return this.refreshInFlight$;
  }

  private scheduleSilentRefresh(expiresInSeconds: number): void {
    if (this.silentRefreshTimer) clearTimeout(this.silentRefreshTimer);
    const fireInMs = Math.max((expiresInSeconds - 60) * 1000, 5000);
    this.silentRefreshTimer = setTimeout(() => {
      this.refresh().subscribe({ error: () => void 0 });
    }, fireInMs);
  }

  logout(): Observable<void> {
    const refreshToken = this.tokenStore.refreshToken() ?? undefined;
    const body: LogoutRequest = refreshToken ? { refreshToken } : {};
    return this.http.post<void>(API.logout, body).pipe(
      catchError(() => of(void 0)),
      finalize(() => this.clearLocalSession())
    );
  }

  clearLocalSession(): void {
    if (this.silentRefreshTimer) clearTimeout(this.silentRefreshTimer);
    this.tokenStore.clear();
  }

  registerStudent(body: StudentRegistrationRequest): Observable<void> {
    return this.http.post<void>(API.registerStudent, body);
  }

  registerProfessor(body: ProfessorRegistrationRequest): Observable<void> {
    return this.http.post<void>(API.registerProfessor, body);
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
