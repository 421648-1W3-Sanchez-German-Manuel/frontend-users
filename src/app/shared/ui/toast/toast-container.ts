import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'fu-toast-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[min(24rem,calc(100vw-2rem))]" role="region" aria-live="polite">
      @for (toast of toasts.toasts(); track toast.id) {
        <div
          class="fu-card !p-4 flex items-start gap-3"
          style="animation: fu-pop-in 0.2s ease-out; border-left-width: 5px"
          [style.border-left-color]="colorFor(toast.kind)"
        >
          <span class="text-lg leading-none mt-0.5">{{ iconFor(toast.kind) }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm" style="color: var(--color-text)">{{ toast.title }}</p>
            @if (toast.detail) {
              <p class="text-sm mt-0.5" style="color: var(--color-text-muted)">{{ toast.detail }}</p>
            }
          </div>
          <button
            type="button"
            class="text-xs opacity-60 hover:opacity-100 transition-opacity"
            (click)="toasts.dismiss(toast.id)"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainer {
  protected readonly toasts = inject(ToastService);

  protected iconFor(kind: string): string {
    return { info: 'ℹ️', success: '✅', warning: '⚠️', error: '⛔' }[kind] ?? 'ℹ️';
  }

  protected colorFor(kind: string): string {
    return (
      {
        info: 'var(--color-cyan)',
        success: 'var(--color-success)',
        warning: 'var(--color-gold)',
        error: 'var(--color-danger)',
      }[kind] ?? 'var(--color-cyan)'
    );
  }
}
