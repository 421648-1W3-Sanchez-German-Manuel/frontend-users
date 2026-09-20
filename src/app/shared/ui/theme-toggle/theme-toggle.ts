import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'fu-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex items-center gap-2">
      <!-- Color Scheme Pill: Day (Sun) / Night (Moon) -->
      <div
        class="inline-flex"
        role="group"
        aria-label="Esquema de color"
        style="border: 2px solid var(--color-border); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); overflow: hidden;"
      >
        <button
          type="button"
          class="w-8 h-8 sm:w-9 sm:h-8 flex items-center justify-center text-sm transition-transform duration-75 active:translate-y-0.5"
          [style.background]="theme.mode() === 'light' ? 'var(--color-gold)' : 'var(--color-surface-2)'"
          [style.color]="theme.mode() === 'light' ? 'var(--color-gold-contrast)' : 'var(--color-text)'"
          style="border-right: 2px solid var(--color-border)"
          (click)="theme.setMode('light')"
          [attr.aria-pressed]="theme.mode() === 'light'"
          aria-label="Modo día"
          title="Modo día (Light)"
        >
          ☀️
        </button>
        <button
          type="button"
          class="w-8 h-8 sm:w-9 sm:h-8 flex items-center justify-center text-sm transition-transform duration-75 active:translate-y-0.5"
          [style.background]="theme.mode() === 'dark' ? 'var(--color-primary)' : 'var(--color-surface-2)'"
          [style.color]="theme.mode() === 'dark' ? 'var(--color-primary-contrast)' : 'var(--color-text)'"
          (click)="theme.setMode('dark')"
          [attr.aria-pressed]="theme.mode() === 'dark'"
          aria-label="Modo noche"
          title="Modo noche (Dark)"
        >
          🌙
        </button>
      </div>

      <!-- Component Aesthetic Pill: Arcade / Pro -->
      <div
        class="inline-flex"
        role="group"
        aria-label="Estilo visual"
        style="border: 2px solid var(--color-border); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); overflow: hidden;"
      >
        <button
          type="button"
          class="px-2 h-8 flex items-center justify-center gap-1 text-xs font-semibold transition-transform duration-75 active:translate-y-0.5"
          [style.background]="theme.style() === 'arcade' ? 'var(--color-cyan)' : 'var(--color-surface-2)'"
          [style.color]="theme.style() === 'arcade' ? 'var(--color-cyan-contrast)' : 'var(--color-text)'"
          style="border-right: 2px solid var(--color-border)"
          (click)="theme.setStyle('arcade')"
          [attr.aria-pressed]="theme.style() === 'arcade'"
          aria-label="Estilo Arcade"
          title="Estilo Arcade (Retro / Pixel)"
        >
          <span>🕹️</span>
          <span class="hidden sm:inline font-mono">Arcade</span>
        </button>
        <button
          type="button"
          class="px-2 h-8 flex items-center justify-center gap-1 text-xs font-semibold transition-transform duration-75 active:translate-y-0.5"
          [style.background]="theme.style() === 'pro' ? 'var(--color-magenta)' : 'var(--color-surface-2)'"
          [style.color]="theme.style() === 'pro' ? 'var(--color-magenta-contrast)' : 'var(--color-text)'"
          (click)="theme.setStyle('pro')"
          [attr.aria-pressed]="theme.style() === 'pro'"
          aria-label="Estilo Pro"
          title="Estilo Pro (Moderno / Sleek)"
        >
          <span>💼</span>
          <span class="hidden sm:inline font-mono">Pro</span>
        </button>
      </div>
    </div>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
