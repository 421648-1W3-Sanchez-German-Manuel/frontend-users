import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Spinner } from '../../shared/ui/spinner/spinner';
import { AuthService } from '../../core/services/auth.service';
import { Capability, PermissionsService } from '../../core/services/permissions.service';
import { TokenStoreService } from '../../core/services/token-store.service';

interface QuickAction {
  icon: string;
  title: string;
  body: string;
  link: string;
  /** Absent means everyone with a session sees it. */
  capability?: Capability;
}

const ACTIONS: QuickAction[] = [
  { icon: '👤', title: 'Mi perfil', body: 'Ver y compartir tu perfil público.', link: '/perfil' },
  { icon: '🔑', title: 'Cambiar contraseña', body: 'Actualizá tu contraseña de acceso.', link: '/cambiar-password' },
  { icon: '✉️', title: 'Solicitar whitelist', body: 'Pedí que se habilite un email docente.', link: '/whitelist/solicitar', capability: 'requestWhitelist' },
  { icon: '🧑‍🤝‍🧑', title: 'Usuarios', body: 'Administrá cuentas de la plataforma.', link: '/admin/usuarios', capability: 'manageUsers' },
  { icon: '📋', title: 'Whitelist', body: 'Gestioná emails habilitados y pedidos pendientes.', link: '/admin/whitelist', capability: 'manageWhitelist' },
];

const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Estudiante',
  PROFESSOR: 'Profesor',
  GESTOR: 'Gestor',
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
  private readonly permissions = inject(PermissionsService);

  protected readonly me = toSignal(this.authService.me().pipe(catchError(() => of(null))), { initialValue: undefined });
  protected readonly actions = computed(() =>
    ACTIONS.filter((a) => !a.capability || this.permissions.can(a.capability))
  );
  protected readonly roleLabels = computed(() => this.tokenStore.roles().map((r) => ROLE_LABEL[r] ?? r));
}
