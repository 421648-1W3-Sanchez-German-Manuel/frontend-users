import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/problem-details.model';

type Status = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'fu-activate',
  standalone: true,
  imports: [AuthShell, FuButton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activate.html',
})
export class Activate {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';
  protected readonly status = signal<Status>(this.token ? 'idle' : 'error');
  protected readonly errorMessage = signal<string | null>(
    this.token ? null : 'El enlace no tiene un token válido.'
  );

  // Deliberately NOT triggered from ngOnInit: mail scanners (Safe Links,
  // Proofpoint) pre-visit links and would burn the token before the student
  // ever clicks it. Activation only happens on an explicit click.
  activate(): void {
    if (!this.token || this.status() === 'loading') return;
    this.status.set('loading');
    this.authService.activate({ token: this.token }).subscribe({
      next: () => this.status.set('success'),
      error: (error: unknown) => {
        this.status.set('error');
        if (error instanceof ApiError && error.slug === 'invalid-link') {
          this.errorMessage.set('El enlace de activación es inválido o ya venció.');
        } else {
          this.errorMessage.set('No pudimos activar la cuenta. Probá de nuevo.');
        }
      },
    });
  }

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
