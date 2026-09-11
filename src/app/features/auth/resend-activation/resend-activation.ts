import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'fu-resend-activation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resend-activation.html',
})
export class ResendActivation {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  protected readonly loading = signal(false);
  protected readonly sent = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    // A 200 here means the same thing whether or not the account exists —
    // that's the backend's anti-enumeration design, not something to work
    // around. A real error (validation, service down) still surfaces.
    this.authService.resendActivation(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.sent.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('No pudimos procesar el pedido. Probá de nuevo en un momento.');
      },
    });
  }
}
