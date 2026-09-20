import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Role } from '../models/auth.model';
import { TokenStoreService } from '../services/token-store.service';

export function roleGuard(allowed: Role[]): CanMatchFn {
  return () => {
    const tokenStore = inject(TokenStoreService);
    const router = inject(Router);

    /**
     * An anonymous visitor is not missing a ROLE, they are missing a SESSION,
     * and the two need different answers.
     *
     * canMatch is evaluated during recognition, canActivate during
     * activation, so this guard runs BEFORE the shell's authGuard. Rejecting
     * here abandons the requested navigation and starts a fresh one to /home;
     * authGuard then sees state.url === '/home' and the login redirect loses
     * the deep link. Matching instead hands the decision to authGuard, which
     * still holds the original URL.
     *
     * The lazy chunk is still not downloaded: the router resolves
     * loadComponent after the activation guards, so the parent's canActivate
     * rejects first.
     */
    if (!tokenStore.isAuthenticated()) return true;

    const roles = tokenStore.roles();
    if (roles.some((role) => allowed.includes(role))) return true;
    return router.createUrlTree(['/home']);
  };
}
