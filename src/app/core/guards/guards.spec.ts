import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, Router, UrlTree, provideRouter } from '@angular/router';
import { Role } from '../models/auth.model';
import { TokenStoreService } from '../services/token-store.service';
import { authGuard, guestGuard } from './auth.guard';
import { permissionGuard } from './permission.guard';
import { safeReturnUrl } from '../utils/safe-return-url';

/** Only the slice of TokenStoreService the guards and PermissionsService read. */
function stubStore(authenticated: boolean, roles: Role[] = []) {
  return {
    isAuthenticated: () => authenticated,
    roles: () => roles,
    isAdmin: () => roles.includes('ADMIN'),
    hasAnyRole: (allowed: Role[]) => roles.some((role) => allowed.includes(role)),
  };
}

function setup(authenticated: boolean, roles: Role[] = []) {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), { provide: TokenStoreService, useValue: stubStore(authenticated, roles) }],
  });
  return TestBed.inject(Router);
}

/** Guards return boolean | UrlTree; the assertions below need the UrlTree branch. */
function asUrlTree(result: unknown): UrlTree {
  expect(result).toBeInstanceOf(UrlTree);
  return result as UrlTree;
}

describe('safeReturnUrl', () => {
  it('keeps a same-origin relative path', () => {
    expect(safeReturnUrl('/perfil')).toBe('/perfil');
    expect(safeReturnUrl('/admin/usuarios?page=2')).toBe('/admin/usuarios?page=2');
  });

  it('rejects an absolute URL, so it cannot become an open redirect', () => {
    expect(safeReturnUrl('https://evil.example/login')).toBeNull();
  });

  it('rejects a protocol-relative path', () => {
    expect(safeReturnUrl('//evil.example')).toBeNull();
  });

  it('rejects a backslash, which parsers disagree about', () => {
    expect(safeReturnUrl('/\\evil.example')).toBeNull();
    expect(safeReturnUrl('/perfil\\@evil.example')).toBeNull();
  });

  it('rejects an absent value', () => {
    expect(safeReturnUrl(null)).toBeNull();
    expect(safeReturnUrl('')).toBeNull();
  });
});

describe('authGuard', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('lets an authenticated visitor through', () => {
    setup(true);
    const result = TestBed.runInInjectionContext(() => authGuard({} as never, { url: '/perfil' } as never));
    expect(result).toBe(true);
  });

  it('sends an anonymous visitor to /login carrying where they were headed', () => {
    setup(false);
    const tree = asUrlTree(
      TestBed.runInInjectionContext(() => authGuard({} as never, { url: '/perfil' } as never))
    );
    expect(tree.toString()).toContain('/login');
    expect(tree.queryParams['returnUrl']).toBe('/perfil');
  });
});

describe('guestGuard', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('lets an anonymous visitor reach the auth screens', () => {
    setup(false);
    expect(TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never))).toBe(true);
  });

  it('bounces an authenticated visitor to /home', () => {
    setup(true);
    const tree = asUrlTree(TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never)));
    expect(tree.toString()).toBe('/home');
  });
});

describe('permissionGuard', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('matches the route when the visitor holds the capability', () => {
    setup(true, ['GESTOR']);
    const result = TestBed.runInInjectionContext(() => permissionGuard('manageUsers')({} as Route, []));
    expect(result).toBe(true);
  });

  it('redirects to /home when the visitor lacks it', () => {
    setup(true, ['STUDENT']);
    const tree = asUrlTree(TestBed.runInInjectionContext(() => permissionGuard('manageUsers')({} as Route, [])));
    expect(tree.toString()).toBe('/home');
  });

  /** The nav used to offer global config to a GESTOR while the route refused it. */
  it('keeps a GESTOR out of the ADMIN-only global config', () => {
    setup(true, ['GESTOR']);
    const tree = asUrlTree(
      TestBed.runInInjectionContext(() => permissionGuard('editGlobalConfig')({} as Route, []))
    );
    expect(tree.toString()).toBe('/home');
  });
});

@Component({ standalone: true, template: '' })
class Blank {}

/**
 * The guards above are exercised as plain functions, which cannot see WHEN the
 * router runs them. That matters here: canMatch is evaluated during
 * recognition and canActivate during activation, so a child's canMatch runs
 * BEFORE its parent's canActivate. If the role guard rejects an anonymous
 * visitor, the router abandons the requested navigation and starts a new one,
 * and authGuard — which builds the returnUrl — only ever sees the fallback.
 * These tests navigate for real so that ordering is pinned.
 */
describe('returnUrl through a real navigation', () => {
  afterEach(() => TestBed.resetTestingModule());

  function routerWithShell(): Router {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'login', component: Blank },
          {
            path: '',
            canActivate: [authGuard],
            children: [
              { path: 'home', component: Blank },
              { path: 'perfil', component: Blank },
              { path: 'admin/usuarios', canMatch: [permissionGuard('manageUsers')], component: Blank },
            ],
          },
        ]),
        { provide: TokenStoreService, useValue: stubStore(false) },
      ],
    });
    return TestBed.inject(Router);
  }

  it('keeps the destination of a plain guarded route', async () => {
    const router = routerWithShell();
    await router.navigateByUrl('/perfil');
    expect(router.url).toBe('/login?returnUrl=%2Fperfil');
  });

  it('keeps the destination of a ROLE-guarded route for an anonymous visitor', async () => {
    const router = routerWithShell();
    await router.navigateByUrl('/admin/usuarios');
    expect(router.url).toBe('/login?returnUrl=%2Fadmin%2Fusuarios');
  });
});
