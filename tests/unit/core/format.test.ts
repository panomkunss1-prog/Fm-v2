import { describe, it, expect } from 'vitest';
import { formatMoney, formatPercent, formatKickoff } from '@core/format';
import { money } from '@core/money';

describe('core/format.formatMoney', () => {
  it('formats a THB balance with the currency symbol and no decimals', () => {
    expect(formatMoney(money(32_600_000))).toBe('฿32,600,000');
  });

  it('formats zero', () => {
    expect(formatMoney(money(0))).toBe('฿0');
  });
});

describe('core/format.formatPercent', () => {
  it('rounds to the nearest whole percent', () => {
    expect(formatPercent(64)).toBe('64%');
    expect(formatPercent(64.6)).toBe('65%');
  });
});

describe('core/format.formatKickoff', () => {
  it('renders a non-empty, non-"Invalid Date" label in Indochina Time', () => {
    const label = formatKickoff('2026-09-13T19:30:00+07:00');
    expect(label).not.toContain('Invalid Date');
    expect(label).toContain('19:30');
    expect(label).toContain('ICT');
  });
});
