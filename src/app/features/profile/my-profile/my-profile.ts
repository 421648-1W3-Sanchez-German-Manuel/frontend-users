import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { AuthService } from '../../../core/services/auth.service';

const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Estudiante',
  PROFESSOR: 'Profesor',
  ADMIN: 'Administrador',
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
  protected readonly roleLabel = (r: string) => ROLE_LABEL[r] ?? r;
}
