import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { ApiError } from '../../../core/models/problem-details.model';
import { GenericCard } from '@2026-p4-fe/ui';
import { FuButton } from '../../../shared/ui/button/button';

/** RF-ROL-03 - this form only creates ADMIN accounts. PROFESSOR and STUDENT
 *  come in through whitelist + self-registration, never from here. */
@Component({
  selector: 'fu-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FuButton, GenericCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-create.html',
})
export class UserCreate {
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.nonNullable.group({
    firstNames: ['', Validators.required],
    lastNames: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
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
    const { firstNames, lastNames, email, password } = this.form.getRawValue();

    this.adminService.createUser({ firstNames, lastNames, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success('Administrador creado', `${firstNames} ${lastNames} fue dado de alta.`);
        this.router.navigateByUrl('/admin/usuarios');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'duplicate-email') {
          this.errorMessage.set('Ya existe una cuenta con ese email.');
        } else if (error instanceof ApiError && error.slug === 'validation') {
          this.errorMessage.set('Revisá los datos ingresados.');
        } else if (error instanceof ApiError) {
          this.errorMessage.set(error.problem.detail);
        } else {
          this.errorMessage.set('No pudimos crear el usuario. Probá de nuevo.');
        }
      },
    });
  }
}
