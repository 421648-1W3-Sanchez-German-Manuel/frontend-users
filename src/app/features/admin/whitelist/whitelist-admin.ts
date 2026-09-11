import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { WhitelistRequest } from '../../../core/models/admin.model';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { FuButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'fu-whitelist-admin',
  standalone: true,
  imports: [Spinner, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whitelist-admin.html',
})
export class WhitelistAdmin {
  private readonly adminService = inject(AdminService);
  private readonly toast = inject(ToastService);

  protected readonly requests = signal<WhitelistRequest[] | null | undefined>(undefined);
  protected readonly processingId = signal<string | null>(null);

  constructor() {
    this.load();
  }

  private load(): void {
    this.requests.set(undefined);
    this.adminService
      .listWhitelistRequests()
      .pipe(catchError(() => of(null)))
      .subscribe((list) => this.requests.set(list));
  }

  review(request: WhitelistRequest, status: 'APPROVED' | 'REJECTED'): void {
    this.processingId.set(request.id);
    this.adminService.reviewWhitelistRequest(request.id, { status }).subscribe({
      next: () => {
        this.processingId.set(null);
        this.toast.success(status === 'APPROVED' ? 'Solicitud aprobada' : 'Solicitud rechazada');
        this.load();
      },
      error: () => {
        this.processingId.set(null);
        this.toast.error('No pudimos actualizar la solicitud');
      },
    });
  }
}
