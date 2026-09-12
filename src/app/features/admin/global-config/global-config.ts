import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { FuButton } from '../../../shared/ui/button/button';

interface AiFunctionAssignment {
  id: string;
  label: string;
  model: string;
}

interface MarketplacePrice {
  id: string;
  label: string;
  cost: number;
}

const AI_MODELS = ['GPT-4o-mini', 'Claude Haiku', 'Claude Sonnet', 'Llama 3 70B'] as const;

/**
 * Mockup visual del panel de "Configuraciones globales" del ADMIN (RF-CFG-01,
 * RF-CFG-04, RF-CFG-05, RF-IA-24). No hay backend de gamificación/IA todavía:
 * esta pantalla solo simula el flujo para validar UX, no persiste nada real.
 */
@Component({
  selector: 'fu-global-config',
  standalone: true,
  imports: [FormsModule, FuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './global-config.html',
})
export class GlobalConfig {
  private readonly toast = inject(ToastService);

  protected readonly aiModels = AI_MODELS;

  // PAR-01 — XP base por desafío superado, por dificultad
  protected readonly xpBasico = signal(100);
  protected readonly xpMedio = signal(250);
  protected readonly xpAvanzado = signal(500);

  // PAR-02 — XP de desafíos personalizados generados por LLM, por dificultad
  protected readonly xpLlmBasico = signal(10);
  protected readonly xpLlmMedio = signal(20);
  protected readonly xpLlmAvanzado = signal(30);

  // PAR-03 — Monedas por desafío superado
  protected readonly monedasObligatorio = signal(100);
  protected readonly monedasOpcional = signal(50);

  // PAR-04 — Rango de variación de XP por calidad/tiempo
  protected readonly variacionXpPorcentaje = signal(15);

  // PAR-11 — Umbral de similitud anti-fuga del tutor IA (RF-IA-20)
  protected readonly umbralAntiFuga = signal(70);

  // PAR-14 — Umbral de calibración del evaluador IA (sin default definido en el PRD)
  protected readonly umbralCalibracionEvaluador = signal<number | null>(null);

  // Precios del catálogo de intercambio
  protected readonly preciosIntercambio = signal<MarketplacePrice[]>([
    { id: 'pista-extra', label: 'Pista extra en un desafío', cost: 20 },
    { id: 'cambio-avatar', label: 'Cambio de avatar', cost: 50 },
    { id: 'salto-desafio', label: 'Comodín "Salto de desafío"', cost: 150 },
  ]);

  // Asignación modelo↔función de IA (RF-IA-23/24)
  protected readonly asignacionesIa = signal<AiFunctionAssignment[]>([
    { id: 'tutor', label: 'Tutor conversacional', model: 'GPT-4o-mini' },
    { id: 'generador-desafios', label: 'Generación de desafíos personalizados', model: 'Claude Haiku' },
    { id: 'evaluador', label: 'Evaluador de código/soluciones', model: 'Claude Sonnet' },
    { id: 'resumen', label: 'Resumen y feedback de progreso', model: 'GPT-4o-mini' },
  ]);

  protected setPrecio(id: string, cost: number): void {
    this.preciosIntercambio.update((list) => list.map((item) => (item.id === id ? { ...item, cost } : item)));
  }

  protected setModelo(id: string, model: string): void {
    this.asignacionesIa.update((list) => list.map((item) => (item.id === id ? { ...item, model } : item)));
  }

  protected guardar(): void {
    this.toast.info('Prototipo visual', 'Estos valores no se persisten: todavía no existe el backend de gamificación/IA.');
  }
}
