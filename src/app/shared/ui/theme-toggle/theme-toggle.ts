import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'fu-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex" style="border: 2.5px solid var(--color-border); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm)">
      <button
        type="button"
        class="w-9 h-8 flex items-center justify-center text-sm transition-transform duration-75 active:translate-y-0.5"
        [style.background]="theme.mode() === 'light' ? 'var(--color-gold)' : 'var(--color-surface-2)'"
        style="border-right: 2.5px solid var(--color-border)"
        (click)="theme.set('light')"
        [attr.aria-pressed]="theme.mode() === 'light'"
        aria-label="Modo claro"
      >
        ☀
      </button>
      <button
        type="button"
        class="w-9 h-8 flex items-center justify-center text-sm transition-transform duration-75 active:translate-y-0.5"
        [style.background]="theme.mode() === 'dark' ? 'var(--color-primary)' : 'var(--color-surface-2)'"
        (click)="theme.set('dark')"
        [attr.aria-pressed]="theme.mode() === 'dark'"
        aria-label="Modo oscuro"
      >
        ☾
      </button>
    </div>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
