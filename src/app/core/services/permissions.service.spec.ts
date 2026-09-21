import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MeResponse, Role } from '../models/auth.model';
import { ALL_CAPABILITIES, Capability, PermissionsService } from './permissions.service';
import { TokenStoreService } from './token-store.service';

function meWithRole(role: Role): MeResponse {
  return {
    id: 'u-1',
    firstNames: 'Test',
    lastNames: 'User',
    email: 'test@frc.utn.edu.ar',
    role,
    accountStatus: 'ACTIVE',
    mustChangePassword: false,
    firstLogin: false,
    guidedTourCompleted: true,
    emailVerified: true,
  };
}

/**
 * Uses the REAL TokenStoreService rather than a stub: hasAnyRole() is the
 * single place role arithmetic happens, so a stub that reimplements it would
 * leave the actual method untested and a bug in it would pass this suite.
 */
function permissionsFor(role: Role): PermissionsService {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  TestBed.inject(TokenStoreService).setFromMe(meWithRole(role));
  return TestBed.inject(PermissionsService);
}

/**
 * The table itself. Editing RULES without updating this fails here, which is
 * the whole point of naming capabilities instead of spreading role checks.
 */
const EXPECTED: Record<Role, Capability[]> = {
  STUDENT: [],
  PROFESSOR: ['requestWhitelist'],
  GESTOR: ['manageUsers', 'manageWhitelist'],
  ADMIN: ['manageUsers', 'createUsers', 'manageWhitelist', 'editGlobalConfig'],
};


describe('PermissionsService · capability table', () => {
  afterEach(() => TestBed.resetTestingModule());

  for (const [role, granted] of Object.entries(EXPECTED) as [Role, Capability[]][]) {
    it(`grants a ${role} exactly ${granted.length ? granted.join(', ') : 'nothing'}`, () => {
      const permissions = permissionsFor(role);
      const actual = ALL_CAPABILITIES.filter((capability) => permissions.can(capability));
      expect(actual.sort()).toEqual([...granted].sort());
    });
  }
});

describe('PermissionsService · resource-level rules', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('lets an ADMIN edit another ADMIN', () => {
    expect(permissionsFor('ADMIN').canEditUser({ role: 'ADMIN' })).toBe(true);
  });

  it('stops a GESTOR from editing an ADMIN', () => {
    expect(permissionsFor('GESTOR').canEditUser({ role: 'ADMIN' })).toBe(false);
  });

  it('lets a GESTOR edit a PROFESSOR', () => {
    expect(permissionsFor('GESTOR').canEditUser({ role: 'PROFESSOR' })).toBe(true);
  });

  it('offers every role to an ADMIN', () => {
    expect(permissionsFor('ADMIN').assignableRoles()).toContain('ADMIN');
  });

  it('never offers ADMIN to a GESTOR', () => {
    expect(permissionsFor('GESTOR').assignableRoles()).not.toContain('ADMIN');
  });
});
