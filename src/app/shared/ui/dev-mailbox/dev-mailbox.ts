import { ChangeDetectionStrategy, Component, OnDestroy, Signal, computed, signal } from '@angular/core';
import { TokenStoreService } from '../../../core/services/token-store.service';

/** Un mail ya masticado por el buzon: o trae codigo, o trae enlace. */
interface MailDev {
  id: string;
  para: string | null;
  asunto: string | null;
  tipo: string | null;
  fecha: string;
  codigo: string | null;
  enlace: string | null;
}

/**
 * Una llamada que el Gateway enruto a un micro. La escribe el filtro
 * InterMicroTraceFilter de api-gateway en Redis; aca llega via /dev/logs.
 */
interface Traza {
  ts: string;
  requestId: string;
  traceId: string;
  origen: 'PERSON' | 'MS' | 'ANON';
  actor?: string;
  destino: string;
  metodo: string;
  path: string;
  status: number;
  ms: number;
}

const ENDPOINT = '/dev/mailbox';
const ENDPOINT_LOGS = '/dev/logs';
const REFRESCO_MS = 5000;

/**
 * Buzon flotante de desarrollo.
 *
 * No hay servidor de mail en el stack: los codigos de 2FA y los enlaces de
 * activacion y de reset quedan en la tabla `outbox_events`. Sin esto, seguir
 * cualquier flujo a mano exige un `docker compose exec mysql` con un SELECT y
 * un grep, que es exactamente la friccion que hace que nadie pruebe los flujos.
 *
 * Ademas de los mails trae la pestana Logs: la traza micro-a-micro que deja el
 * Gateway en Redis, con un boton que dispara el round-trip de echo-service
 * (echo -> gateway -> users) para verla aparecer en vivo.
 *
 * ⛔ Es una herramienta de DESARROLLO y muestra codigos de cualquier cuenta.
 *
 * Por eso no se dibuja solo porque si: pregunta por `/dev/mailbox` y si no
 * contesta -que es lo que pasa en cualquier despliegue que no tenga el
 * contenedor `dev-mailbox`- el boton nunca aparece. Deteccion por capacidad y
 * no una bandera de build: una bandera hay que acordarse de apagarla.
 */
