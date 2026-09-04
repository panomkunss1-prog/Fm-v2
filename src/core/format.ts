/**
 * Generic, presentation-only formatting of primitive/value-object data
 * (currency strings, percentages, date/time labels). These are pure
 * functions with no domain thresholds or classification — that logic
 * belongs in `src/systems/**` — so they are safe for `src/ui/**` to call
 * directly without becoming "business logic in a component"
 * (docs/ARCHITECTURE.md section 1).
 */
import type { Money } from './money';

export function formatMoney(value: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: value.currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value.amount);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/** Kickoff times are always shown in Indochina Time (ICT), the Thai League's home timezone. */
export function formatKickoff(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok',
  }).format(new Date(iso));
  return `${parts} ICT`;
}
