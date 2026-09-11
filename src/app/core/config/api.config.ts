/** The one true door: everything goes through the API Gateway, nothing else is reachable. */
export const API_BASE = 'http://localhost:8080';

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
  // NOTE: GET list endpoints below (users, whitelistRequests as a list) are
  // NOT in the handoff doc — only POST/PATCH/DELETE are specified there.
  // They're inferred as the standard REST pairing for the admin screens and
  // should be confirmed against the real backend contract.
  users: `${API_BASE}/api/users`,
  userById: (id: string) => `${API_BASE}/api/users/${id}`,
  userRole: (id: string) => `${API_BASE}/api/users/${id}/role`,
  whitelistRequests: `${API_BASE}/api/users/whitelist/requests`,
  whitelistRequestById: (id: string) => `${API_BASE}/api/users/whitelist/requests/${id}`,
} as const;

/** Requests the interceptor must never attach a bearer token to. */
export const PUBLIC_PATHS = [
  '/api/users/public/',
] as const;
