/** application/problem+json shape returned by the API Gateway for every error. */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  requestId: string;
  retryAfterSeconds?: number;
}

/** The stable discriminator suffix of `type` (after the last `/`). */
export type ErrorTypeSlug =
  | 'validation'
  | 'invalid-code'
  | 'invalid-link'
  | 'not-authenticated'
  | 'invalid-credentials'
  | 'session-closed'
  | 'session-superseded'
  | 'pending-account'
  | 'password-change-required'
  | 'onboarding-pending'
  | 'email-not-whitelisted'
  | 'access-denied'
  | 'invalid-audience'
  | 'route-not-found'
  | 'duplicate-email'
  | 'last-admin'
  | 'invalid-transition'
  | 'too-many-attempts'
  | 'service-unavailable';

export function problemTypeSlug(problem: ProblemDetails | null | undefined): ErrorTypeSlug | null {
  if (!problem?.type) return null;
  const slug = problem.type.split('/').pop();
  return (slug as ErrorTypeSlug) ?? null;
}

/** Error thrown/propagated by the auth interceptor, wrapping the parsed ProblemDetails. */
export class ApiError extends Error {
  constructor(
    public readonly problem: ProblemDetails,
    public readonly slug: ErrorTypeSlug | null
  ) {
    super(problem.detail || problem.title);
  }
}
