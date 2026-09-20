import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { PermissionsService } from '../../../core/services/permissions.service';
import { Spinner } from '../../../shared/ui/spinner/spinner';

@Component({
  selector: 'fu-users-list',
  standalone: true,
  imports: [RouterLink, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.html',
})
export class UsersList {
  private readonly adminService = inject(AdminService);
  protected readonly perms = inject(PermissionsService);
  protected readonly search = signal('');
  protected readonly users = toSignal(this.adminService.listUsers().pipe(catchError(() => of(null))), {
    initialValue: undefined,
  });

  protected readonly filtered = computed(() => {
    const list = this.users();
    if (!list) return list;
    const q = this.search().trim().toLowerCase();
    if (!q) return list;
    return list.filter((u) =>
      `${u.firstNames} ${u.lastNames} ${u.email}`.toLowerCase().includes(q)
    );
  });
}
