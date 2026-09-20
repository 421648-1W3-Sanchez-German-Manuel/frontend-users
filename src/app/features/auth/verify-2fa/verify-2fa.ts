import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { OtpInput } from '../../../shared/ui/otp-input/otp-input';
import { AuthService } from '../../../core/services/auth.service';
import { LoginFlowState } from '../../../core/services/login-flow-state.service';
import { ApiError } from '../../../core/models/problem-details.model';

const CHALLENGE_TTL_SECONDS = 5 * 60;

@Component({
  selector: 'fu-verify-2fa',
  standalone: true,
  imports: [AuthShell, FuButton, OtpInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './verify-2fa.html',
})
export class Verify2fa implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly loginFlowState = inject(LoginFlowState);
  private readonly router = inject(Router);

  protected readonly email = this.loginFlowState.pending()?.email ?? '';
  protected readonly code = signal('');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly shake = signal(false);
  protected readonly secondsLeft = signal(CHALLENGE_TTL_SECONDS);

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!this.loginFlowState.pending()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.intervalId = setInterval(() => {
      this.secondsLeft.update((s) => Math.max(s - 1, 0));
      if (this.secondsLeft() === 0) {
        this.errorMessage.set('El código venció. Volvé a iniciar sesión para pedir uno nuevo.');
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  protected get formattedCountdown(): string {
    const m = Math.floor(this.secondsLeft() / 60);
    const s = this.secondsLeft() % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  submit(): void {
    const pending = this.loginFlowState.pending();
    if (!pending || this.code().length !== 6 || this.loading()) return;

    this.errorMessage.set(null);
    this.loading.set(true);
    this.authService.verify2fa({ challengeId: pending.challengeId, code: this.code() }).subscribe({
      next: () => {
        this.loading.set(false);
        const target = pending.returnUrl ?? '/home';
        this.loginFlowState.clear();
        this.router.navigateByUrl(target);
      },
      error: (error: unknown) => {
        this.loading.set(false);
        this.shake.set(false);
        queueMicrotask(() => this.shake.set(true));
        if (error instanceof ApiError) {
          if (error.slug === 'invalid-code') {
            this.errorMessage.set('Código incorrecto o vencido.');
          } else if (error.slug === 'too-many-attempts') {
            this.errorMessage.set(
              `Demasiados intentos. Esperá ${error.problem.retryAfterSeconds ?? 60}s y volvé a iniciar sesión.`
            );
          } else {
            this.errorMessage.set(error.problem.detail);
          }
        } else {
          this.errorMessage.set('No pudimos verificar el código. Probá de nuevo.');
        }
      },
    });
  }

  backToLogin(): void {
    this.loginFlowState.clear();
    this.router.navigateByUrl('/login');
  }
}
