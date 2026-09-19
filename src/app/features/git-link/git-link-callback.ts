import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';
import { GitLinkService } from '../../core/services/git-link.service';
import { TokenStoreService } from '../../core/services/token-store.service';
import { ApiError } from '../../core/models/problem-details.model';

/** Spanish copy for every failure of this screen (§9.6). */
const COPY: Record<string, string> = {
  'invalid-link-state': 'La vinculación venció o ya se usó. Volvé a intentar.',
  'link-user-mismatch': 'Esta vinculación la empezó otra sesión. Volvé a iniciar el proceso.',
  'provider-already-linked': 'Ya tenés una cuenta de GitHub vinculada. Desvinculala primero si querés cambiarla.',
  'provider-account-taken': 'Esa cuenta de GitHub ya está vinculada a otro usuario.',
  'provider-not-linked': 'No hay una cuenta de GitHub para desvincular.',
  'provider-not-supported': 'GitHub no está disponible ahora.',
  'provider-unavailable': 'GitHub no respondió. Probá de nuevo en unos minutos.',
  'access-denied': 'Cancelaste la autorización en GitHub. Podés volver a intentar.',
};

type Status = 'working' | 'error';

@Component({
  selector: 'fu-git-link-callback',
  standalone: true,
  imports: [AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './git-link-callback.html',
})
export class GitLinkCallback {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly gitLinks = inject(GitLinkService);
  private readonly tokenStore = inject(TokenStoreService);

  private readonly params = this.route.snapshot.queryParamMap;
  protected readonly status = signal<Status>('working');
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    const githubError = this.params.get('error');
    const code = this.params.get('code') ?? '';
    const state = this.params.get('state') ?? '';
    if (githubError) {
      // The person cancelled (or failed) at GitHub: nothing to send backend.
      this.fail(COPY['access-denied']);
    } else if (!code || !state) {
      this.fail(COPY['invalid-link-state']);
    } else {
      this.complete(code, state);
    }
  }

  private complete(code: string, state: string): void {
    this.gitLinks.callback('GITHUB', { code, state }).subscribe({
      next: () => {
        const backTo = this.gitLinks.takeReturn()
          ?? (this.tokenStore.onboardingPending() ? 'onboarding' : 'profile');
        if (backTo === 'onboarding') {
          // Same pattern as the tour onboarding: patch the in-memory claims,
          // refresh for a JWT with onb:false, then enter.
          this.authService.patchOnboardingClaims();
          this.authService.refresh().subscribe({
            next: () => this.router.navigateByUrl('/home'),
            error: () => this.router.navigateByUrl('/home'),
          });
        } else {
          this.router.navigateByUrl('/perfil');
        }
      },
      error: (error: unknown) => {
        // A 401 here means the session died while at GitHub: the interceptor
        // already sent the person to /login, and the code is unusable. Any
        // other type gets its inline copy.
        if (error instanceof ApiError) {
          this.fail(error.slug && COPY[error.slug]
            ? COPY[error.slug]
            : 'No pudimos completar la vinculación. Probá de nuevo.');
        } else {
          this.fail('No pudimos completar la vinculación. Probá de nuevo.');
        }
      },
    });
  }

  private fail(message: string): void {
    this.status.set('error');
    this.errorMessage.set(message);
  }

  /** Back to where the flow started; a fresh start mints a fresh state. */
  retry(): void {
    const backTo = this.gitLinks.takeReturn()
      ?? (this.tokenStore.onboardingPending() ? 'onboarding' : 'profile');
    this.router.navigateByUrl(backTo === 'onboarding' ? '/onboarding' : '/perfil');
  }
}
