import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';
import { ApiError } from '../../core/models/problem-details.model';

interface TourStep {
  icon: string;
  title: string;
  body: string;
}

const TOUR_STEPS: TourStep[] = [
  { icon: '🛡️', title: 'Tu identidad, un solo lugar', body: 'Iniciás sesión una vez y esa cuenta te sigue por toda la plataforma.' },
  { icon: '🔐', title: 'Doble verificación', body: 'Cada login pide un código que te llega por email, además de tu contraseña.' },
  { icon: '🐙', title: 'Sumá tu GitHub', body: 'Lo vamos a usar para vincular tus entregas y proyectos automáticamente.' },
];

@Component({
  selector: 'fu-onboarding',
  standalone: true,
  imports: [ReactiveFormsModule, AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onboarding.html',
})
export class Onboarding {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly steps = TOUR_STEPS;
  protected readonly stepIndex = signal(0);
  protected readonly tourDone = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    githubUsername: ['', Validators.required],
    avatarRef: [''],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  next(): void {
    if (this.stepIndex() < this.steps.length - 1) {
      this.stepIndex.update((i) => i + 1);
    } else {
      this.tourDone.set(true);
    }
  }

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { githubUsername, avatarRef } = this.form.getRawValue();

    this.authService.patchOnboarding({ githubUsername, avatarRef: avatarRef || null, tourOk: true }).subscribe({
      next: () => {
        this.loading.set(false);
        // 200 here does NOT refresh the claims already in memory — the token
        // still says onb:true. But a refresh re-reads the user row (firstLogin
        // is now false) and emits fresh claims, so the person goes on without a
        // second login. If the refresh fails, fall back to the old behavior.
        this.authService.refresh().subscribe({
          next: () => this.router.navigateByUrl('/home'),
          error: () => {
            this.authService.clearLocalSession();
            this.router.navigate(['/login'], { queryParams: { motivo: 'onboarded' } });
          },
        });
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'validation') {
          this.errorMessage.set('Revisá el usuario de GitHub ingresado.');
        } else {
          this.errorMessage.set('No pudimos completar el onboarding. Probá de nuevo.');
        }
      },
    });
  }
}
