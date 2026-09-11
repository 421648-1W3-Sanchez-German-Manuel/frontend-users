import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { FuButton } from '../../shared/ui/button/button';
import { ApiError } from '../../core/models/problem-details.model';

@Component({
  selector: 'fu-whitelist-request',
  standalone: true,
  imports: [ReactiveFormsModule, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whitelist-request.html',
})
export class WhitelistRequestPage {
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminService);
  private readonly location = inject(Location);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.adminService.createWhitelistRequest(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.location.back();
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'validation') {
          this.errorMessage.set('Revisá el email ingresado.');
        } else {
          this.errorMessage.set('No pudimos enviar la solicitud. Probá de nuevo.');
        }
      },
    });
  }
}
