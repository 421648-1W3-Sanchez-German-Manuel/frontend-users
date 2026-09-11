import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBackground } from '../page-background/page-background';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'fu-auth-shell',
  standalone: true,
  imports: [PageBackground, ThemeToggle, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fu-page-background />
    <div class="min-h-screen flex flex-col">
      <header class="flex items-center justify-between px-6 py-5 sm:px-10">
        <a routerLink="/" class="flex items-center gap-2 font-display text-[0.6rem]" style="color: var(--color-text)">
          <span
            class="w-8 h-8 flex items-center justify-center text-sm shrink-0"
            style="background: var(--color-primary); color: var(--color-primary-contrast); border: 2px solid var(--color-border); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm)"
            >ID</span
          >
          <span class="hidden sm:inline">IDENTIDAD&nbsp;01</span>
        </a>
        <fu-theme-toggle />
      </header>

      <main class="flex-1 flex items-center justify-center px-4 py-8">
        <div class="fu-card w-full !p-0 overflow-hidden" [style.max-width.px]="maxWidth()">
          <div class="fu-window-bar !mx-0 !mt-0">
            <span class="fu-window-dot" style="background: var(--color-danger)"></span>
            <span class="fu-window-dot" style="background: var(--color-gold)"></span>
            <span class="fu-window-dot" style="background: var(--color-success)"></span>
          </div>

          <div class="px-6 pb-8 sm:px-10 sm:pb-10">
            <div class="mb-7 text-center">
              <h1 class="text-base sm:text-lg leading-relaxed" style="color: var(--color-text)">{{ title() }}</h1>
              @if (subtitle()) {
                <p class="mt-3 text-lg" style="color: var(--color-text-muted)">{{ subtitle() }}</p>
              }
            </div>
            <ng-content />
          </div>
        </div>
      </main>

      <footer class="text-center pb-6 font-display text-[0.55rem] tracking-wide" style="color: var(--color-text-faint)">
        TPI · SUBSISTEMA DE IDENTIDAD
      </footer>
    </div>
  `,
})
export class AuthShell {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly maxWidth = input(440);
}
