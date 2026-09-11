import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { PasswordStrength } from '../../../shared/ui/password-strength/password-strength';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/problem-details.model';

function passwordsMatch(group: { value: { newPassword: string; confirmPassword: string } }): ValidationErrors | null {
  return group.value.newPassword === group.value.confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'fu-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, AuthShell, FuButton, PasswordStrength],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  protected readonly form = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  protected readonly loading = signal(false);
  protected readonly success = signal(false);
  protected readonly errorMessage = signal<string | null>(this.token ? null : 'El enlace no tiene un token válido.');

  submit(): void {
    if (!this.token || this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService
      .confirmPasswordReset({ token: this.token, newPassword: this.form.controls.newPassword.value })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
        },
        error: (error: unknown) => {
          this.loading.set(false);
          if (error instanceof ApiError && error.slug === 'invalid-code') {
            this.errorMessage.set('El enlace es inválido, ya fue usado, o venció (dura 15 minutos).');
          } else if (error instanceof ApiError && error.slug === 'validation') {
            this.errorMessage.set('La contraseña no cumple la política requerida.');
          } else {
            this.errorMessage.set('No pudimos restablecer la contraseña. Probá de nuevo.');
          }
        },
      });
  }

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
