import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { gatesGuard } from './core/guards/gates.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // --- Public / auth flows ---------------------------------------------
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'verificar-codigo',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/verify-2fa/verify-2fa').then((m) => m.Verify2fa),
  },
  {
    path: 'registro',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'registro/confirmacion',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register-confirmation/register-confirmation').then((m) => m.RegisterConfirmation),
  },
  {
    path: 'activar',
    loadComponent: () => import('./features/auth/activate/activate').then((m) => m.Activate),
  },
  /**
   * El path que manda el backend en el mail, en ingles.
   *
   * `RegistrationService` arma `{FRONT_URL}/activate?token=...` (y el HANDOFF lo
   * documenta asi), pero la ruta de esta app esta en castellano. Sin este alias
   * el enlace de activacion cae en el 404 del router y el flujo 2 no existe.
   * El mismo componente en los dos paths, no un redirect: un redirect deja la
   * conservacion del `?token=` a merced del router, y ese token es de un solo
   * uso — si se pierde, la persona se queda sin cuenta.
   */
  {
    path: 'activate',
    loadComponent: () => import('./features/auth/activate/activate').then((m) => m.Activate),
  },
  {
    path: 'reenviar-activacion',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/resend-activation/resend-activation').then((m) => m.ResendActivation),
  },
  {
    path: 'recuperar-password',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'restablecer-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
  },
  /** Idem: `PasswordService` manda `{FRONT_URL}/reset?token=...`. Enlace de un
   *  solo uso y 15 minutos de vida, asi que un 404 acá no se puede reintentar. */
  {
    path: 'reset',
    loadComponent: () => import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
  },

  // --- Gates: reachable even when blocked, require auth but not gatesGuard ---
  {
    path: 'cuenta-pendiente',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account-pending/account-pending').then((m) => m.AccountPending),
  },
  {
    path: 'cambiar-password',
    canActivate: [authGuard],
    loadComponent: () => import('./features/change-password/change-password').then((m) => m.ChangePassword),
  },
  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadComponent: () => import('./features/onboarding/onboarding').then((m) => m.Onboarding),
  },

  // --- Main app shell (auth + all three gates clear) --------------------
  {
    path: '',
    canActivate: [authGuard, gatesGuard],
    loadComponent: () => import('./shared/ui/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      { path: 'home', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
      { path: 'perfil', loadComponent: () => import('./features/profile/my-profile/my-profile').then((m) => m.MyProfile) },
      {
        path: 'perfil/:id',
        loadComponent: () => import('./features/profile/public-profile/public-profile').then((m) => m.PublicProfile),
      },
      {
        path: 'whitelist/solicitar',
        loadComponent: () =>
          import('./features/whitelist-request/whitelist-request').then((m) => m.WhitelistRequestPage),
      },
      {
        path: 'admin/usuarios',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/users-list/users-list').then((m) => m.UsersList),
      },
      {
        path: 'admin/usuarios/nuevo',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/user-create/user-create').then((m) => m.UserCreate),
      },
      {
        path: 'admin/usuarios/:id/rol',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/user-role/user-role').then((m) => m.UserRole),
      },
      {
        path: 'admin/usuarios/:id/eliminar',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/user-delete/user-delete').then((m) => m.UserDelete),
      },
      {
        path: 'admin/whitelist',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/whitelist/whitelist-admin').then((m) => m.WhitelistAdmin),
      },
    ],
  },

  { path: '**', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound) },
];
