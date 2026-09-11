import { Injectable, computed, signal } from '@angular/core';
import { AccessTokenClaims, Role, TokenResponse } from '../models/auth.model';

const ACCESS_KEY = 'fu.accessToken';
const REFRESH_KEY = 'fu.refreshToken';

function decodeClaims(accessToken: string): AccessTokenClaims | null {
  try {
    const payload = accessToken.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json) as AccessTokenClaims;
  } catch {
    return null;
  }
}

/**
 * Holds the in-memory session state. Gate claims (est/pwd/onb) only change on
 * next login: completing onboarding or changing the password does NOT refresh
 * the token in memory, by backend design (see handoff §2).
 */
@Injectable({ providedIn: 'root' })
export class TokenStoreService {
  private readonly _accessToken = signal<string | null>(localStorage.getItem(ACCESS_KEY));
  private readonly _refreshToken = signal<string | null>(localStorage.getItem(REFRESH_KEY));
  private readonly _claims = signal<AccessTokenClaims | null>(this.decodeCurrent());

  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();
  readonly claims = this._claims.asReadonly();

  readonly isAuthenticated = computed(() => {
    const claims = this._claims();
    if (!claims) return false;
    return claims.exp * 1000 > Date.now();
  });

  readonly roles = computed<Role[]>(() => this._claims()?.roles ?? []);
  readonly isAdmin = computed(() => this.roles().includes('ADMIN'));
  readonly accountStatus = computed(() => this._claims()?.est ?? null);
  readonly mustChangePassword = computed(() => this._claims()?.pwd ?? false);
  readonly onboardingPending = computed(() => this._claims()?.onb ?? false);
  readonly userId = computed(() => this._claims()?.sub ?? null);

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === ACCESS_KEY || event.key === REFRESH_KEY) {
        this._accessToken.set(localStorage.getItem(ACCESS_KEY));
        this._refreshToken.set(localStorage.getItem(REFRESH_KEY));
        this._claims.set(this.decodeCurrent());
      }
    });
  }

  private decodeCurrent(): AccessTokenClaims | null {
    const token = localStorage.getItem(ACCESS_KEY);
    return token ? decodeClaims(token) : null;
  }

  setSession(tokens: TokenResponse): void {
    localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    this._accessToken.set(tokens.accessToken);
    this._refreshToken.set(tokens.refreshToken);
    this._claims.set(decodeClaims(tokens.accessToken));
  }

  clear(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._claims.set(null);
  }

  expiresInMs(): number | null {
    const claims = this._claims();
    if (!claims) return null;
    return claims.exp * 1000 - Date.now();
  }
}
