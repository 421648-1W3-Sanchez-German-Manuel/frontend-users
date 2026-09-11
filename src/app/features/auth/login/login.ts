import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { LoginFlowState } from '../../../core/services/login-flow-state.service';
import { ApiError } from '../../../core/models/problem-details.model';

const MOTIVO_MESSAGES: Record<string, string> = {
  'session-superseded': 'Iniciaste sesión desde otro dispositivo, así que cerramos esta sesión acá.',
  'session-closed': 'Tu sesión ya no existe. Iniciá sesión de nuevo.',
  'not-authenticated': 'Necesitás iniciar sesión para continuar.',
  'password-changed': 'Tu contraseña se actualizó. Iniciá sesión con la nueva.',
  onboarded: 'Completaste el onboarding. Iniciá sesión de nuevo para continuar.',
};

@Component({
  selector: 'fu-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly loginFlowState = inject(LoginFlowState);
  private readonly router = inject(Router);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly retryAfter = signal<number | null>(null);

  protected readonly banner = computed(() => {
    const motivo = new URLSearchParams(window.location.search).get('motivo');
    return motivo ? MOTIVO_MESSAGES[motivo] ?? null : null;
  });

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.retryAfter.set(null);
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: (challenge) => {
        this.loading.set(false);
        this.loginFlowState.set({ challengeId: challenge.challengeId, email });
        this.router.navigateByUrl('/verificar-codigo');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError) {
          if (error.slug === 'invalid-credentials') {
            this.errorMessage.set('Email o contraseña incorrectos.');
          } else if (error.slug === 'too-many-attempts') {
            this.retryAfter.set(error.problem.retryAfterSeconds ?? 60);
            this.errorMessage.set('Demasiados intentos. Probá de nuevo en un rato.');
          } else if (error.slug === 'validation') {
            this.errorMessage.set('Revisá el email y la contraseña ingresados.');
          } else {
            this.errorMessage.set(error.problem.detail);
          }
        } else {
          this.errorMessage.set('No pudimos conectar con el servidor. Probá de nuevo.');
        }
      },
    });
  }
}
