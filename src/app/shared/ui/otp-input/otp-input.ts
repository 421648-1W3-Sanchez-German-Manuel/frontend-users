import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  output,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';

const LENGTH = 6;

@Component({
  selector: 'fu-otp-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #root class="flex gap-2 sm:gap-3 justify-center" role="group" aria-label="Código de verificación de 6 dígitos">
      @for (i of indices; track i) {
        <input
          #digit
          class="fu-otp-digit"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [attr.aria-label]="'Dígito ' + (i + 1)"
          [value]="chars()[i]"
          [attr.data-invalid]="invalid() ? 'true' : null"
          (input)="onInput(i, $event)"
          (keydown)="onKeydown(i, $event)"
          (paste)="onPaste($event)"
        />
      }
    </div>
  `,
})
export class OtpInput {
  readonly value = model('');
  readonly invalid = input(false);
  readonly complete = output<string>();

  protected readonly indices = Array.from({ length: LENGTH }, (_, i) => i);
  /**
   * An empty box is worth '' and NOT a filler character.
   *
   * This used to be a padEnd with a raw NUL byte written into the source (the
   * file came back "binary file" in git). Every empty box started out with
   * that NUL and, since the input is maxlength="1", it was already FULL: the
   * browser rejected the first digit the person typed and the 2FA code
   * couldn't be entered. It looks like an unresponsive empty box, because the
   * NUL doesn't render. Pasting the code did work, which is what made it hard
   * to reproduce.
   */
  protected readonly chars = computed(() =>
    Array.from({ length: LENGTH }, (_, i) => this.value()[i] ?? ''),
  );

  private readonly digits = viewChildren<ElementRef<HTMLInputElement>>('digit');

  constructor() {
    effect(() => {
      if (this.invalid()) {
        const els = this.digits().map((d) => d.nativeElement);
        gsap.fromTo(els, { x: 0 }, { x: 8, duration: 0.06, repeat: 5, yoyo: true, ease: 'power1.inOut', clearProps: 'x' });
      }
    });
  }

  protected onInput(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const raw = target.value.replace(/[^0-9]/g, '');
    const digit = raw.slice(-1);
    const chars = this.value().padEnd(LENGTH, ' ').split('');
    chars[index] = digit || ' ';
    const next = chars.join('').replace(/ +$/, '').replace(/ /g, '');
    this.value.set(next);
    target.value = digit;

    if (digit && index < LENGTH - 1) {
      this.digits()[index + 1]?.nativeElement.focus();
    }
    if (next.length === LENGTH) {
      this.complete.emit(next);
    }
  }

  protected onKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value && index > 0) {
      this.digits()[index - 1]?.nativeElement.focus();
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      this.digits()[index - 1]?.nativeElement.focus();
    }
    if (event.key === 'ArrowRight' && index < LENGTH - 1) {
      this.digits()[index + 1]?.nativeElement.focus();
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/[^0-9]/g, '').slice(0, LENGTH);
    if (!digits) return;
    event.preventDefault();
    this.value.set(digits);
    const lastIndex = Math.min(digits.length, LENGTH) - 1;
    queueMicrotask(() => this.digits()[Math.max(lastIndex, 0)]?.nativeElement.focus());
    if (digits.length === LENGTH) {
      this.complete.emit(digits);
    }
  }
}
