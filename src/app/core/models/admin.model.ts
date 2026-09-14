import { AccountStatus, Role } from './auth.model';

/** RF-ROL-03 - este alta manual crea solo ADMIN; matches backend `CreateUserRequest`. */
export interface CreateUserRequest {
  firstNames: string;
  lastNames: string;
  email: string;
  password: string;
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

/** The whitelist only ever grants PROFESSOR or GESTOR — never ADMIN. */
export type WhitelistableRole = 'PROFESSOR' | 'GESTOR';

/** Matches the backend `AddEmailRequest` record (ADMIN/GESTOR direct add). */
export interface AddEmailRequest {
  email: string;
  role: WhitelistableRole;
}

/** Row of the whitelist itself (ADMIN/GESTOR CRUD) — GET /api/users/whitelist. */
export interface WhitelistEntry {
  id: string;
  email: string;
  role: WhitelistableRole;
  createdAt?: string;
}

/** Matches the backend `ResolveWhitelistRequest` record. */
export interface ReviewWhitelistRequest {
  approve: boolean;
  rejectionReason?: string;
}
