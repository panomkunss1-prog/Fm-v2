/**
 * Club finance. `FinanceState` is the raw tracked balance; `FinanceSnapshot`
 * is what `systems/financeSystem` computes from it for display. The full
 * Finance System (Wave 2, Piece 5) will extend `financeSystem` with a real
 * income/expense ledger — it must extend this file, not fork a parallel one
 * (docs/ARCHITECTURE.md section 5).
 */
import type { Money } from './money';

export type FinanceHealth = 'critical' | 'caution' | 'healthy';

export interface FinanceState {
  readonly balance: Money;
}

export interface FinanceSnapshot {
  readonly balance: Money;
  readonly health: FinanceHealth;
  readonly label: string;
}
