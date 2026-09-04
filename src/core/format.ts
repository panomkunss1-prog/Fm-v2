/**
 * Generic, presentation-only formatting of primitive/value-object data
 * (currency strings, percentages, date/time labels). These are pure
 * functions with no domain thresholds or classification — that logic
 * belongs in `src/systems/**` — so they are safe for `src/ui/**` to call
 * directly without becoming "business logic in a component"
 * (docs/ARCHITECTURE.md section 1).
 */
import type { Money } from './money';
import type { Language } from './i18n';

/**
 * `Intl.NumberFormat`'s `narrowSymbol` currency formatting puts zero
 * separator between the currency symbol and the first digit for `en-US`
 * (e.g. `"฿32,600,000"`) — confirmed via `formatToParts`, which returns no
 * literal/space part between the `currency` part and the number. At small
 * sizes the ฿ glyph's ink can extend past its own advance box, visually
 * crowding the digit that follows. Fix: insert an explicit narrow no-break
 * space (U+202F) after the currency part ourselves, rather than trusting
 * `Intl`'s zero-gap output verbatim. Narrow-no-break (not a plain space) so
 * the symbol and its figure still never wrap apart across a line break.
 */
const CURRENCY_GAP = '\u202F'; // NARROW NO-BREAK SPACE

export function formatMoney(value: Money): string {
  const parts = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: value.currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).formatToParts(value.amount);

  return parts.map((part) => (part.type === 'currency' ? `${part.value}${CURRENCY_GAP}` : part.value)).join('');
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

const KICKOFF_LOCALE: Readonly<Record<Language, string>> = {
  th: 'th-TH',
  en: 'en-GB',
};

/**
 * Kickoff times are always shown in Indochina Time (ICT), the Thai
 * League's home timezone. The weekday/month labels localize with the
 * active UI language (verified: `th-TH` renders real Thai weekday/month
 * abbreviations with Gregorian-calendar, Latin-digit day/time numbers for
 * this field set — no Buddhist-era or Thai-numeral surprises); the "ICT"
 * suffix itself is a fixed timezone abbreviation, not translated.
 */
export function formatKickoff(iso: string, language: Language): string {
  const parts = new Intl.DateTimeFormat(KICKOFF_LOCALE[language], {
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
