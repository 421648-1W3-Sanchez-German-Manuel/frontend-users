import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ApiError } from '../../../core/models/problem-details.model';
import { OtpInput } from '../../../shared/ui/otp-input/otp-input';
import { FuButton } from '../../../shared/ui/button/button';

type Step = 'confirm' | 'code' | 'done';

@Component({
  selector: 'fu-user-delete',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, OtpInput, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-delete.html',
})
export class UserDelete {
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly targetEmail = (history.state?.email as string) ?? '';
  protected readonly targetName = (history.state?.name as string) ?? 'este usuario';

  protected readonly me = toSignal(this.authService.me().pipe(catchError(() => of(null))), { initialValue: null });

  protected readonly step = signal<Step>('confirm');
  protected readonly confirmForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    usernameConfirmation: ['', Validators.required],
  });
  protected readonly code = signal('');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  get confirmationMatches(): boolean {
    if (!this.targetEmail) return this.confirmForm.controls.usernameConfirmation.value.length > 0;
    return this.confirmForm.controls.usernameConfirmation.value.trim().toLowerCase() === this.targetEmail.toLowerCase();
  }

  // Step 1 re-authenticates the admin and, as a side effect of the normal
  // login endpoint, emails a fresh 6-digit code — the same mechanism as a
  // regular login 2FA challenge, just used here to prove "it's really you"
  // right before an irreversible action.
  requestCode(): void {
    if (this.confirmForm.invalid || !this.confirmationMatches || this.loading()) {
      this.confirmForm.markAllAsTouched();
      return;
    }
    const adminEmail = this.me()?.email;
    if (!adminEmail) {
      this.errorMessage.set('No pudimos identificar tu cuenta. Recargá la página.');
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService.login({ email: adminEmail, password: this.confirmForm.controls.password.value }).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set('code');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'invalid-credentials') {
          this.errorMessage.set('Tu contraseña actual es incorrecta.');
        } else if (error instanceof ApiError && error.slug === 'too-many-attempts') {
          this.errorMessage.set('Demasiados intentos. Probá de nuevo en un rato.');
        } else {
          this.errorMessage.set('No pudimos enviar el código de verificación.');
        }
      },
    });
  }

  confirmDelete(): void {
    if (this.code().length !== 6 || this.loading()) return;
    this.loading.set(true);
    this.errorMessage.set(null);
    this.adminService
      .deleteUser(this.id(), {
        password: this.confirmForm.controls.password.value,
        twoFactorCode: this.code(),
        usernameConfirmation: this.confirmForm.controls.usernameConfirmation.value,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.step.set('done');
          this.toast.success('Usuario eliminado');
        },
        error: (error: unknown) => {
          this.loading.set(false);
          if (error instanceof ApiError && error.slug === 'invalid-code') {
            this.errorMessage.set('El código de verificación es incorrecto o venció.');
          } else if (error instanceof ApiError && error.slug === 'last-admin') {
            this.errorMessage.set('No se puede eliminar al último administrador.');
          } else if (error instanceof ApiError) {
            this.errorMessage.set(error.problem.detail);
          } else {
            this.errorMessage.set('No pudimos eliminar el usuario. Probá de nuevo.');
          }
        },
      });
  }

  goToList(): void {
    this.router.navigateByUrl('/admin/usuarios');
  }
}
