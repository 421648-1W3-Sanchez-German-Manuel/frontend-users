import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { ReviewWhitelistRequest, WhitelistRequest } from '../../../core/models/admin.model';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { FuButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'fu-whitelist-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, Spinner, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whitelist-admin.html',
})
export class WhitelistAdmin {
  private readonly adminService = inject(AdminService);
  private readonly toast = inject(ToastService);

  protected readonly requests = signal<WhitelistRequest[] | null | undefined>(undefined);
  protected readonly processingId = signal<string | null>(null);
  protected readonly rejectionReasons = signal<Record<string, string>>({});

  protected readonly pending = computed(() => this.requests()?.filter((r) => r.status === 'PENDING') ?? []);
  protected readonly resolved = computed(() => this.requests()?.filter((r) => r.status !== 'PENDING') ?? []);

  constructor() {
    this.load();
  }

  setRejectionReason(id: string, value: string): void {
    this.rejectionReasons.update((m) => ({ ...m, [id]: value }));
  }

  protected statusLabel(status: WhitelistRequest['status']): string {
    return status === 'APPROVED' ? 'Aprobada' : status === 'REJECTED' ? 'Rechazada' : 'Pendiente';
  }

  protected approve(request: WhitelistRequest): void {
    this.review(request, { approve: true });
  }

  protected reject(request: WhitelistRequest): void {
    const reason = (this.rejectionReasons()[request.id] ?? '').trim();
    if (!reason) {
      this.toast.error('El rechazo exige un motivo');
      return;
    }
    this.review(request, { approve: false, rejectionReason: reason });
  }

  private review(request: WhitelistRequest, body: ReviewWhitelistRequest): void {
    if (this.processingId()) return;
    this.processingId.set(request.id);
    this.adminService.reviewWhitelistRequest(request.id, body).subscribe({
      next: () => {
        this.processingId.set(null);
        this.toast.success(body.approve ? 'Solicitud aprobada' : 'Solicitud rechazada');
        this.setRejectionReason(request.id, '');
        this.load();
      },
      error: () => {
        this.processingId.set(null);
        this.toast.error('No pudimos actualizar la solicitud');
      },
    });
  }

  private load(): void {
    this.requests.set(undefined);
    this.adminService
      .listWhitelistRequests()
      .pipe(catchError(() => of(null)))
      .subscribe((list) => this.requests.set(list));
  }
}