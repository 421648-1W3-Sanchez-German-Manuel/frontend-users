import { Injectable, signal } from '@angular/core';

export interface PendingChallenge {
  challengeId: string;
  email: string;
  /** Where to land after the 2FA step. Already validated by safeReturnUrl(). */
  returnUrl?: string | null;
}

/** In-memory bridge between the password step and the 2FA step of login. */
@Injectable({ providedIn: 'root' })
export class LoginFlowState {
  private readonly _pending = signal<PendingChallenge | null>(null);
  readonly pending = this._pending.asReadonly();

  set(challenge: PendingChallenge): void {
    this._pending.set(challenge);
  }

  clear(): void {
    this._pending.set(null);
  }
}
