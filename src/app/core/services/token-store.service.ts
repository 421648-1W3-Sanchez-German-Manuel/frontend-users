import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MeResponse, Role, SessionClaims } from '../models/auth.model';

const BROADCAST_CHANNEL_NAME = 'fu-auth';
const SESSION_CLEARED = 'session-cleared';

function claimsFromMe(me: MeResponse): SessionClaims {
  return {
    sub: me.id,
    roles: [me.role],
    est: me.accountStatus,
    pwd: me.mustChangePassword,
    onb: me.firstLogin,
  };
}

/**
 * In-memory session state — never persisted. Tokens travel in HttpOnly
 * cookies (fu_at/fu_rt): the browser attaches them on every request and JS
 * can't read, write or delete them. There's nothing to store here and no JWT
 * to decode.
 *
 * Consequence: on page reload there's no synchronous way to know whether
 * there's a session — the server has to be asked (GET /api/users/me).
 * AuthService.restoreSession() does that on app boot (see app.config.ts).
 *
 * Gate claims (est/pwd/onb) reflect the state as of the last call to /me
 * (login, refresh, or the bootstrap), not necessarily the current instant —
 * the backend is what actually enforces it on every request. patchClaims()
 * still exists for the same optimistic shortcut as always: reflect in the UI
 * that onboarding finished without waiting for a round-trip.
 *
 * With no more localStorage there's no `storage` event to sync tabs: without
 * this, logging out in tab A leaves tab B showing the logged-in UI until it
 * fires a request and gets a 401 back. clear() notifies the other tabs of the
 * same origin over BroadcastChannel so they find out immediately — see
 * clearRemote().
 */
@Injectable({ providedIn: 'root' })
export class TokenStoreService {
  private readonly router = inject(Router);
  private readonly channel =
    typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

  private readonly _claims = signal<SessionClaims | null>(null);
  private readonly _authenticated = signal(false);

  readonly claims = this._claims.asReadonly();
  readonly isAuthenticated = this._authenticated.asReadonly();

  readonly roles = computed<Role[]>(() => this._claims()?.roles ?? []);
  readonly isAdmin = computed(() => this.roles().includes('ADMIN'));
  readonly accountStatus = computed(() => this._claims()?.est ?? null);
  readonly mustChangePassword = computed(() => this._claims()?.pwd ?? false);
  readonly onboardingPending = computed(() => this._claims()?.onb ?? false);
  readonly userId = computed(() => this._claims()?.sub ?? null);

  constructor() {
    this.channel?.addEventListener('message', (event: MessageEvent) => {
      if (event.data === SESSION_CLEARED) this.clearRemote();
    });
  }

  /** After login, refresh, or the app bootstrap: populates the session from /me. */
  setFromMe(me: MeResponse): void {
    this._claims.set(claimsFromMe(me));
    this._authenticated.set(true);
  }

  /**
   * Marks a session as present WITHOUT waiting for /me. Needed because /me
   * can fail with a 403 gate (pending account, onboarding) for a perfectly
   * authenticated account — and authGuard, which only looks at
   * isAuthenticated(), has to let it through to /cuenta-pendiente or
   * /onboarding in that case. Without this, the interceptor redirects there
   * and authGuard bounces straight back to /login, because setFromMe() was
   * never called.
   */
  markSessionEstablished(): void {
    this._authenticated.set(true);
  }

  /** Partial merge with no network call — optimistic shortcut after finishing onboarding. */
  patchClaims(partial: Partial<SessionClaims>): void {
    const current = this._claims();
    if (current) {
      this._claims.set({ ...current, ...partial });
    }
  }

  /**
   * Every caller of clear() (logout, the interceptor on session-closed/
   * -superseded/not-authenticated, reLogin from account-pending, the password
   * change) already navigates to /login on its own in ITS tab — see
   * app-shell.logout(), auth.interceptor.ts, account-pending.ts,
   * change-password.ts. That's why clear() doesn't navigate: it only notifies
   * the other tabs, and clearRemote() is what does it for them.
   */
  clear(): void {
    this._claims.set(null);
    this._authenticated.set(false);
    this.channel?.postMessage(SESSION_CLEARED);
  }

  /** Reacts to another tab's notification: clears local state and, unlike
   * clear(), navigates — there was no request here that already sent it. */
  private clearRemote(): void {
    this._claims.set(null);
    this._authenticated.set(false);
    if (!this.router.url.startsWith('/login')) {
      this.router.navigate(['/login'], { queryParams: { reason: 'session-closed' } });
    }
  }
}
