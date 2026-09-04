/**
 * Seed finance state. A fixed starting balance for a new game — the full
 * Finance System (Wave 2, Piece 5) will replace this with a real ledger.
 */
import type { FinanceState } from '@core/finance';
import { money } from '@core/money';

export const SEED_FINANCE: FinanceState = {
  balance: money(32_600_000),
};
