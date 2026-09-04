import { describe, it, expect } from 'vitest';
import { getSeasonSummary } from '@systems/seasonSystem';

describe('seasonSystem.getSeasonSummary', () => {
  it('builds a human-readable matchday label', () => {
    const summary = getSeasonSummary({ label: '2026/27', matchday: 1, totalMatchdays: 30 });
    expect(summary.matchdayLabel).toBe('Matchday 1 of 30');
    expect(summary.label).toBe('2026/27');
  });

  it('computes rounded progress percentage', () => {
    expect(getSeasonSummary({ label: '2026/27', matchday: 1, totalMatchdays: 30 }).progressPct).toBe(3);
    expect(getSeasonSummary({ label: '2026/27', matchday: 15, totalMatchdays: 30 }).progressPct).toBe(50);
    expect(getSeasonSummary({ label: '2026/27', matchday: 30, totalMatchdays: 30 }).progressPct).toBe(100);
  });

  it('does not divide by zero when totalMatchdays is 0', () => {
    expect(getSeasonSummary({ label: '2026/27', matchday: 0, totalMatchdays: 0 }).progressPct).toBe(0);
  });
});
