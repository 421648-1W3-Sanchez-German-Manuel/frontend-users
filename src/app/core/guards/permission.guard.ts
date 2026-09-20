import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Capability, PermissionsService } from '../services/permissions.service';
import { TokenStoreService } from '../services/token-store.service';

/**
 * Route-level half of the same policy the templates read. Declared as
 * CanMatchFn on purpose: the router then rejects the route before resolving
 * its loadComponent, so a lazy chunk the person may not open is never
 * downloaded. Returning a UrlTree still redirects — CanMatchFn and
 * CanActivateFn share GuardResult — so this does not fall through to the
 * wildcard 404.
 */
export function permissionGuard(capability: Capability): CanMatchFn {
  return () => {
    const permissions = inject(PermissionsService);
    const tokenStore = inject(TokenStoreService);
    const router = inject(Router);

    /**
     * An anonymous visitor is not missing a CAPABILITY, they are missing a
     * SESSION, and the two need different answers. Rejecting here during
     * recognition abandons the requested navigation, so the shell's authGuard
     * — a canActivate, evaluated later — never sees the original URL and the
     * login redirect loses the deep link. Matching hands it the decision.
     *
     * The lazy chunk is still not downloaded: loadComponent is resolved after
     * the activation guards, so the parent's canActivate rejects first.
     */
    if (!tokenStore.isAuthenticated()) return true;

    if (permissions.can(capability)) return true;
    return router.createUrlTree(['/home']);
  };
}
