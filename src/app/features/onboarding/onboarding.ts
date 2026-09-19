import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';
import { GitLinkService } from '../../core/services/git-link.service';
import { ApiError } from '../../core/models/problem-details.model';

interface TourStep {
  icon: string;
  title: string;
  body: string;
}

const TOUR_STEPS: TourStep[] = [
  { icon: '🛡️', title: 'Tu identidad, un solo lugar', body: 'Iniciás sesión una vez y esa cuenta te sigue por toda la plataforma.' },
  { icon: '🔐', title: 'Doble verificación', body: 'Cada login pide un código que te llega por email, además de tu contraseña.' },
];

type Phase = 'tour' | 'link';

/**
 * Onboarding = tour + real OAuth link (DEC-GL-11). No text input: the GitHub
 * handle is never typed by hand. The tour PATCH alone does NOT open the gate
 * (DEC-GL-14) — the successful callback does.
 */
@Component({
  selector: 'fu-onboarding',
  standalone: true,
  imports: [AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onboarding.html',
})
export class Onboarding {
  private readonly authService = inject(AuthService);
  private readonly gitLinks = inject(GitLinkService);
  private readonly router = inject(Router);

  protected readonly steps = TOUR_STEPS;
  protected readonly stepIndex = signal(0);
  protected readonly phase = signal<Phase>('tour');
  /** GitHub disabled backend-side (DEC-GL-05 escape): the tour alone lets in. */
  protected readonly githubDisabled = signal(false);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    // The callback closed the link but the refresh failed before navigating:
    // GET /me already carries the mirror — do not show the button again.
    this.authService.me().subscribe({
      next: (me) => {
        if (me.githubUsername) this.enter();
      },
      error: () => void 0,
    });
  }

  next(): void {
    if (this.stepIndex() < this.steps.length - 1) {
      this.stepIndex.update((i) => i + 1);
    } else {
      this.submitTour();
    }
  }

  /** Records the tour. Alone it never clears first_login while GitHub is on. */
  private submitTour(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService.patchOnboarding({ tourOk: true }).subscribe({
      next: () => {
        this.loading.set(false);
        this.phase.set('link');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        this.errorMessage.set(error instanceof ApiError && error.slug === 'validation'
          ? 'No pudimos registrar el tour. Probá de nuevo.'
          : 'No pudimos completar el onboarding. Probá de nuevo.');
      },
    });
  }

  /** Full redirect, not a popup: the HttpOnly session cookies survive it. */
  linkGithub(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.errorMessage.set(null);
    this.gitLinks.start('GITHUB').subscribe({
      next: (res) => {
        this.gitLinks.rememberReturn('onboarding');
        window.location.assign(res.authorizationUrl);
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'provider-not-supported') {
          this.githubDisabled.set(true);
        } else if (error instanceof ApiError && error.slug === 'provider-already-linked') {
          this.enter();
        } else {
          this.errorMessage.set('No pudimos iniciar la vinculación. Probá de nuevo.');
        }
      },
    });
  }

  /** Escape hatch: with GitHub disabled the tour is enough to enter. */
  enter(): void {
    this.authService.patchOnboardingClaims();
    this.authService.refresh().subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.router.navigateByUrl('/home'),
    });
  }
}
