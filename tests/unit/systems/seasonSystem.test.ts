import { describe, it, expect } from 'vitest';
import { getSeasonSummary } from '@systems/seasonSystem';

describe('seasonSystem.getSeasonSummary', () => {
  it('carries the raw matchday/totalMatchdays numbers through unchanged', () => {
    const summary = getSeasonSummary({ label: '2026/27', matchday: 1, totalMatchdays: 30 });
    expect(summary.matchday).toBe(1);
    expect(summary.totalMatchdays).toBe(30);
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
