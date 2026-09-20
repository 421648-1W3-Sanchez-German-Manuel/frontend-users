import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../core/models/auth.model';
import { AdminService } from '../../../core/services/admin.service';
import { PermissionsService } from '../../../core/services/permissions.service';
import { ToastService } from '../../../core/services/toast.service';
import { ApiError } from '../../../core/models/problem-details.model';
import { FuButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'fu-user-role',
  standalone: true,
  imports: [RouterLink, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-role.html',
})
export class UserRole {
  private readonly adminService = inject(AdminService);
  private readonly permissions = inject(PermissionsService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  protected readonly allRoles = computed(() => this.permissions.assignableRoles());
  protected readonly selectedRoles = signal<Role[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  toggleRole(role: Role): void {
    this.selectedRoles.update((roles) =>
      roles.includes(role) ? roles.filter((r) => r !== role) : [...roles, role]
    );
  }

  submit(): void {
    if (this.selectedRoles().length === 0 || this.loading()) return;
    this.loading.set(true);
    this.errorMessage.set(null);

    this.adminService.changeRole(this.id(), { roles: this.selectedRoles() }).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success('Rol actualizado');
        this.router.navigateByUrl('/admin/usuarios');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError && error.slug === 'last-admin') {
          this.errorMessage.set('No se puede quitar el rol ADMIN al último administrador.');
        } else if (error instanceof ApiError && error.slug === 'invalid-transition') {
          this.errorMessage.set('Ese cambio de rol no está permitido.');
        } else if (error instanceof ApiError) {
          this.errorMessage.set(error.problem.detail);
        } else {
          this.errorMessage.set('No pudimos cambiar el rol. Probá de nuevo.');
        }
      },
    });
  }
}
