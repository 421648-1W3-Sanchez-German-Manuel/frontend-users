import { ChangeDetectionStrategy, Component, OnDestroy, Signal, computed, signal } from '@angular/core';
import { TokenStoreService } from '../../../core/services/token-store.service';

/** A mail already chewed up by the mailbox: it either carries a code, or a link. */
interface MailDev {
  id: string;
  to: string | null;
  subject: string | null;
  type: string | null;
  date: string;
  code: string | null;
  link: string | null;
}

/**
 * A call the Gateway routed to a micro. Written by api-gateway's
 * InterMicroTraceFilter into Redis; arrives here via /dev/logs.
 */
interface Trace {
  ts: string;
  requestId: string;
  traceId: string;
  origin: 'PERSON' | 'MS' | 'ANON';
  actor?: string;
  destination: string;
  method: string;
  path: string;
  status: number;
  ms: number;
}

const ENDPOINT = '/dev/mailbox';
const ENDPOINT_LOGS = '/dev/logs';
const REFRESH_MS = 5000;

/**
 * Floating development mailbox.
 *
 * There is no mail server in the stack: 2FA codes and activation/reset links
 * sit in the `outbox_events` table. Without this, following any flow by hand
 * requires a `docker compose exec mysql` with a SELECT and a grep, which is
 * exactly the friction that keeps anyone from testing the flows.
 *
 * Besides the mails it also has the Logs tab: the micro-to-micro trace the
 * Gateway leaves in Redis, with a button that fires the echo-service
 * round-trip (echo -> gateway -> users) to watch it appear live.
 *
 * ⛔ It is a DEVELOPMENT tool and shows codes for any account.
 *
 * That's why it doesn't just render unconditionally: it asks `/dev/mailbox`
 * and if it doesn't answer — which is what happens in any deployment without
 * the `dev-mailbox` container — the button never shows up. Detection by
 * capability, not a build flag: a flag has to be remembered and turned off.
 */
