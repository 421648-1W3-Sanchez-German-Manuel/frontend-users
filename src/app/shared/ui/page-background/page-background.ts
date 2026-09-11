import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Flat decorative backdrop: solid bg + faint pixel grid + a slow scanline
 * sweep, instead of blurred gradient blobs — reads as CRT/arcade rather than
 * a modern SaaS glow. Purely decorative (aria-hidden).
 */
@Component({
  selector: 'fu-page-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0" style="background: var(--color-bg)"></div>
      <div class="absolute inset-0 fu-noise-grid"></div>
      <div class="fu-scanline"></div>
    </div>
  `,
})
export class PageBackground {}
