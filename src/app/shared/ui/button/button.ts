import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[fuButton]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-busy]': 'loading()',
  },
  template: `
    @if (loading()) {
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-90" d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      </svg>
    }
    <ng-content />
  `,
})
export class FuButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly loading = input(false);
  readonly disabled = input(false);

  protected readonly classes = computed(() =>
    ['fu-btn', `fu-btn--${this.variant()}`, this.size() !== 'md' ? `fu-btn--${this.size()}` : '']
      .filter(Boolean)
      .join(' ')
  );
}
