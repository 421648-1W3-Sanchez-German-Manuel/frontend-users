import { Injectable, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type ThemeStyle = 'arcade' | 'pro';

const STORAGE_KEY_MODE = 'fu.theme.mode';
const STORAGE_KEY_STYLE = 'fu.theme.style';
const LEGACY_STORAGE_KEY = 'fu.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(this.readInitialMode());
  private readonly _style = signal<ThemeStyle>(this.readInitialStyle());

  readonly mode = this._mode.asReadonly();
  readonly style = this._style.asReadonly();

  constructor() {
    effect(() => {
      const mode = this._mode();
      const style = this._style();
      document.documentElement.setAttribute('data-theme', mode);
      document.documentElement.setAttribute('data-style', style);
      // Incognito / blocked-cookies browsers expose localStorage but throw
      // on access — there's no SSR here, so that's the only case worth
      // guarding against.
      try {
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        localStorage.setItem(STORAGE_KEY_STYLE, style);
        localStorage.setItem(LEGACY_STORAGE_KEY, mode);
      } catch {
        // Best-effort persistence; the in-memory signal still drives the UI.
      }
    });
  }

  private readInitialMode(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MODE) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // fall through to the media-query default
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private readInitialStyle(): ThemeStyle {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STYLE);
      return stored === 'arcade' || stored === 'pro' ? stored : 'arcade';
    } catch {
      return 'arcade';
    }
  }

  toggleMode(): void {
    this._mode.set(this._mode() === 'dark' ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode): void {
    this._mode.set(mode);
  }

  toggleStyle(): void {
    this._style.set(this._style() === 'arcade' ? 'pro' : 'arcade');
  }

  setStyle(style: ThemeStyle): void {
    this._style.set(style);
  }
}
