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
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', mode);
        document.documentElement.setAttribute('data-style', style);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        localStorage.setItem(STORAGE_KEY_STYLE, style);
        localStorage.setItem(LEGACY_STORAGE_KEY, mode);
      }
    });
  }

  private readInitialMode(): ThemeMode {
    if (typeof localStorage === 'undefined') return 'dark';
    const stored = localStorage.getItem(STORAGE_KEY_MODE) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private readInitialStyle(): ThemeStyle {
    if (typeof localStorage === 'undefined') return 'arcade';
    const stored = localStorage.getItem(STORAGE_KEY_STYLE);
    return stored === 'arcade' || stored === 'pro' ? stored : 'arcade';
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

  /** Backward-compatible alias for setMode */
  set(mode: ThemeMode): void {
    this.setMode(mode);
  }

  /** Backward-compatible alias for toggleMode */
  toggle(): void {
    this.toggleMode();
  }
}
