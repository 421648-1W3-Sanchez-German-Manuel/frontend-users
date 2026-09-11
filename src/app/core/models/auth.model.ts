export type Role = 'STUDENT' | 'PROFESSOR' | 'ADMIN';
export type AccountStatus = 'PENDING_COURSE' | 'ACTIVE' | 'SUSPENDED' | string;

export interface AccessTokenClaims {
  sub: string;
  sid: string;
  roles: Role[];
  est: AccountStatus;
  pwd: boolean;
  onb: boolean;
  iss: string;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginChallengeResponse {
  challengeId: string;
  message: string;
}

export interface Verify2faRequest {
  challengeId: string;
  code: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken?: string;
}

export interface StudentRegistrationRequest {
  firstNames: string;
  lastNames: string;
  legajo: string;
  email: string;
  password: string;
  invitationCode: string;
  termsVersion: string;
}

export interface ProfessorRegistrationRequest {
  firstNames: string;
  lastNames: string;
  email: string;
  password: string;
  termsVersion: string;
}

export interface ActivateAccountRequest {
  token: string;
}

export interface ResendActivationRequest {
  email: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  newPassword: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

export interface OnboardingRequest {
  githubUsername: string;
  avatarRef: string | null;
  tourOk: boolean;
}

export interface TermsOfService {
  version: string;
  content?: string;
  publishedAt?: string;
}

export interface MeResponse {
  id: string;
  firstNames: string;
  lastNames: string;
  email: string;
  legajo?: string;
  roles: Role[];
  accountStatus: AccountStatus;
  mustChangePassword: boolean;
  firstLogin: boolean;
  githubUsername?: string;
  avatarRef?: string | null;
}

export interface PublicProfile {
  id: string;
  firstNames: string;
  lastNames: string;
  githubUsername?: string;
  avatarRef?: string | null;
}
