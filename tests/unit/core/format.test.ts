import { describe, it, expect } from 'vitest';
import { formatMoney, formatPercent, formatKickoff } from '@core/format';
import { money } from '@core/money';

describe('core/format.formatMoney', () => {
  it('formats a THB balance with the currency symbol, a real separator, and no decimals', () => {
    // A narrow no-break space (U+202F) must sit between the symbol and the
    // first digit — Intl's own narrowSymbol currency formatting inserts
    // zero separator for en-US, which is exactly the crowding bug this
    // guards against. Assert the actual character, not just visual intent.
    expect(formatMoney(money(32_600_000))).toBe('฿ 32,600,000');
  });

  it('inserts a real separator (not just whitespace-that-looks-empty) between symbol and digits', () => {
    const formatted = formatMoney(money(32_600_000));
    const symbolIndex = formatted.indexOf('฿');
    const firstDigitIndex = formatted.search(/[0-9]/);
    expect(firstDigitIndex - symbolIndex).toBeGreaterThan(1);
  });

  it('confirms via formatToParts that Intl itself provides no separator, motivating the explicit fix', () => {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'THB',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
    }).formatToParts(32_600_000);
    const currencyIndex = parts.findIndex((p) => p.type === 'currency');
    const nextPart = parts[currencyIndex + 1];
    expect(nextPart.type).not.toBe('literal');
  });

  it('formats zero', () => {
    expect(formatMoney(money(0))).toBe('฿ 0');
  });
});

describe('core/format.formatPercent', () => {
  it('rounds to the nearest whole percent', () => {
    expect(formatPercent(64)).toBe('64%');
    expect(formatPercent(64.6)).toBe('65%');
  });
});

describe('core/format.formatKickoff', () => {
  it('renders a non-empty, non-"Invalid Date" label in Indochina Time (English)', () => {
    const label = formatKickoff('2026-09-13T19:30:00+07:00', 'en');
    expect(label).not.toContain('Invalid Date');
    expect(label).toContain('19:30');
    expect(label).toContain('ICT');
  });

  it('renders real Thai weekday/month text (not a transliteration) in Thai', () => {
    const label = formatKickoff('2026-09-13T19:30:00+07:00', 'th');
    expect(label).not.toContain('Invalid Date');
    expect(label).toContain('19:30');
    expect(label).toContain('ICT');
    // The kickoff date (2026-09-13) is a Sunday; Thai renders it with real
    // Thai script, not Latin weekday text.
    expect(label).toMatch(/[฀-๿]/);
    expect(label).not.toContain('Sun');
  });
});