@Component({
  selector: 'fu-dev-mailbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (disponible()) {
      <div class="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2">
        @if (abierto()) {
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
                (click)="refrescar()"
                aria-label="Actualizar"
                title="Actualizar"
              >
                ⟳
              </button>
              <button
                type="button"
                class="text-xs opacity-60 hover:opacity-100 transition-opacity"
                (click)="abierto.set(false)"
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
                [style.color]="pestana() === 'mails' ? 'var(--color-cyan)' : 'var(--color-text-muted)'"
                [style.border-bottom]="pestana() === 'mails' ? '2px solid var(--color-cyan)' : '2px solid transparent'"
                (click)="cambiarPestana('mails')"
              >
                Mails
              </button>
              <button
                type="button"
                class="flex-1 px-3 py-1.5 text-xs transition-colors"
                [style.color]="pestana() === 'logs' ? 'var(--color-cyan)' : 'var(--color-text-muted)'"
                [style.border-bottom]="pestana() === 'logs' ? '2px solid var(--color-cyan)' : '2px solid transparent'"
                (click)="cambiarPestana('logs')"
              >
                Logs
                @if (pestana() === 'logs' && logs().length) {
                  <span class="fu-badge fu-badge--primary ml-1">{{ logs().length }}</span>
                }
              </button>
            </nav>

            @if (pestana() === 'mails') {
              @if (pendientes().length) {
                <div class="px-3 py-2 shrink-0" style="border-bottom: 1px solid var(--color-border)">
                  <p class="text-xs mb-1.5" style="color: var(--color-text-muted)">
                    Esperando el padrón de Cursos
                  </p>
                  @for (p of pendientes(); track p.id) {
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ p.email }}</span>
                      <button
                        type="button"
                        class="fu-btn fu-btn--sm fu-btn--secondary shrink-0"
                        [disabled]="resolviendo() === p.email"
                        (click)="resolverPadron(p.email)"
                      >
                        {{ resolviendo() === p.email ? '...' : 'resolver padrón' }}
                      </button>
                    </div>
                  }
                  @if (avisoPadron()) {
                    <p class="text-xs mt-1" [style.color]="avisoOk() ? 'var(--color-success)' : 'var(--color-danger)'">
                      {{ avisoPadron() }}
                    </p>
                  }
                </div>
              }

              <div class="px-3 py-2 shrink-0" style="border-bottom: 1px solid var(--color-border)">
                <input
                  class="fu-input !py-1 text-xs"
                  type="search"
                  placeholder="Filtrar por email"
                  [value]="filtro()"
                  (input)="alFiltrar($event)"
                  aria-label="Filtrar por email"
                />
              </div>

              <div class="overflow-y-auto flex-1">
                @if (error()) {
                  <p class="p-4 text-xs" style="color: var(--color-danger)">{{ error() }}</p>
                } @else if (visibles().length === 0) {
                  <p class="p-4 text-xs" style="color: var(--color-text-muted)">
                    Nada todavía. Registrate o pedí un código y aparece acá.
                  </p>
                } @else {
                  <ul>
                    @for (mail of visibles(); track mail.id) {
                      <li class="px-3 py-2" style="border-bottom: 1px solid var(--color-border)">
                        <div class="flex items-baseline gap-2">
                          <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ mail.para }}</span>
                          <span class="text-xs shrink-0" style="color: var(--color-text-faint)">{{ hora(mail.fecha) }}</span>
                        </div>
                        <p class="text-xs mt-0.5" style="color: var(--color-text-faint)">{{ etiqueta(mail.tipo) }}</p>

                        @if (mail.codigo) {
                          <div class="mt-1.5 flex items-center gap-2">
                            <code class="text-base tracking-[0.3em]" style="color: var(--color-cyan)">{{ mail.codigo }}</code>
                            <button type="button" class="fu-btn fu-btn--sm fu-btn--ghost" (click)="copiar(mail.codigo!, mail.id)">
                              {{ copiado() === mail.id ? '✓ copiado' : 'copiar' }}
                            </button>
                          </div>
                        }

                        @if (mail.enlace) {
                          <div class="mt-1.5 flex items-center gap-2">
                            <a
                              class="text-xs truncate flex-1 underline"
                              style="color: var(--color-cyan)"
                              [href]="mail.enlace"
                            >{{ mail.enlace }}</a>
                            <button type="button" class="fu-btn fu-btn--sm fu-btn--ghost" (click)="copiar(mail.enlace!, mail.id)">
                              {{ copiado() === mail.id ? '✓' : 'copiar' }}
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
                  [disabled]="!autenticado() || disparando()"
                  (click)="probarFlujo()"
                  title="echo-service pide un token de servicio y llama a users-service a través del Gateway"
                >
                  {{ disparando() ? 'disparando…' : 'probar flujo micro → micro' }}
                </button>
                @if (!autenticado()) {
                  <p class="text-xs mt-1" style="color: var(--color-text-faint)">
                    Logueate para que echo llame a users con tu usuario.
                  </p>
                }
                @if (avisoFlujo()) {
                  <p class="text-xs mt-1" [style.color]="avisoFlujoOk() ? 'var(--color-success)' : 'var(--color-danger)'">
                    {{ avisoFlujo() }}
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
                          <span class="fu-badge text-[10px] shrink-0" [style.background-color]="colorOrigen(log.origen)">
                            {{ log.origen }}
                          </span>
                          <span class="text-xs truncate flex-1" style="color: var(--color-text)">{{ log.destino }}</span>
                          <span class="text-xs shrink-0" style="color: var(--color-text-faint)">{{ hora(log.ts) }}</span>
                        </div>
                        <p class="text-xs mt-0.5 truncate" style="color: var(--color-text-faint)">
                          {{ log.metodo }} {{ log.path }}
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
          class="fu-btn fu-btn--sm fu-btn--secondary shadow-lg"
          (click)="abierto.set(!abierto())"
          [attr.aria-expanded]="abierto()"
          aria-label="Buzón de desarrollo"
        >
          📬 Buzón
          @if (!abierto() && mails().length) {
            <span class="fu-badge fu-badge--primary ml-1">{{ mails().length }}</span>
          }
        </button>
      </div>
    }
  `,
})
export class DevMailbox implements OnDestroy {
  protected readonly disponible = signal(false);
  protected readonly abierto = signal(false);
  protected readonly pestana = signal<'mails' | 'logs'>('mails');
  protected readonly mails = signal<MailDev[]>([]);
  protected readonly logs = signal<Traza[]>([]);
  protected readonly filtro = signal('');
  protected readonly error = signal<string | null>(null);
  protected readonly errorLogs = signal<string | null>(null);
  protected readonly copiado = signal<string | null>(null);
  protected readonly pendientes = signal<{ id: string; email: string }[]>([]);
  protected readonly resolviendo = signal<string | null>(null);
  protected readonly avisoPadron = signal<string | null>(null);
  protected readonly avisoOk = signal(false);
  protected readonly disparando = signal(false);
  protected readonly avisoFlujo = signal<string | null>(null);
  protected readonly avisoFlujoOk = signal(false);

  protected readonly autenticado: Signal<boolean>;

  protected readonly visibles = computed(() => {
    const f = this.filtro().trim().toLowerCase();
    return f ? this.mails().filter((m) => m.para?.toLowerCase().includes(f)) : this.mails();
  });

  private timer?: ReturnType<typeof setInterval>;

  constructor(private readonly tokenStore: TokenStoreService) {
    this.autenticado = tokenStore.isAuthenticated;
    // Una sola consulta al arrancar decide si el buzon existe en este entorno.
    // Si falla, el componente no vuelve a intentar y no deja rastro en la UI.
    void this.cargar(true);
  }

  ngOnDestroy(): void {
    this.detener();
  }

  protected refrescar(): void {
    void this.cargar(false);
  }

  protected cambiarPestana(p: 'mails' | 'logs'): void {
    this.pestana.set(p);
    if (p === 'logs') void this.cargarLogs();
  }

  protected alFiltrar(evento: Event): void {
    this.filtro.set((evento.target as HTMLInputElement).value);
  }

  protected async copiar(texto: string, id: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(texto);
      this.copiado.set(id);
      setTimeout(() => this.copiado.set(null), 1200);
    } catch {
      // Sin permiso de portapapeles (pasa fuera de https): el texto igual se ve
      // en pantalla y se puede seleccionar a mano. No vale un error en la UI.
    }
  }

  /**
   * Dispara el round-trip micro-a-micro de echo-service: la persona pega
   * /api/echo/cliente/perfil/{id}, y echo pide su token de servicio y llama a
   * users-service por el Gateway. El resultado son TRES entradas en la traza
   * (persona→echo, echo→users/token, echo→users/perfil) que el Gateway ya
   * está registrando en Redis.
   */
  protected async probarFlujo(): Promise<void> {
    const id = this.tokenStore.userId();
    const token = this.tokenStore.accessToken();
    if (!id || !token) return;

    this.disparando.set(true);
    this.avisoFlujo.set(null);
    try {
      const res = await fetch(`/api/echo/cliente/perfil/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cuerpo = await res.json();
      this.avisoFlujoOk.set(res.ok);
      this.avisoFlujo.set(
        res.ok
          ? 'Echo pidió su token y llamó a users por el Gateway. Mirá las tres entradas en los logs.'
          : (cuerpo.error ?? `Falló con status ${res.status}.`)
      );
    } catch {
      this.avisoFlujoOk.set(false);
      this.avisoFlujo.set('El flujo no respondió.');
    } finally {
      this.disparando.set(false);
      // La escritura de la traza en Redis es fire-and-forget en el Gateway:
      // puede aterrizar justo despues de la respuesta. Esperar a que el
      // round-trip aparezca en la lista en vez de prometer "se refresca solo".
      await this.esperarTraza(id);
    }
  }

  /**
   * Tras probarFlujo, la entrada mas nueva (indice 0) tiene que ser la llamada
   * de la persona a echo-service. Se intenta hasta que aparezca.
   */
  private async esperarTraza(id: string): Promise<void> {
    for (let intento = 0; intento < 7; intento++) {
      await new Promise((r) => setTimeout(r, 250));
      await this.cargarLogs();
      const primera = this.logs()[0];
      if (primera?.destino === 'echo-service' && primera.path === `/api/echo/cliente/perfil/${id}`) return;
      if (this.errorLogs()) return;
    }
  }

  /** Badge con color: cyan persona, verde servicio, gris anónimo/indefinido. */
  protected colorOrigen(origen: Traza['origen']): string {
    return { PERSON: 'rgba(34,211,238,0.18)', MS: 'rgba(74,222,128,0.18)', ANON: 'rgba(148,163,184,0.18)' }[origen] ?? 'rgba(148,163,184,0.18)';
  }

  protected colorStatus(status: number): string {
    if (status >= 400) return 'var(--color-danger)';
    if (status >= 300) return 'var(--color-warning)';
    return 'var(--color-success)';
  }

  /**
   * Se hace pasar por Cursos y publica el evento de padron resuelto.
   *
   * Un alumno que activa su email queda en PENDING_COURSE esperando que Cursos
   * valide su padron, y esa validacion llega por Kafka: no hay endpoint HTTP
   * que la dispare. Como el equipo de Cursos todavia no existe, sin esto la
   * cuenta se queda esperando para siempre y no se puede probar nada de lo que
   * viene despues.
   */
  protected async resolverPadron(email: string): Promise<void> {
    this.resolviendo.set(email);
    this.avisoPadron.set(null);
    try {
      const res = await fetch('/dev/resolver-padron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const cuerpo = await res.json();
      this.avisoOk.set(res.ok);
      this.avisoPadron.set(
        res.ok
          ? `${email} quedó ${cuerpo.a}. Volvé a loguearte: el token viejo sigue diciendo PENDING_COURSE.`
          : (cuerpo.error ?? 'No se pudo resolver.')
      );
      await this.cargar(false);
    } catch {
      this.avisoOk.set(false);
      this.avisoPadron.set('El buzón no responde.');
    } finally {
      this.resolviendo.set(null);
    }
  }

  protected hora(fecha: string): string {
    const d = new Date(fecha);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString('es-AR', { hour12: false });
  }

  /** Los eventType del backend, en algo que se lea de un vistazo. */
  protected etiqueta(tipo: string | null): string {
    return (
      {
        EMAIL_2FA: 'Código de acceso',
        EMAIL_ACTIVACION_CUENTA: 'Activación de cuenta',
        EMAIL_RESET_PASSWORD: 'Recuperar contraseña',
        WHITELISTING_RESOLVED: 'Padrón resuelto',
      }[tipo ?? ''] ?? (tipo ?? 'Mail')
    );
  }

  private async cargar(primera: boolean): Promise<void> {
    try {
      const res = await fetch(`${ENDPOINT}?limit=20`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));

      this.mails.set(await res.json());
      this.error.set(null);

      // Las cuentas trabadas van en el mismo refresco: si el buzon anda, esto
      // anda. Un fallo aca no puede tirar abajo la lista de mails, que es lo
      // que uno vino a ver.
      try {
        const p = await fetch('/dev/pendientes', { headers: { Accept: 'application/json' } });
        if (p.ok) this.pendientes.set(await p.json());
      } catch {
        /* el buzon sin /dev/pendientes sigue sirviendo para ver mails */
      }

      if (primera) {
        this.disponible.set(true);
        // Recien ahora se empieza a consultar en bucle: en un entorno sin buzon
        // no queda un intervalo pegandole a un 404 para siempre.
        this.timer = setInterval(() => {
          if (this.abierto()) {
            void this.cargar(false);
            if (this.pestana() === 'logs') void this.cargarLogs();
          }
        }, REFRESCO_MS);
      }
    } catch {
      if (primera) {
        // No hay buzon en este entorno. Es lo esperado en cualquier despliegue
        // real, asi que no se loguea ni se muestra nada.
        this.disponible.set(false);
        return;
      }
      this.error.set('El buzón no responde. ¿Está levantado el contenedor dev-mailbox?');
    }
  }

  private async cargarLogs(): Promise<void> {
    try {
      const res = await fetch(`${ENDPOINT_LOGS}?limit=50`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      const filas = (await res.json()) as Traza[];
      // La lista viene de la entrada MAS NUEVA a la mas vieja (Redis LPUSH al
      // cabeza, cap 200). Se muestra en ese orden: lo que acaba de pasar arriba,
      // sin tener que ir a buscar abajo de la lista.
      this.logs.set(filas);
      this.errorLogs.set(null);
    } catch {
      this.errorLogs.set('No se pudo leer la traza. ¿Está Redis arriba?');
    }
  }

  private detener(): void {
    if (this.timer) clearInterval(this.timer);
  }
}