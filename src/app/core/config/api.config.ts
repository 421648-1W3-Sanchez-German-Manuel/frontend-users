/**
 * The one true door: everything goes through the API Gateway, nothing else is
 * reachable.
 *
 * Empty on purpose — every URL below is RELATIVE, so the browser sends it to
 * whatever origin served the app. That origin is the reverse proxy (`:3000`),
 * which forwards `/api/**` to the Gateway. Three consequences:
 *
 *   1. No CORS, ever. Same origin means no preflight, in dev and in prod alike.
 *   2. No per-environment build. The same bundle works behind any host name.
 *   3. The Gateway stops publishing a port, so nothing can bypass the proxy.
 *
 * An absolute `http://localhost:8080` here used to be the value, and it stopped
 * working the day the Gateway went behind the proxy: 8080 is not published any
 * more and the browser gets a connection refused.
 *
 * For `ng serve` on :4200, `proxy.conf.json` forwards `/api` and `/.well-known`
 * to `:3000` so relative URLs keep working without a separate build.
 */
export const API_BASE = '';

export const API = {
  login: `${API_BASE}/api/users/public/auth/login`,
  verify2fa: `${API_BASE}/api/users/public/auth/2fa/verify`,
  refresh: `${API_BASE}/api/users/public/auth/refresh`,
  logout: `${API_BASE}/api/users/auth/logout`,
  passwordChange: `${API_BASE}/api/users/auth/password/change`,
  passwordReset: `${API_BASE}/api/users/public/auth/password/reset`,
  passwordResetConfirm: `${API_BASE}/api/users/public/auth/password/reset/confirm`,
  registerStudent: `${API_BASE}/api/users/public/registration/student`,
  registerProfessor: `${API_BASE}/api/users/public/registration/professor`,
  activate: `${API_BASE}/api/users/public/registration/activate`,
  resendActivation: `${API_BASE}/api/users/public/registration/resend-activation`,
  terms: `${API_BASE}/api/users/public/legal/terms`,
  me: `${API_BASE}/api/users/me`,
  onboarding: `${API_BASE}/api/users/me/onboarding`,
  profile: (id: string) => `${API_BASE}/api/users/profile/${id}`,
  // GET /api/users is the ADMIN directory (active accounts, newest first).
  users: `${API_BASE}/api/users`,
  userById: (id: string) => `${API_BASE}/api/users/${id}`,
  userRole: (id: string) => `${API_BASE}/api/users/${id}/role`,
  // whitelist: POST (admin direct add) / GET (whitelist contents) — DEC-29.
  whitelist: `${API_BASE}/api/users/whitelist`,
  whitelistRequests: `${API_BASE}/api/users/whitelist/requests`,
  whitelistRequestById: (id: string) => `${API_BASE}/api/users/whitelist/requests/${id}`,
} as const;

/** Requests the interceptor must never attach a bearer token to. */
export const PUBLIC_PATHS = [
  '/api/users/public/',
] as const;
