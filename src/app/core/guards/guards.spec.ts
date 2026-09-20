import { TestBed } from '@angular/core/testing';
import { Route, Router, UrlTree, provideRouter } from '@angular/router';
import { Role } from '../models/auth.model';
import { TokenStoreService } from '../services/token-store.service';
import { authGuard, guestGuard, safeReturnUrl } from './auth.guard';
import { roleGuard } from './role.guard';

/** Only the slice of TokenStoreService the guards actually read. */
function stubStore(authenticated: boolean, roles: Role[] = []) {
  return { isAuthenticated: () => authenticated, roles: () => roles };
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

describe('roleGuard', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('matches the route when the visitor holds one of the allowed roles', () => {
    setup(true, ['ADMIN']);
    const result = TestBed.runInInjectionContext(() => roleGuard(['ADMIN', 'GESTOR'])({} as Route, []));
    expect(result).toBe(true);
  });

  it('redirects to /home when the visitor holds none of them', () => {
    setup(true, ['STUDENT']);
    const tree = asUrlTree(TestBed.runInInjectionContext(() => roleGuard(['ADMIN'])({} as Route, [])));
    expect(tree.toString()).toBe('/home');
  });
});
