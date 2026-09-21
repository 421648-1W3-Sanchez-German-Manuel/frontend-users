import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { GenericCard, GenericSpinner } from '@2026-p4-fe/ui';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'fu-public-profile',
  standalone: true,
  imports: [GenericSpinner, GenericCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public-profile.html',
})
export class PublicProfile {
  private readonly profileService = inject(ProfileService);
  readonly id = input.required<string>();

  protected readonly profile = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.profileService.getPublicProfile(id).pipe(catchError(() => of(null))))
    ),
    { initialValue: undefined }
  );
}
