import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Spinner } from '../../shared/ui/spinner/spinner';
import { AuthService } from '../../core/services/auth.service';
import { TokenStoreService } from '../../core/services/token-store.service';

interface QuickAction {
  icon: string;
  title: string;
  body: string;
  link: string;
  adminOnly?: boolean;
  professorOnly?: boolean;
}

const ACTIONS: QuickAction[] = [
  { icon: '👤', title: 'Mi perfil', body: 'Ver y compartir tu perfil público.', link: '/perfil' },
  { icon: '🔑', title: 'Cambiar contraseña', body: 'Actualizá tu contraseña de acceso.', link: '/cambiar-password' },
  { icon: '✉️', title: 'Solicitar whitelist', body: 'Pedí que se habilite un email docente.', link: '/whitelist/solicitar', professorOnly: true },
  { icon: '🧑‍🤝‍🧑', title: 'Usuarios', body: 'Administrá cuentas de la plataforma.', link: '/admin/usuarios', adminOnly: true },
  { icon: '📋', title: 'Solicitudes whitelist', body: 'Revisá y aprobá pedidos pendientes.', link: '/admin/whitelist', adminOnly: true },
];

const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Estudiante',
  PROFESSOR: 'Profesor',
  ADMIN: 'Administrador',
};

@Component({
  selector: 'fu-home',
  standalone: true,
  imports: [RouterLink, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly tokenStore = inject(TokenStoreService);

  protected readonly me = toSignal(this.authService.me().pipe(catchError(() => of(null))), { initialValue: undefined });
  protected readonly isAdmin = computed(() => this.tokenStore.isAdmin());
  protected readonly isProfessor = computed(() => this.tokenStore.roles().includes('PROFESSOR'));
  protected readonly actions = computed(() =>
    ACTIONS.filter((a) => !a.adminOnly || this.isAdmin()).filter((a) => !a.professorOnly || this.isProfessor())
  );
  protected readonly roleLabels = computed(() => this.tokenStore.roles().map((r) => ROLE_LABEL[r] ?? r));
}
