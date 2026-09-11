import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBackground } from '../../shared/ui/page-background/page-background';

@Component({
  selector: 'fu-not-found',
  standalone: true,
  imports: [RouterLink, PageBackground],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fu-page-background />
    <div class="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div class="text-7xl font-display mb-6" style="color: var(--color-primary)">404</div>
      <h1 class="text-lg mb-2" style="color: var(--color-text)">Página no encontrada</h1>
      <p class="text-sm mb-8" style="color: var(--color-text-muted)">La ruta que buscás no existe.</p>
      <a routerLink="/" class="fu-btn fu-btn--primary">Volver al inicio</a>
    </div>
  `,
})
export class NotFound {}
