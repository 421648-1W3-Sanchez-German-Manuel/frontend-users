import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { PasswordStrength } from '../../shared/ui/password-strength/password-strength';
import { AuthService } from '../../core/services/auth.service';
import { TokenStoreService } from '../../core/services/token-store.service';
import { ApiError } from '../../core/models/problem-details.model';

function passwordsMatch(group: { value: { newPassword: string; confirmPassword: string } }): ValidationErrors | null {
  return group.value.newPassword === group.value.confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'fu-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, AuthShell, FuButton, PasswordStrength],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './change-password.html',
})
export class ChangePassword {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly tokenStore = inject(TokenStoreService);
  private readonly router = inject(Router);

  protected readonly forced = computed(() => this.tokenStore.mustChangePassword());

  protected readonly form = this.fb.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      // Mirrors PasswordPolicy.MIN_CHARACTERS in users-service — keep both in sync.
      newPassword: ['', [Validators.required, Validators.minLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { currentPassword, newPassword } = this.form.getRawValue();

    this.authService.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.loading.set(false);
        // Changing the password closes the session by design — go straight
        // back to login instead of pretending we're still authenticated.
        this.authService.clearLocalSession();
        this.router.navigate(['/login'], { queryParams: { reason: 'password-changed' } });
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError) {
          if (error.slug === 'invalid-credentials') {
            this.errorMessage.set('La contraseña actual es incorrecta.');
          } else if (error.slug === 'validation') {
            this.errorMessage.set('La nueva contraseña no cumple la política requerida.');
          } else {
            this.errorMessage.set(error.problem.detail);
          }
        } else {
          this.errorMessage.set('No pudimos cambiar la contraseña. Probá de nuevo.');
        }
      },
    });
  }
}
