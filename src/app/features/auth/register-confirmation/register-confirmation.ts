import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'fu-register-confirmation',
  standalone: true,
  imports: [AuthShell, FuButton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fu-auth-shell title="Revisá tu email" subtitle="Estás a un paso de activar tu cuenta">
      <div class="text-center">
        <div class="text-5xl mb-4" style="animation: fu-float 3s ease-in-out infinite">📬</div>
        <p class="text-sm" style="color: var(--color-text-muted)">
          Te enviamos un enlace de activación
          @if (email) {
            a <strong style="color: var(--color-text)">{{ email }}</strong>
          } @else {
            a tu casilla de correo
          }. Abrilo y presioná el botón de activar para poder iniciar sesión.
        </p>
        <p class="text-xs mt-3" style="color: var(--color-text-faint)">
          Si tu cliente de correo institucional escanea los enlaces automáticamente, no te preocupes: la activación
          solo ocurre cuando vos apretás el botón, no al abrir el link.
        </p>
      </div>

      <button fuButton variant="secondary" class="mt-6 w-full" (click)="goLogin()">Ir a iniciar sesión</button>
      <p class="text-center text-xs mt-4" style="color: var(--color-text-faint)">
        ¿No te llegó nada?
        <a routerLink="/reenviar-activacion" class="font-medium hover:underline" style="color: var(--color-cyan)">Reenviar enlace</a>
      </p>
    </fu-auth-shell>
  `,
})
export class RegisterConfirmation {
  private readonly router = inject(Router);
  protected readonly email = (history.state?.email as string) ?? '';

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
