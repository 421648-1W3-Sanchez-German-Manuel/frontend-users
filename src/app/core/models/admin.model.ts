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
  roles: Role[];
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

/** Matches the backend `ResolveWhitelistRequest` record. */
export interface ReviewWhitelistRequest {
  approve: boolean;
  rejectionReason?: string;
}
