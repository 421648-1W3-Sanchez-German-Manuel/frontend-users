import { Injectable, signal } from '@angular/core';

export type ToastKind = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  detail?: string;
  timeoutMs: number;
}

let nextId = 1;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(kind: ToastKind, title: string, detail?: string, timeoutMs = 6000): void {
    const toast: Toast = { id: nextId++, kind, title, detail, timeoutMs };
    this._toasts.update((list) => [...list, toast]);
    if (timeoutMs > 0) {
      setTimeout(() => this.dismiss(toast.id), timeoutMs);
    }
  }

  info(title: string, detail?: string): void {
    this.show('info', title, detail);
  }

  success(title: string, detail?: string): void {
    this.show('success', title, detail);
  }

  warning(title: string, detail?: string): void {
    this.show('warning', title, detail);
  }

  error(title: string, detail?: string): void {
    this.show('error', title, detail, 8000);
  }

  dismiss(id: number): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
