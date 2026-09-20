import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Role } from '../models/auth.model';
import { TokenStoreService } from '../services/token-store.service';

export function roleGuard(allowed: Role[]): CanMatchFn {
  return () => {
    const tokenStore = inject(TokenStoreService);
    const router = inject(Router);
    const roles = tokenStore.roles();
    if (roles.some((role) => allowed.includes(role))) return true;
    return router.createUrlTree(['/home']);
  };
}
