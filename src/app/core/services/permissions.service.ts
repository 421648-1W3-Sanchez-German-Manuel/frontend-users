import { Injectable, inject } from '@angular/core';
import { Role } from '../models/auth.model';
import { TokenStoreService } from './token-store.service';

/**
 * The whole authorization policy of the UI, in one table.
 *
 * Capabilities are named after what a person may DO, never after who they
 * ARE: `manageUsers` survives a new role being added to the platform,
 * `isAdmin() || isGestor()` scattered across templates does not. Route guards
 * and templates read the same capability name, so a rule cannot drift between
 * the route that is reachable and the link that offers it.
 *
 * Hiding a control is UX, not authorization — same caveat as gates.guard.ts.
 * Anyone can unhide a button from the devtools; the backend is what enforces
 * this on every request.
 */
const RULES = {
  requestWhitelist: ['PROFESSOR'],
  manageUsers: ['ADMIN', 'GESTOR'],
  createUsers: ['ADMIN'],
  manageWhitelist: ['ADMIN', 'GESTOR'],
  editGlobalConfig: ['ADMIN'],
} satisfies Record<string, Role[]>;

export type Capability = keyof typeof RULES;

const ASSIGNABLE_ROLES: Role[] = ['STUDENT', 'PROFESSOR', 'GESTOR', 'ADMIN'];

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  private readonly tokenStore = inject(TokenStoreService);

  /** Reads the roles signal, so calling this from a template stays reactive. */
  can(capability: Capability): boolean {
    return this.tokenStore.hasAnyRole(RULES[capability]);
  }

  /**
   * Resource-level, so it cannot be a plain capability: a GESTOR administers
   * everyone EXCEPT an ADMIN, and only another ADMIN touches an ADMIN.
   */
  canEditUser(target: { role: Role }): boolean {
    return this.tokenStore.isAdmin() || target.role !== 'ADMIN';
  }

  /** Same rule, applied to the options offered rather than to a row. */
  assignableRoles(): Role[] {
    return this.tokenStore.isAdmin() ? ASSIGNABLE_ROLES : ASSIGNABLE_ROLES.filter((r) => r !== 'ADMIN');
  }
}
