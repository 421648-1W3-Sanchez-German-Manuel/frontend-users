import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, timer } from 'rxjs';
import { ApiError, ProblemDetails, problemTypeSlug } from '../models/problem-details.model';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

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
 * Para el chequeo de sesión al bootear la app (AuthService.restoreSession):
 * un visitante anónimo en una página pública (login, activación por link)
 * también dispara ese GET /me, y un 401 ahí es esperado, no un evento de
 * sesión perdida. Sin este flag, el caso de abajo redirigiría a /login por
 * encima de la ruta pública que la persona en realidad quería abrir.
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
  const authService = inject(AuthService);
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
          // clearLocalSession and NOT tokenStore.clear(): the silent-refresh
          // timer lives in AuthService and would keep firing POST /refresh
          // with dead tokens. Each of its 401s re-emits SESSION_CLEARED over
          // BroadcastChannel and knocks down the other tabs — even the one
          // holding the live session — until cookies are wiped by hand.
          authService.clearLocalSession();
          if (!req.context.get(SILENT_AUTH_CHECK) && !router.url.startsWith('/login')) {
            router.navigate(['/login'], { queryParams: { motivo: slug } });
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
