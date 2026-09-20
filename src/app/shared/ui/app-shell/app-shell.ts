import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, of } from 'rxjs';
import { PageBackground } from '../page-background/page-background';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { AuthService } from '../../../core/services/auth.service';
import { PermissionsService } from '../../../core/services/permissions.service';
import { TokenStoreService } from '../../../core/services/token-store.service';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Same hamburger + slide-in sidebar on every viewport — no separate desktop
 * nav row to keep in sync, no horizontal-scroll nav on narrow screens.
 */
@Component({
  selector: 'fu-app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PageBackground, ThemeToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fu-page-background />
    <div class="min-h-screen flex flex-col">
      <header
        class="sticky top-0 z-30 px-3 sm:px-6 py-3 flex items-center gap-3"
        style="background: var(--color-surface); border-bottom: 3px solid var(--color-border)"
      >
        <button
          type="button"
          class="w-10 h-10 flex flex-col items-center justify-center gap-[3px] shrink-0"
          style="background: var(--color-surface-2); border: 2px solid var(--color-border); box-shadow: var(--shadow-sm)"
          (click)="sidebarOpen.set(true)"
          aria-label="Abrir menú"
          [attr.aria-expanded]="sidebarOpen()"
        >
          <span class="w-5 h-[2.5px]" style="background: var(--color-text)"></span>
          <span class="w-5 h-[2.5px]" style="background: var(--color-text)"></span>
          <span class="w-5 h-[2.5px]" style="background: var(--color-text)"></span>
        </button>

        <a routerLink="/home" class="flex items-center gap-2 font-display text-[0.6rem] shrink-0" style="color: var(--color-text)">
          <span
            class="w-8 h-8 flex items-center justify-center text-sm shrink-0"
            style="background: var(--color-primary); color: var(--color-primary-contrast); border: 2px solid var(--color-border); box-shadow: var(--shadow-sm)"
            >ID</span
          >
          <span class="hidden sm:inline">IDENTIDAD&nbsp;01</span>
        </a>

        <div class="flex-1"></div>
        <fu-theme-toggle />
      </header>

      @if (sidebarOpen()) {
        <div
          class="fixed inset-0 z-40"
          style="background: rgba(10, 8, 20, 0.55); animation: fu-pop-in 0.15s ease-out"
          (click)="sidebarOpen.set(false)"
          aria-hidden="true"
        ></div>
      }

      <aside
        class="fixed inset-y-0 left-0 z-50 w-[min(85vw,20rem)] flex flex-col transition-transform duration-200 ease-out"
        style="background: var(--color-surface); border-right: 3px solid var(--color-border); box-shadow: var(--shadow-lg)"
        [style.transform]="sidebarOpen() ? 'translateX(0)' : 'translateX(-100%)'"
        role="dialog"
        aria-label="Menú de navegación"
      >
        <div class="flex items-center justify-between px-4 py-3" style="border-bottom: 3px solid var(--color-border)">
          <span class="font-display text-[0.6rem]" style="color: var(--color-text)">IDENTIDAD&nbsp;01</span>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center text-lg leading-none"
            style="background: var(--color-surface-2); border: 2px solid var(--color-border)"
            (click)="sidebarOpen.set(false)"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <div class="px-4 py-4" style="border-bottom: 3px solid var(--color-border)">
          <div class="flex items-center gap-3">
            <span
              class="w-10 h-10 flex items-center justify-center font-mono font-semibold text-sm shrink-0"
              style="background: var(--color-magenta); color: #fff; border: 2px solid var(--color-border); box-shadow: var(--shadow-sm)"
            >
              {{ initials() }}
            </span>
            <div class="min-w-0">
              @if (me(); as me) {
                <p class="text-sm truncate" style="color: var(--color-text)">{{ me.firstNames }} {{ me.lastNames }}</p>
                <p class="text-xs truncate" style="color: var(--color-text-muted)">{{ me.email }}</p>
              } @else {
                <p class="text-sm" style="color: var(--color-text-muted)">Mi cuenta</p>
              }
            </div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          <a routerLink="/home" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)">Inicio</a>
          <a routerLink="/perfil" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)">Mi perfil</a>
          @if (perms.can('requestWhitelist')) {
            <a routerLink="/whitelist/solicitar" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)"
              >Solicitar whitelist</a
            >
          }
          @if (perms.can('manageUsers') || perms.can('manageWhitelist')) {
            <p class="fu-nav-section">Administración</p>
            @if (perms.can('manageUsers')) {
              <a routerLink="/admin/usuarios" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)">Usuarios</a>
            }
            @if (perms.can('manageWhitelist')) {
              <a routerLink="/admin/whitelist" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)"
                >Whitelist</a
              >
            }
            @if (perms.can('editGlobalConfig')) {
              <a routerLink="/admin/configuracion" routerLinkActive="fu-nav-active" class="fu-nav-link" (click)="sidebarOpen.set(false)"
                >Configuraciones globales</a
              >
            }
          }
        </nav>

        <div class="px-3 py-3 flex flex-col gap-1" style="border-top: 3px solid var(--color-border)">
          <a routerLink="/cambiar-password" class="fu-nav-link" (click)="sidebarOpen.set(false)">Cambiar contraseña</a>
          <button type="button" class="fu-nav-link text-left" style="color: var(--color-danger)" (click)="logout()">Cerrar sesión</button>
        </div>
      </aside>

      <main class="flex-1 px-4 sm:px-8 py-8">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .fu-nav-link {
        display: flex;
        align-items: center;
        padding: 0.7rem 0.9rem;
        border: 2px solid transparent;
        font-family: var(--font-display);
        font-size: 0.6rem;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        white-space: nowrap;
        transition: all 0.1s ease-out;
      }
      .fu-nav-link:hover {
        color: var(--color-text);
        background: var(--color-surface-2);
        border-color: var(--color-border);
      }
      .fu-nav-active {
        color: var(--color-cyan) !important;
        border-color: var(--color-cyan) !important;
        background: var(--color-surface-2);
      }
      .fu-nav-section {
        margin: 0.5rem 0 0.1rem 0.9rem;
        font-family: var(--font-display);
        font-size: 0.5rem;
        letter-spacing: 0.03em;
        color: var(--color-text-faint);
      }
    `,
  ],
})
export class AppShell {
  private readonly tokenStore = inject(TokenStoreService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly sidebarOpen = signal(false);
  protected readonly perms = inject(PermissionsService);
  protected readonly me = toSignal(this.authService.me().pipe(catchError(() => of(null))), { initialValue: null });
  protected readonly initials = computed(() => {
    const me = this.me();
    if (me) return `${me.firstNames.charAt(0)}${me.lastNames.charAt(0)}`.toUpperCase();
    const claims = this.tokenStore.claims();
    return claims ? claims.sub.slice(0, 2).toUpperCase() : '??';
  });

  @HostListener('document:keydown.escape')
  protected closeOnEscape(): void {
    this.sidebarOpen.set(false);
  }

  protected logout(): void {
    this.sidebarOpen.set(false);
    this.authService.logout().subscribe(() => {
      this.toast.info('Sesión cerrada');
      this.router.navigateByUrl('/login');
    });
  }
}
