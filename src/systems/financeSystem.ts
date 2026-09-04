/**
 * Club finance system. The single source of truth for turning a raw balance
 * into the classified snapshot every screen displays — see the
 * anti-duplication rule in docs/ARCHITECTURE.md section 1. This is a
 * deliberately minimal stand-in for the full Finance System (Wave 2, Piece
 * 5), which must extend `classifyFinanceHealth` rather than reimplement it
 * once a real income/expense ledger exists.
 */
import type { FinanceHealth, FinanceSnapshot, FinanceState } from '@core/finance';

const CRITICAL_BELOW = 5_000_000;
const CAUTION_BELOW = 20_000_000;

export function classifyFinanceHealth(balanceAmount: number): { health: FinanceHealth; label: string } {
  if (balanceAmount < CRITICAL_BELOW) return { health: 'critical', label: 'Critical' };
  if (balanceAmount < CAUTION_BELOW) return { health: 'caution', label: 'Caution' };
  return { health: 'healthy', label: 'Healthy' };
}

export function getFinanceSnapshot(state: FinanceState): FinanceSnapshot {
  const { health, label } = classifyFinanceHealth(state.balance.amount);
  return { balance: state.balance, health, label };
}
