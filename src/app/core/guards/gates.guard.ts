import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStoreService } from '../services/token-store.service';

/**
 * Client-side shortcut for the three backend gates (§2 of the handoff). The
 * token claims (est/pwd/onb) only reflect the state as of the last login, so
 * this only prevents an obviously-pointless navigation — the backend is what
 * actually enforces it on every call.
 */
export const gatesGuard: CanActivateFn = () => {
  const tokenStore = inject(TokenStoreService);
  const router = inject(Router);

  if (!tokenStore.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }
  if (tokenStore.accountStatus() !== 'ACTIVE') {
    return router.createUrlTree(['/cuenta-pendiente']);
  }
  if (tokenStore.mustChangePassword()) {
    return router.createUrlTree(['/cambiar-password']);
  }
  if (tokenStore.onboardingPending()) {
    return router.createUrlTree(['/onboarding']);
  }
  return true;
};
