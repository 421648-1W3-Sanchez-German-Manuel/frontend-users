import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

function scorePassword(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 5);
}

const LEVELS = [
  { label: 'Muy débil', color: 'var(--color-danger)' },
  { label: 'Débil', color: 'var(--color-danger)' },
  { label: 'Regular', color: 'var(--color-gold)' },
  { label: 'Buena', color: 'var(--color-cyan)' },
  { label: 'Fuerte', color: 'var(--color-success)' },
  { label: 'Excelente', color: 'var(--color-success)' },
];

@Component({
  selector: 'fu-password-strength',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (password()) {
      <div class="mt-2">
        <div class="flex gap-1 h-2">
          @for (i of [0, 1, 2, 3, 4]; track i) {
            <div
              class="flex-1 transition-all duration-300"
              style="border: 1.5px solid var(--color-border)"
              [style.background]="i < score() ? level().color : 'var(--color-surface-2)'"
            ></div>
          }
        </div>
        <p class="text-xs mt-1" [style.color]="level().color">{{ level().label }}</p>
      </div>
    }
  `,
})
export class PasswordStrength {
  readonly password = input('');
  protected readonly score = computed(() => scorePassword(this.password()));
  protected readonly level = computed(() => LEVELS[this.score()]);
}
