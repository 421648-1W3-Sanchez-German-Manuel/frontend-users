import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { FuButton } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { GitLinkService } from '../../../core/services/git-link.service';
import { MeResponse } from '../../../core/models/auth.model';
import { ApiError } from '../../../core/models/problem-details.model';

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

const UNLINK_COPY: Record<string, string> = {
  'provider-not-linked': 'No hay una cuenta de GitHub para desvincular.',
  'provider-not-supported': 'GitHub no está disponible ahora.',
  'provider-unavailable': 'GitHub no respondió. Probá de nuevo en unos minutos.',
};

/** Profile: unlink / re-link the GitHub account (DEC-GL-15, §9.3). */
@Component({
  selector: 'fu-my-profile',
  standalone: true,
  imports: [RouterLink, Spinner, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-profile.html',
})
export class MyProfile {
  private readonly authService = inject(AuthService);
  private readonly gitLinks = inject(GitLinkService);

  protected readonly me = signal<MeResponse | null | undefined>(undefined);
  protected readonly linkedAt = signal<string | null>(null);
  /** Inline confirmation, not a flow: unlink asks for no password (§9.3). */
  protected readonly confirmingUnlink = signal(false);
  protected readonly busy = signal(false);
  protected readonly gitError = signal<string | null>(null);

  protected readonly details = computed(() => {
    const me = this.me();
    if (!me) return [];
    const rows: { label: string; value: string }[] = [];
    if (me.legajo) rows.push({ label: 'Legajo', value: me.legajo });
    if (me.role === 'STUDENT' && !me.legajo) rows.push({ label: 'Legajo', value: '—' });
    if (me.createdAt) rows.push({ label: 'Miembro desde', value: new Date(me.createdAt).toLocaleDateString('es-AR') });
    if (me.termsVersion) rows.push({ label: 'Términos aceptados', value: `Versión ${me.termsVersion}` });
    return rows;
  });

  constructor() {
    this.reload();
  }

  protected readonly roleLabel = (r: string) => ROLE_LABEL[r] ?? r;
  protected readonly statusLabel = (s: string) => STATUS_LABEL[s] ?? s;
  protected readonly statusIsActive = (s: string) => s === 'ACTIVE';

  private reload(): void {
    this.authService.me().pipe(catchError(() => of(null))).subscribe((me) => this.me.set(me));
    this.gitLinks.list().pipe(catchError(() => of([]))).subscribe((links) => {
      const github = links.find((l) => l.provider === 'GITHUB');
      this.linkedAt.set(github?.linkedAt ? new Date(github.linkedAt).toLocaleDateString('es-AR') : null);
    });
  }

  /** Same start as onboarding; the callback sends back to /perfil (§9.4). */
  linkGithub(): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.gitError.set(null);
    this.gitLinks.start('GITHUB').subscribe({
      next: (res) => {
        this.gitLinks.rememberReturn('profile');
        window.location.assign(res.authorizationUrl);
      },
      error: (error: unknown) => {
        this.busy.set(false);
        this.gitError.set(error instanceof ApiError && error.slug && UNLINK_COPY[error.slug]
          ? UNLINK_COPY[error.slug]
          : 'No pudimos iniciar la vinculación. Probá de nuevo.');
      },
    });
  }

  unlinkGithub(): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.gitError.set(null);
    this.gitLinks.unlink('GITHUB').subscribe({
      next: () => {
        this.busy.set(false);
        this.confirmingUnlink.set(false);
        this.reload();
      },
      error: (error: unknown) => {
        this.busy.set(false);
        this.confirmingUnlink.set(false);
        this.gitError.set(error instanceof ApiError && error.slug && UNLINK_COPY[error.slug]
          ? UNLINK_COPY[error.slug]
          : 'No pudimos desvincular la cuenta. Probá de nuevo.');
      },
    });
  }
}
