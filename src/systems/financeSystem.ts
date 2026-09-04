/**
 * Club finance system. The single source of truth for turning a raw balance
 * into the classified snapshot every screen displays — see the
 * anti-duplication rule in docs/ARCHITECTURE.md section 1. This is a
 * deliberately minimal stand-in for the full Finance System (Wave 2, Piece
 * 5), which must extend `classifyFinanceHealth` rather than reimplement it
 * once a real income/expense ledger exists.
 *
 * Only the classification enum is computed here — the display label is
 * presentation copy, translated in `src/ui/` via `useTranslation()`
 * (docs/ARCHITECTURE.md section 4), not baked into Systems output.
 */
import type { FinanceHealth, FinanceSnapshot, FinanceState } from '@core/finance';

const CRITICAL_BELOW = 5_000_000;
const CAUTION_BELOW = 20_000_000;

export function classifyFinanceHealth(balanceAmount: number): FinanceHealth {
  if (balanceAmount < CRITICAL_BELOW) return 'critical';
  if (balanceAmount < CAUTION_BELOW) return 'caution';
  return 'healthy';
}

export function getFinanceSnapshot(state: FinanceState): FinanceSnapshot {
  return { balance: state.balance, health: classifyFinanceHealth(state.balance.amount) };
}
