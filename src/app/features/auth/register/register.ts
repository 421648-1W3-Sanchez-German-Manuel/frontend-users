import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthShell } from '../../../shared/ui/auth-shell/auth-shell';
import { FuButton } from '../../../shared/ui/button/button';
import { PasswordStrength } from '../../../shared/ui/password-strength/password-strength';
import { AuthService } from '../../../core/services/auth.service';
import { ApiError } from '../../../core/models/problem-details.model';

type Tab = 'student' | 'professor';

/** Mirrors PasswordPolicy.MIN_CHARACTERS in users-service — keep both in sync. */
const PASSWORD_VALIDATORS = [
  Validators.required,
  Validators.minLength(12),
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
];

@Component({
  selector: 'fu-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell, FuButton, PasswordStrength],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly tab = signal<Tab>('student');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showTerms = signal(false);

  protected readonly terms = toSignal(this.authService.terms().pipe(catchError(() => of(null))), {
    initialValue: null,
  });

  protected readonly studentForm = this.fb.nonNullable.group({
    firstNames: ['', Validators.required],
    lastNames: ['', Validators.required],
    legajo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    invitationCode: ['', Validators.required],
    password: ['', PASSWORD_VALIDATORS],
    acceptTerms: [false, Validators.requiredTrue],
  });

  protected readonly professorForm = this.fb.nonNullable.group({
    firstNames: ['', Validators.required],
    lastNames: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', PASSWORD_VALIDATORS],
    acceptTerms: [false, Validators.requiredTrue],
  });

  setTab(tab: Tab): void {
    this.tab.set(tab);
    this.errorMessage.set(null);
  }

  submit(): void {
    const termsVersion = this.terms()?.version;
    if (!termsVersion) {
      this.errorMessage.set('No pudimos cargar los términos y condiciones vigentes. Recargá la página.');
      return;
    }

    const form = this.tab() === 'student' ? this.studentForm : this.professorForm;
    if (form.invalid || this.loading()) {
      form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.loading.set(true);

    const request$ =
      this.tab() === 'student'
        ? (() => {
            const { acceptTerms: _accept, ...body } = this.studentForm.getRawValue();
            return this.authService.registerStudent({ ...body, termsVersion });
          })()
        : (() => {
            const { acceptTerms: _accept, ...body } = this.professorForm.getRawValue();
            return this.authService.registerProfessor({ ...body, termsVersion });
          })();

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/registro/confirmacion'], {
          state: { email: form.controls.email.value },
        });
      },
      error: (error: unknown) => {
        this.loading.set(false);
        if (error instanceof ApiError) {
          if (error.slug === 'duplicate-email') {
            this.errorMessage.set('Ya existe una cuenta registrada con ese email.');
          } else if (error.slug === 'email-not-whitelisted') {
            this.errorMessage.set('Tu email no está en la lista de docentes habilitados. Contactá a un administrador.');
          } else if (error.slug === 'validation') {
            this.errorMessage.set('Revisá los datos ingresados: alguno no cumple el formato esperado.');
          } else {
            this.errorMessage.set(error.problem.detail);
          }
        } else {
          this.errorMessage.set('No pudimos completar el registro. Probá de nuevo.');
        }
      },
    });
  }
}
