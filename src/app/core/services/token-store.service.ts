import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MeResponse, Role, SessionClaims } from '../models/auth.model';

const BROADCAST_CHANNEL_NAME = 'fu-auth';
const SESSION_CLEARED = 'session-cleared';

function claimsDeMe(me: MeResponse): SessionClaims {
  return {
    sub: me.id,
    roles: [me.role],
    est: me.accountStatus,
    pwd: me.mustChangePassword,
    onb: me.firstLogin,
  };
}

/**
 * Estado de sesión en memoria — nunca persistido. Los tokens viajan en
 * cookies HttpOnly (fu_at/fu_rt): el navegador los adjunta solo en cada
 * request y JS no puede leerlos, escribirlos ni borrarlos. No hay nada que
 * guardar acá ni ningún JWT que decodificar.
 *
 * Consecuencia: al recargar la página no hay forma sincrónica de saber si
 * hay sesión — hay que preguntarle al servidor (GET /api/users/me). Eso lo
 * hace AuthService.restoreSession() al bootear la app (ver app.config.ts).
 *
 * Gate claims (est/pwd/onb) reflejan el estado la última vez que se llamó a
 * /me (login, refresh, o el bootstrap), no necesariamente el instante actual
 * — el backend es quien realmente lo aplica en cada request. patchClaims()
 * sigue existiendo para el mismo atajo optimista de siempre: reflejar en la
 * UI que el onboarding terminó sin esperar un round-trip.
 *
 * Al no haber más localStorage no hay evento `storage` que sincronice
 * pestañas: sin esto, cerrar sesión en la pestaña A deja a la B mostrando la
 * UI de logueado hasta que dispare un request y le vuelva 401. clear() avisa
 * por BroadcastChannel a las demás pestañas del mismo origen para que se
 * enteren en el acto — ver clearRemota().
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
      if (event.data === SESSION_CLEARED) this.clearRemota();
    });
  }

  /** Tras login, refresh, o el bootstrap de la app: puebla la sesión desde /me. */
  setFromMe(me: MeResponse): void {
    this._claims.set(claimsDeMe(me));
    this._authenticated.set(true);
  }

  /**
   * Marca que hay sesión SIN esperar a /me. Necesario porque /me puede fallar
   * con un 403 de gate (cuenta pendiente, onboarding) para una cuenta
   * perfectamente autenticada — y authGuard, que solo mira isAuthenticated(),
   * tiene que dejar pasar a /cuenta-pendiente u /onboarding en ese caso. Sin
   * esto, el interceptor redirige ahí y authGuard rebota derecho a /login,
   * porque nunca se llamó a setFromMe().
   */
  markSessionEstablished(): void {
    this._authenticated.set(true);
  }

  /** Merge parcial sin red — atajo optimista tras completar onboarding. */
  patchClaims(partial: Partial<SessionClaims>): void {
    const current = this._claims();
    if (current) {
      this._claims.set({ ...current, ...partial });
    }
  }

  /**
   * Todo caller de clear() (logout, interceptor ante session-closed/
   * -superseded/not-authenticated, reLogin desde cuenta-pendiente, el
   * cambio de contraseña) ya navega a /login por su cuenta en SU pestaña —
   * ver app-shell.logout(), auth.interceptor.ts, account-pending.ts,
   * change-password.ts. Por eso clear() no navega: solo avisa a las demás
   * pestañas, y es clearRemota() quien lo hace por ellas.
   */
  clear(): void {
    this._claims.set(null);
    this._authenticated.set(false);
    this.channel?.postMessage(SESSION_CLEARED);
  }

  /** Reacciona al aviso de otra pestaña: limpia el estado local y, a diferencia
   * de clear(), navega — acá no hubo ningún request que la hubiera mandado ya. */
  private clearRemota(): void {
    this._claims.set(null);
    this._authenticated.set(false);
    if (!this.router.url.startsWith('/login')) {
      this.router.navigate(['/login'], { queryParams: { motivo: 'session-closed' } });
    }
  }
}
