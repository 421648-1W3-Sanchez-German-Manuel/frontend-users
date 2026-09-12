import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthShell } from '../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';
import { TokenStoreService } from '../../core/services/token-store.service';

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
  private readonly tokenStore = inject(TokenStoreService);

  protected readonly checkState = signal<CheckState>('idle');
  protected readonly accountStatus = signal(this.tokenStore.accountStatus());
  protected readonly isPendingEmail = computed(() => this.accountStatus() === 'PENDING_EMAIL');

  checkStatus(): void {
    this.checkState.set('checking');
    // GET /me always answers, even while this gate is active — it's the
    // only way to see *why* we're blocked, and whether Cursos already
    // validated the padrón asynchronously.
    this.authService.me().subscribe({
      next: (me) => {
        this.accountStatus.set(me.accountStatus);
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
