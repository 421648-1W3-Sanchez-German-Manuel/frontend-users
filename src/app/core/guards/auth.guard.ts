import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStoreService } from '../services/token-store.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const tokenStore = inject(TokenStoreService);
  const router = inject(Router);
  if (tokenStore.isAuthenticated()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

export const guestGuard: CanActivateFn = () => {
  const tokenStore = inject(TokenStoreService);
  const router = inject(Router);
  if (!tokenStore.isAuthenticated()) return true;
  return router.createUrlTree(['/home']);
};
