import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'fu-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-block border-[3px] animate-spin"
      [style.width.px]="size()"
      [style.height.px]="size()"
      style="border-color: var(--color-border); border-top-color: var(--color-cyan);"
      role="status"
      aria-label="Cargando"
    ></div>
  `,
})
export class Spinner {
  readonly size = input(28);
}
