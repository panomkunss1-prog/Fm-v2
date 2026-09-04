/**
 * Season progress system. Derives a display-ready summary (matchday label,
 * completion percentage) from raw season state — the single source of truth
 * for "how far through the season are we," so no screen recomputes it ad
 * hoc (docs/ARCHITECTURE.md section 1).
 */
import type { SeasonState } from '@core/season';

export interface SeasonSummary {
  readonly label: string;
  readonly matchday: number;
  readonly totalMatchdays: number;
  readonly matchdayLabel: string;
  readonly progressPct: number;
}

export function getSeasonSummary(season: SeasonState): SeasonSummary {
  const progressPct =
    season.totalMatchdays > 0 ? Math.round((season.matchday / season.totalMatchdays) * 100) : 0;
  return {
    label: season.label,
    matchday: season.matchday,
    totalMatchdays: season.totalMatchdays,
    matchdayLabel: `Matchday ${season.matchday} of ${season.totalMatchdays}`,
    progressPct,
  };
}
