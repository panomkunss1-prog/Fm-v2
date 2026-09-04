import { describe, it, expect } from 'vitest';
import { classifyFinanceHealth, getFinanceSnapshot } from '@systems/financeSystem';
import { money } from '@core/money';

describe('financeSystem.classifyFinanceHealth', () => {
  it('classifies a balance below 5,000,000 as critical', () => {
    expect(classifyFinanceHealth(4_999_999)).toBe('critical');
  });

  it('classifies a negative balance as critical', () => {
    expect(classifyFinanceHealth(-1)).toBe('critical');
  });

  it('classifies exactly 5,000,000 as caution', () => {
    expect(classifyFinanceHealth(5_000_000)).toBe('caution');
  });

  it('classifies just below 20,000,000 as caution', () => {
    expect(classifyFinanceHealth(19_999_999)).toBe('caution');
  });

  it('classifies exactly 20,000,000 as healthy', () => {
    expect(classifyFinanceHealth(20_000_000)).toBe('healthy');
  });

  it('classifies a large balance as healthy', () => {
    expect(classifyFinanceHealth(100_000_000)).toBe('healthy');
  });
});

describe('financeSystem.getFinanceSnapshot', () => {
  it('carries the balance through unchanged alongside its classification', () => {
    const balance = money(32_600_000);
    expect(getFinanceSnapshot({ balance })).toEqual({
      balance,
      health: 'healthy',
    });
  });

  it('classifies a critical seed balance correctly', () => {
    const balance = money(1_200_000);
    expect(getFinanceSnapshot({ balance })).toEqual({
      balance,
      health: 'critical',
    });
  });
});
