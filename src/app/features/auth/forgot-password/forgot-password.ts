import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/problem-details.model';

@Component({
  selector: 'fu-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
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
    this.authService.requestPasswordReset(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.sent.set(true);
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'too-many-attempts') {
          const seconds = error.problem.retryAfterSeconds ?? 900;
          const minutes = Math.ceil(seconds / 60);
          this.errorMessage.set(`Ya pediste varios reintentos. Probá de nuevo en ${minutes} minutos.`);
        } else {
          this.errorMessage.set('No pudimos procesar el pedido. Probá de nuevo en un momento.');
        }
      },
    });
  }
}
