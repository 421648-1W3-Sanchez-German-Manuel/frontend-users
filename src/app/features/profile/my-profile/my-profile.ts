import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { AuthService } from '../../../core/services/auth.service';

const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Estudiante',
  PROFESSOR: 'Profesor',
  GESTOR: 'Gestor',
  ADMIN: 'Administrador',
};

const STATUS_LABEL: Record<string, string> = {
  PENDING_EMAIL: 'Email pendiente de verificación',
  PENDING_COURSE: 'Padrón pendiente de validación',
  ACTIVE: 'Cuenta activa',
  DEACTIVATED: 'Cuenta desactivada',
};

@Component({
  selector: 'fu-my-profile',
  standalone: true,
  imports: [RouterLink, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-profile.html',
})
export class MyProfile {
  private readonly authService = inject(AuthService);
  protected readonly me = toSignal(this.authService.me().pipe(catchError(() => of(null))), { initialValue: undefined });

  protected readonly details = computed(() => {
    const me = this.me();
    if (!me) return [];
    const rows: { label: string; value: string }[] = [];
    if (me.legajo) rows.push({ label: 'Legajo', value: me.legajo });
    if (me.role === 'STUDENT' && !me.legajo) rows.push({ label: 'Legajo', value: '—' });
    rows.push({ label: 'GitHub', value: me.githubUsername || '—' });
    if (me.createdAt) rows.push({ label: 'Miembro desde', value: new Date(me.createdAt).toLocaleDateString('es-AR') });
    if (me.termsVersion) rows.push({ label: 'Términos aceptados', value: `Versión ${me.termsVersion}` });
    return rows;
  });

  protected readonly roleLabel = (r: string) => ROLE_LABEL[r] ?? r;
  protected readonly statusLabel = (s: string) => STATUS_LABEL[s] ?? s;
  protected readonly statusIsActive = (s: string) => s === 'ACTIVE';
}