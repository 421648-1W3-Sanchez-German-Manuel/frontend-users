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
 * Visual mockup of the ADMIN "Global configuration" panel (RF-CFG-01,
 * RF-CFG-04, RF-CFG-05, RF-IA-24). There is no gamification/AI backend yet:
 * this screen only simulates the flow to validate UX, it persists nothing real.
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

  // PAR-01 — base XP per challenge cleared, by difficulty
  protected readonly xpBasic = signal(100);
  protected readonly xpMedium = signal(250);
  protected readonly xpAdvanced = signal(500);

  // PAR-02 — XP for LLM-generated custom challenges, by difficulty
  protected readonly xpLlmBasic = signal(10);
  protected readonly xpLlmMedium = signal(20);
  protected readonly xpLlmAdvanced = signal(30);

  // PAR-03 — coins per challenge cleared
  protected readonly coinsRequired = signal(100);
  protected readonly coinsOptional = signal(50);

  // PAR-04 — XP variation range by quality/time
  protected readonly xpVariationPercentage = signal(15);

  // PAR-11 — anti-leak similarity threshold for the AI tutor (RF-IA-20)
  protected readonly antiLeakThreshold = signal(70);

  // PAR-14 — AI evaluator calibration threshold (no default defined in the PRD)
  protected readonly evaluatorCalibrationThreshold = signal<number | null>(null);

  // Exchange catalog prices
  protected readonly exchangePrices = signal<MarketplacePrice[]>([
    { id: 'extra-hint', label: 'Pista extra en un desafío', cost: 20 },
    { id: 'avatar-change', label: 'Cambio de avatar', cost: 50 },
    { id: 'skip-challenge', label: 'Comodín "Salto de desafío"', cost: 150 },
  ]);

  // Model↔AI-function assignment (RF-IA-23/24)
  protected readonly aiAssignments = signal<AiFunctionAssignment[]>([
    { id: 'tutor', label: 'Tutor conversacional', model: 'GPT-4o-mini' },
    { id: 'challenge-generator', label: 'Generación de desafíos personalizados', model: 'Claude Haiku' },
    { id: 'evaluator', label: 'Evaluador de código/soluciones', model: 'Claude Sonnet' },
    { id: 'summary', label: 'Resumen y feedback de progreso', model: 'GPT-4o-mini' },
  ]);

  protected setPrice(id: string, cost: number): void {
    this.exchangePrices.update((list) => list.map((item) => (item.id === id ? { ...item, cost } : item)));
  }

  protected setModel(id: string, model: string): void {
    this.aiAssignments.update((list) => list.map((item) => (item.id === id ? { ...item, model } : item)));
  }

  protected save(): void {
    this.toast.info('Prototipo visual', 'Estos valores no se persisten: todavía no existe el backend de gamificación/IA.');
  }
}
