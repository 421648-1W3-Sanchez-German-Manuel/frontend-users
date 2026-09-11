import { AccountStatus, Role } from './auth.model';

export interface CreateUserRequest {
  firstNames: string;
  lastNames: string;
  email: string;
  roles: Role[];
  legajo?: string;
}

export interface AdminUser {
  id: string;
  firstNames: string;
  lastNames: string;
  email: string;
  role: Role;
  accountStatus: AccountStatus;
  legajo?: string;
  createdAt?: string;
}

export interface ChangeRoleRequest {
  roles: Role[];
}

export interface DeleteUserRequest {
  password: string;
  twoFactorCode: string;
  usernameConfirmation: string;
}

export type WhitelistRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface WhitelistRequest {
  id: string;
  email: string;
  requestedBy?: string;
  status: WhitelistRequestStatus;
  reason?: string;
  rejectionReason?: string;
  createdAt?: string;
  reviewedAt?: string;
}

export interface CreateWhitelistRequest {
  email: string;
  reason?: string;
}

/** Matches the backend `AddEmailRequest` record (admin direct add). */
export interface AddEmailRequest {
  email: string;
}

/** Row of the whitelist itself (admin CRUD) — GET /api/users/whitelist. */
export interface WhitelistEntry {
  id: string;
  email: string;
  createdAt?: string;
}

/** Matches the backend `ResolveWhitelistRequest` record. */
export interface ReviewWhitelistRequest {
  approve: boolean;
  rejectionReason?: string;
}
