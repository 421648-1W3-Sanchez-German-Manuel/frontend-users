import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, timer } from 'rxjs';
import { ApiError, ProblemDetails, problemTypeSlug } from '../models/problem-details.model';
import { ToastService } from '../services/toast.service';
import { TokenStoreService } from '../services/token-store.service';

/** Types the component itself is expected to show inline (form errors, countdowns). */
const INLINE_HANDLED = new Set([
  'validation',
  'invalid-code',
  'invalid-credentials',
  'invalid-link',
  'duplicate-email',
  'last-admin',
  'invalid-transition',
  'too-many-attempts',
  'access-denied',
  'invalid-audience',
  'route-not-found',
  'email-not-whitelisted',
]);

const RETRIED_503 = new HttpContextToken<boolean>(() => false);

/**
 * For the session check on app boot (AuthService.restoreSession): an
 * anonymous visitor on a public page (login, activation via link) also fires
 * that GET /me, and a 401 there is expected, not a lost-session event.
 * Without this flag, the case below would redirect to /login over the public
 * route the person actually meant to open.
 */
export const SILENT_AUTH_CHECK = new HttpContextToken<boolean>(() => false);

function isProblemDetails(value: unknown): value is ProblemDetails {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as Record<string, unknown>)['type'] === 'string' &&
    typeof (value as Record<string, unknown>)['status'] === 'number'
  );
}

/**
 * Branches on the ProblemDetails `type`, never on the HTTP status alone —
 * see HANDOFF-frontend.md §0/§1. A 401 always means "go to /login"; a 403
 * means one of three independent gates (account/password/onboarding).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStore = inject(TokenStoreService);
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || !isProblemDetails(error.error)) {
        return throwError(() => error);
      }
      const problem = error.error;
      const slug = problemTypeSlug(problem);
      const apiError = new ApiError(problem, slug);

      switch (slug) {
        case 'session-closed':
        case 'session-superseded':
        case 'not-authenticated': {
          tokenStore.clear();
          if (!req.context.get(SILENT_AUTH_CHECK) && !router.url.startsWith('/login')) {
            router.navigate(['/login'], { queryParams: { reason: slug } });
          }
          return throwError(() => apiError);
        }

        case 'pending-account':
          if (router.url !== '/cuenta-pendiente') router.navigateByUrl('/cuenta-pendiente');
          return throwError(() => apiError);

        case 'password-change-required':
          if (router.url !== '/cambiar-password') router.navigateByUrl('/cambiar-password');
          return throwError(() => apiError);

        case 'onboarding-pending':
          if (router.url !== '/onboarding') router.navigateByUrl('/onboarding');
          return throwError(() => apiError);

        case 'service-unavailable': {
          if (req.context.get(RETRIED_503)) {
            toast.error('Servicio no disponible', problem.detail);
            return throwError(() => apiError);
          }
          const retryAfterSeconds = Number(error.headers.get('Retry-After')) || 1;
          return timer(retryAfterSeconds * 1000).pipe(
            switchMap(() => next(req.clone({ context: req.context.set(RETRIED_503, true) })))
          );
        }

        default:
          if (!INLINE_HANDLED.has(slug ?? '')) {
            toast.error(problem.title, problem.detail);
          }
          return throwError(() => apiError);
      }
    })
  );
};
