import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { gatesGuard } from './core/guards/gates.guard';
import { permissionGuard } from './core/guards/permission.guard';

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
   * The path the backend sends in the mail, in English.
   *
   * `RegistrationService` builds `{FRONT_URL}/activate?token=...` (and the
   * HANDOFF documents it that way), but this app's route is in Spanish.
   * Without this alias the activation link falls into the router's 404 and
   * flow 2 doesn't exist. Same component on both paths, not a redirect: a
   * redirect leaves the `?token=` preserved at the router's mercy, and that
   * token is single-use — if it's lost, the person is locked out of the account.
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
  /** Same idea: `PasswordService` sends `{FRONT_URL}/reset?token=...`.
   *  Single-use link with a 15-minute lifetime, so a 404 here can't be retried. */
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
        canMatch: [permissionGuard('requestWhitelist')],
        loadComponent: () =>
          import('./features/whitelist-request/whitelist-request').then((m) => m.WhitelistRequestPage),
      },
      {
        path: 'admin/usuarios',
        canMatch: [permissionGuard('manageUsers')],
        loadComponent: () => import('./features/admin/users-list/users-list').then((m) => m.UsersList),
      },
      /** ADMIN-only: this alta creates ADMIN accounts directly, see user-create.ts. */
      {
        path: 'admin/usuarios/nuevo',
        canMatch: [permissionGuard('createUsers')],
        loadComponent: () => import('./features/admin/user-create/user-create').then((m) => m.UserCreate),
      },
      {
        path: 'admin/usuarios/:id/rol',
        canMatch: [permissionGuard('manageUsers')],
        loadComponent: () => import('./features/admin/user-role/user-role').then((m) => m.UserRole),
      },
      {
        path: 'admin/usuarios/:id/eliminar',
        canMatch: [permissionGuard('manageUsers')],
        loadComponent: () => import('./features/admin/user-delete/user-delete').then((m) => m.UserDelete),
      },
      {
        path: 'admin/whitelist',
        canMatch: [permissionGuard('manageWhitelist')],
        loadComponent: () => import('./features/admin/whitelist/whitelist-admin').then((m) => m.WhitelistAdmin),
      },
      {
        path: 'admin/configuracion',
        canMatch: [permissionGuard('editGlobalConfig')],
        loadComponent: () => import('./features/admin/global-config/global-config').then((m) => m.GlobalConfig),
      },
    ],
  },

  { path: '**', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound) },
];