@Component({
  selector: 'fu-dev-mailbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (available()) {
      <div class="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2">
        @if (open()) {
          <section
            class="fu-card !p-0 w-[min(26rem,calc(100vw-2rem))] max-h-[min(36rem,78vh)] flex flex-col overflow-hidden"
            style="animation: fu-pop-in 0.15s ease-out"
            aria-label="Buzon de desarrollo"
          >
            <header
              class="flex items-center gap-2 px-3 py-2 shrink-0"
              style="border-bottom: 1px solid var(--color-border)"
            >
              <span class="text-sm">📬</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm" style="color: var(--color-text)">Buzón de desarrollo</p>
                <p class="text-xs" style="color: var(--color-text-faint)">
                  No hay servidor de mail: esto sale del outbox
                </p>
              </div>
              <button
                type="button"
                class="text-xs opacity-60 hover:opacity-100 transition-opacity"
                (click)="refresh()"
                aria-label="Actualizar"
                title="Actualizar"
              >
                ⟳
              </button>
              <button
                type="button"
                class="text-xs opacity-60 hover:opacity-100 transition-opacity"
                (click)="open.set(false)"
                aria-label="Cerrar buzón"
              >
                ✕
              </button>
            </header>

            <nav
              class="flex shrink-0"
              style="border-bottom: 1px solid var(--color-border)"
              aria-label="Secciones del buzón"
            >
              <button
                type="button"
                class="flex-1 px-3 py-1.5 text-xs transition-colors"
                [style.color]="tab() === 'mails' ? 'var(--color-cyan)' : 'var(--color-text-muted)'"
                [style.border-bottom]="tab() === 'mails' ? '2px solid var(--color-cyan)' : '2px solid transparent'"
                (click)="changeTab('mails')"
              >
                Mails
              </button>
              <button
                type="button"
                class="flex-1 px-3 py-1.5 text-xs transition-colors"
                [style.color]="tab() === 'logs' ? 'var(--color-cyan)' : 'var(--color-text-muted)'"
                [style.border-bottom]="tab() === 'logs' ? '2px solid var(--color-cyan)' : '2px solid transparent'"
                (click)="changeTab('logs')"
              >
                Logs
                @if (tab() === 'logs' && logs().length) {
                  <span class="fu-badge fu-badge--primary ml-1">{{ logs().length }}</span>
                }
              </button>
            </nav>

            @if (tab() === 'mails') {
              @if (pending().length) {
                <div class="px-3 py-2 shrink-0" style="border-bottom: 1px solid var(--color-border)">
                  <p class="text-xs mb-1.5" style="color: var(--color-text-muted)">
                    Esperando el padrón de Cursos
                  </p>
                  @for (p of pending(); track p.id) {
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ p.email }}</span>
                      <button
                        type="button"
                        class="fu-btn fu-btn--sm fu-btn--secondary shrink-0"
                        [disabled]="resolving() === p.email"
                        (click)="resolvePadron(p.email)"
                      >
                        {{ resolving() === p.email ? '...' : 'resolver padrón' }}
                      </button>
                    </div>
                  }
                  @if (padronNotice()) {
                    <p class="text-xs mt-1" [style.color]="padronNoticeOk() ? 'var(--color-success)' : 'var(--color-danger)'">
                      {{ padronNotice() }}
                    </p>
                  }
                </div>
              }

              <div class="px-3 py-2 shrink-0" style="border-bottom: 1px solid var(--color-border)">
                <input
                  class="fu-input !py-1 text-xs"
                  type="search"
                  placeholder="Filtrar por email"
                  [value]="filter()"
                  (input)="onFilter($event)"
                  aria-label="Filtrar por email"
                />
              </div>

              <div class="overflow-y-auto flex-1">
                @if (error()) {
                  <p class="p-4 text-xs" style="color: var(--color-danger)">{{ error() }}</p>
                } @else if (visible().length === 0) {
                  <p class="p-4 text-xs" style="color: var(--color-text-muted)">
                    Nada todavía. Registrate o pedí un código y aparece acá.
                  </p>
                } @else {
                  <ul>
                    @for (mail of visible(); track mail.id) {
                      <li class="px-3 py-2" style="border-bottom: 1px solid var(--color-border)">
                        <div class="flex items-baseline gap-2">
                          <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ mail.to }}</span>
                          <span class="text-xs shrink-0" style="color: var(--color-text-faint)">{{ time(mail.date) }}</span>
                        </div>
                        <p class="text-xs mt-0.5" style="color: var(--color-text-faint)">{{ typeLabel(mail.type) }}</p>

                        @if (mail.code) {
                          <div class="mt-1.5 flex items-center gap-2">
                            <code class="text-base tracking-[0.3em]" style="color: var(--color-cyan)">{{ mail.code }}</code>
                            <button type="button" class="fu-btn fu-btn--sm fu-btn--ghost" (click)="copy(mail.code!, mail.id)">
                              {{ copied() === mail.id ? '✓ copiado' : 'copiar' }}
                            </button>
                          </div>
                        }

                        @if (mail.link) {
                          <div class="mt-1.5 flex items-center gap-2">
                            <a
                              class="text-xs truncate flex-1 underline"
                              style="color: var(--color-cyan)"
                              [href]="mail.link"
                            >{{ mail.link }}</a>
                            <button type="button" class="fu-btn fu-btn--sm fu-btn--ghost" (click)="copy(mail.link!, mail.id)">
                              {{ copied() === mail.id ? '✓' : 'copiar' }}
                            </button>
                          </div>
                        }
                      </li>
                    }
                  </ul>
                }
              </div>
            } @else {
              <div class="px-3 py-2 shrink-0" style="border-bottom: 1px solid var(--color-border)">
                <p class="text-xs mb-1.5" style="color: var(--color-text-muted)">
                  Comunicación entre micros · lo que el Gateway enrutó
                </p>
                <button
                  type="button"
                  class="fu-btn fu-btn--sm fu-btn--secondary w-full"
                  [disabled]="!authenticated() || triggering()"
                  (click)="testFlow()"
                  title="echo-service pide un token de servicio y llama a users-service a través del Gateway"
                >
                  {{ triggering() ? 'disparando…' : 'probar flujo micro → micro' }}
                </button>
                @if (!authenticated()) {
                  <p class="text-xs mt-1" style="color: var(--color-text-faint)">
                    Logueate para que echo llame a users con tu usuario.
                  </p>
                }
                @if (flowNotice()) {
                  <p class="text-xs mt-1" [style.color]="flowNoticeOk() ? 'var(--color-success)' : 'var(--color-danger)'">
                    {{ flowNotice() }}
                  </p>
                }
              </div>

              <div class="overflow-y-auto flex-1">
                @if (errorLogs()) {
                  <p class="p-4 text-xs" style="color: var(--color-danger)">{{ errorLogs() }}</p>
                } @else if (logs().length === 0) {
                  <p class="p-4 text-xs" style="color: var(--color-text-muted)">
                    Todavía no hay llamadas. Dispará el flujo de arriba o navegá la app.
                  </p>
                } @else {
                  <ul>
                    @for (log of logs(); track log.requestId) {
                      <li class="px-3 py-2" style="border-bottom: 1px solid var(--color-border)">
                        <div class="flex items-baseline gap-2">
                          <span class="fu-badge text-[10px] shrink-0" [style.background-color]="colorOrigin(log.origin)">
                            {{ log.origin }}
                          </span>
                          <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ log.destination }}</span>
                          <span class="text-xs shrink-0" style="color: var(--color-text-faint)">{{ time(log.ts) }}</span>
                        </div>
                        <p class="text-xs mt-0.5 truncate" style="color: var(--color-text-faint)">
                          {{ log.method }} {{ log.path }}
                        </p>
                        <p class="text-xs mt-0.5 flex items-center gap-2">
                          <span [style.color]="colorStatus(log.status)">{{ log.status }}</span>
                          <span style="color: var(--color-text-faint)">{{ log.ms }} ms</span>
                          @if (log.actor) {
                            <span class="truncate" style="color: var(--color-text-faint)">actor: {{ log.actor }}</span>
                          }
                        </p>
                      </li>
                    }
                  </ul>
                }
              </div>
            }
          </section>
        }

        <button
          type="button"
          class="fu-btn fu-btn--sm fu-btn--secondary shadow-[var(--shadow-lg)]"
          (click)="open.set(!open())"
          [attr.aria-expanded]="open()"
          aria-label="Buzón de desarrollo"
        >
          📬 Buzón
          @if (!open() && mails().length) {
            <span class="fu-badge fu-badge--primary ml-1">{{ mails().length }}</span>
          }
        </button>
      </div>
    }
  `,
})
export class DevMailbox implements OnDestroy {
  protected readonly available = signal(false);
  protected readonly open = signal(false);
  protected readonly tab = signal<'mails' | 'logs'>('mails');
  protected readonly mails = signal<MailDev[]>([]);
  protected readonly logs = signal<Trace[]>([]);
  protected readonly filter = signal('');
  protected readonly error = signal<string | null>(null);
  protected readonly errorLogs = signal<string | null>(null);
  protected readonly copied = signal<string | null>(null);
  protected readonly pending = signal<{ id: string; email: string }[]>([]);
  protected readonly resolving = signal<string | null>(null);
  protected readonly padronNotice = signal<string | null>(null);
  protected readonly padronNoticeOk = signal(false);
  protected readonly triggering = signal(false);
  protected readonly flowNotice = signal<string | null>(null);
  protected readonly flowNoticeOk = signal(false);

  protected readonly authenticated: Signal<boolean>;

  protected readonly visible = computed(() => {
    const f = this.filter().trim().toLowerCase();
    return f ? this.mails().filter((m) => m.to?.toLowerCase().includes(f)) : this.mails();
  });

  private timer?: ReturnType<typeof setInterval>;

  constructor(private readonly tokenStore: TokenStoreService) {
    this.authenticated = tokenStore.isAuthenticated;
    // A single call on startup decides whether the mailbox exists in this
    // environment. If it fails, the component never retries and leaves no trace in the UI.
    void this.load(true);
  }

  ngOnDestroy(): void {
    this.stop();
  }

  protected refresh(): void {
    void this.load(false);
  }

  protected changeTab(t: 'mails' | 'logs'): void {
    this.tab.set(t);
    if (t === 'logs') void this.loadLogs();
  }

  protected onFilter(event: Event): void {
    this.filter.set((event.target as HTMLInputElement).value);
  }

  protected async copy(text: string, id: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(id);
      setTimeout(() => this.copied.set(null), 1200);
    } catch {
      // No clipboard permission (happens outside https): the text is still
      // visible on screen and can be selected by hand. Not worth an error in the UI.
    }
  }

  /**
   * Fires the echo-service micro-to-micro round-trip: the person hits
   * /api/echo/cliente/perfil/{id}, and echo requests its service token and calls
   * users-service through the Gateway. The result is THREE entries in the trace
   * (person→echo, echo→users/token, echo→users/perfil) that the Gateway is
   * already recording in Redis.
   */
  protected async testFlow(): Promise<void> {
    const id = this.tokenStore.userId();
    if (!id) return;

    this.triggering.set(true);
    this.flowNotice.set(null);
    try {
      // No manual Authorization header: fu_at is HttpOnly, the browser sends
      // it on its own on this same-origin fetch. The Gateway already accepts it (converter).
      const res = await fetch(`/api/echo/cliente/perfil/${id}`);
      const body = await res.json();
      this.flowNoticeOk.set(res.ok);
      this.flowNotice.set(
        res.ok
          ? 'Echo pidió su token y llamó a users por el Gateway. Mirá las tres entradas en los logs.'
          : (body?.detail ?? body?.error ?? `Falló con status ${res.status}.`)
      );
    } catch {
      this.flowNoticeOk.set(false);
      this.flowNotice.set('El flujo no respondió.');
    } finally {
      // The trace write to Redis is fire-and-forget in the Gateway: it can land
      // right after the response. Wait for the round-trip to show up in the
      // list instead of promising "it refreshes itself".
      await this.waitForTrace(id);
      this.triggering.set(false);
    }
  }

  /**
   * After testFlow, the newest entry (index 0) has to be the person's call to
   * echo-service. Retries until it shows up.
   */
  private async waitForTrace(id: string): Promise<void> {
    for (let attempt = 0; attempt < 7; attempt++) {
      await new Promise((r) => setTimeout(r, 250));
      await this.loadLogs();
      const first = this.logs()[0];
      if (first?.destination === 'echo-service' && first.path === `/api/echo/cliente/perfil/${id}`) return;
      if (this.errorLogs()) return;
    }
  }

  /** Badge color: cyan for person, green for service, gray for anonymous/undefined. */
  protected colorOrigin(origin: Trace['origin']): string {
    return { PERSON: 'rgba(34,211,238,0.18)', MS: 'rgba(74,222,128,0.18)', ANON: 'rgba(148,163,184,0.18)' }[origin] ?? 'rgba(148,163,184,0.18)';
  }

  protected colorStatus(status: number): string {
    if (status >= 400) return 'var(--color-danger)';
    if (status >= 300) return 'var(--color-warning)';
    return 'var(--color-success)';
  }

  /**
   * Impersonates Cursos and publishes the padron-resolved event.
   *
   * A student who activates their email lands in PENDING_COURSE waiting for
   * Cursos to validate their padron, and that validation arrives over Kafka:
   * there is no HTTP endpoint that fires it. Since the Cursos team doesn't
   * exist yet, without this the account waits forever and nothing downstream
   * can be tested.
   */
  protected async resolvePadron(email: string): Promise<void> {
    this.resolving.set(email);
    this.padronNotice.set(null);
    try {
      const res = await fetch('/dev/resolver-padron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      this.padronNoticeOk.set(res.ok);
      this.padronNotice.set(
        res.ok
          ? `${email} quedó ${body.a}. Volvé a loguearte: el token viejo sigue diciendo PENDING_COURSE.`
          : (body.error ?? 'No se pudo resolver.')
      );
      await this.load(false);
    } catch {
      this.padronNoticeOk.set(false);
      this.padronNotice.set('El buzón no responde.');
    } finally {
      this.resolving.set(null);
    }
  }

  protected time(date: string): string {
    const d = new Date(date);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString('es-AR', { hour12: false });
  }

  /** The backend's eventType values, turned into something readable at a glance. */
  protected typeLabel(type: string | null): string {
    return (
      {
        EMAIL_2FA: 'Código de acceso',
        EMAIL_ACTIVACION_CUENTA: 'Activación de cuenta',
        EMAIL_RESET_PASSWORD: 'Recuperar contraseña',
        WHITELISTING_RESOLVED: 'Padrón resuelto',
      }[type ?? ''] ?? (type ?? 'Mail')
    );
  }

  private async load(first: boolean): Promise<void> {
    try {
      const res = await fetch(`${ENDPOINT}?limit=20`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));

      this.mails.set(await res.json());
      this.error.set(null);

      // Pending accounts ride along on the same refresh: if the mailbox works,
      // this works. A failure here can't take down the mail list, which is what
      // someone actually came to see.
      try {
        const p = await fetch('/dev/pendientes', { headers: { Accept: 'application/json' } });
        if (p.ok) this.pending.set(await p.json());
      } catch {
        /* a mailbox without /dev/pendientes still works for viewing mails */
      }

      if (first) {
        this.available.set(true);
        // Only now does it start polling in a loop: in an environment without
        // a mailbox there's no interval hammering a 404 forever.
        this.timer = setInterval(() => {
          if (this.open()) {
            void this.load(false);
            if (this.tab() === 'logs') void this.loadLogs();
          }
        }, REFRESH_MS);
      }
    } catch {
      if (first) {
        // No mailbox in this environment. Expected in any real deployment, so
        // nothing is logged or shown.
        this.available.set(false);
        return;
      }
      this.error.set('El buzón no responde. ¿Está levantado el contenedor dev-mailbox?');
    }
  }

  private async loadLogs(): Promise<void> {
    try {
      const res = await fetch(`${ENDPOINT_LOGS}?limit=50`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      const rows = (await res.json()) as Trace[];
      // The list comes NEWEST entry first (Redis LPUSH at the head, cap 200).
      // Shown in that order: what just happened on top, no need to scroll to the bottom.
      this.logs.set(rows);
      this.errorLogs.set(null);
    } catch {
      this.errorLogs.set('No se pudo leer la traza. ¿Está Redis arriba?');
    }
  }

  private stop(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
