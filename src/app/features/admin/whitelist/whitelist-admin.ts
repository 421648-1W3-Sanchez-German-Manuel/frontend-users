import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { ReviewWhitelistRequest, WhitelistEntry, WhitelistRequest } from '../../../core/models/admin.model';
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
  protected readonly directEmail = signal('');
  protected readonly adding = signal(false);
  protected readonly entries = signal<WhitelistEntry[] | null | undefined>(undefined);
  protected readonly removingId = signal<string | null>(null);

  protected readonly pending = computed(() => this.requests()?.filter((r) => r.status === 'PENDING') ?? []);
  protected readonly resolved = computed(() => this.requests()?.filter((r) => r.status !== 'PENDING') ?? []);

  constructor() {
    this.load();
    this.loadEntries();
  }

  protected addDirect(email: string): void {
    const value = email.trim();
    if (!value) {
      this.toast.error('Ingresá un email');
      return;
    }
    if (this.adding()) return;
    this.adding.set(true);
    this.adminService.addEmailToWhitelist({ email: value }).subscribe({
      next: () => {
        this.adding.set(false);
        this.directEmail.set('');
        this.toast.success('Email habilitado en la whitelist');
        this.loadEntries();
      },
      error: () => {
        this.adding.set(false);
        this.toast.error('No pudimos habilitar el email');
      },
    });
  }

  protected removeEntry(entry: WhitelistEntry): void {
    if (this.removingId()) return;
    this.removingId.set(entry.id);
    this.adminService.removeWhitelistEntry(entry.id).subscribe({
      next: () => {
        this.removingId.set(null);
        this.toast.success('Email quitado de la whitelist');
        this.loadEntries();
      },
      error: () => {
        this.removingId.set(null);
        this.toast.error('No pudimos quitar el email');
      },
    });
  }

  private loadEntries(showLoading = true, preserveScroll = false): void {
    const scrollPosition = preserveScroll ? window.scrollY : null;
    if (showLoading) this.entries.set(undefined);
    this.adminService
      .listWhitelist()
      .pipe(catchError(() => of(null)))
      .subscribe((list) => {
        this.entries.set(list);
        if (scrollPosition !== null) this.restoreScrollPosition(scrollPosition);
      });
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
        const scrollPosition = window.scrollY;
        this.processingId.set(null);
        this.toast.success(body.approve ? 'Solicitud aprobada' : 'Solicitud rechazada');
        this.setRejectionReason(request.id, '');
        this.requests.update(
          (current) =>
            current?.map((item) =>
              item.id === request.id
                ? {
                    ...item,
                    status: body.approve ? 'APPROVED' : 'REJECTED',
                    rejectionReason: body.approve ? undefined : body.rejectionReason,
                  }
                : item
            ) ?? current
        );
        this.restoreScrollPosition(scrollPosition);
        if (body.approve) this.loadEntries(false, true);
      },
      error: () => {
        this.processingId.set(null);
        this.toast.error('No pudimos actualizar la solicitud');
      },
    });
  }

  private restoreScrollPosition(scrollPosition: number): void {
    requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
  }

  private load(): void {
    this.requests.set(undefined);
    this.adminService
      .listWhitelistRequests()
      .pipe(catchError(() => of(null)))
      .subscribe((list) => this.requests.set(list));
  }
}