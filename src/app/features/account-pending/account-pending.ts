import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';

type CheckState = 'idle' | 'checking' | 'still-pending' | 'now-active';

@Component({
  selector: 'fu-account-pending',
  standalone: true,
  imports: [AuthShell, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-pending.html',
})
export class AccountPending {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly checkState = signal<CheckState>('idle');

  checkStatus(): void {
    this.checkState.set('checking');
    // GET /me always answers, even while this gate is active — it's the
    // only way to see *why* we're blocked, and whether Cursos already
    // validated the padrón asynchronously.
    this.authService.me().subscribe({
      next: (me) => {
        this.checkState.set(me.accountStatus === 'ACTIVE' ? 'now-active' : 'still-pending');
      },
      error: () => this.checkState.set('still-pending'),
    });
  }

  reLogin(): void {
    this.authService.clearLocalSession();
    this.router.navigateByUrl('/login');
  }
}
