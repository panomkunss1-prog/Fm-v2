/**
 * Season progress system. Derives a display-ready summary (completion
 * percentage) from raw season state — the single source of truth for "how
 * far through the season are we," so no screen recomputes it ad hoc
 * (docs/ARCHITECTURE.md section 1).
 *
 * This intentionally stops short of building a "Matchday X of Y" *label* —
 * that phrasing is presentation copy, composed in `src/ui/` via
 * `useTranslation()` from the raw `matchday`/`totalMatchdays` numbers below
 * (docs/ARCHITECTURE.md section 4), not baked into Systems output.
 */
import type { SeasonState } from '@core/season';

export interface SeasonSummary {
  readonly label: string;
  readonly matchday: number;
  readonly totalMatchdays: number;
  readonly progressPct: number;
}

export function getSeasonSummary(season: SeasonState): SeasonSummary {
  const progressPct =
    season.totalMatchdays > 0 ? Math.round((season.matchday / season.totalMatchdays) * 100) : 0;
  return {
    label: season.label,
    matchday: season.matchday,
    totalMatchdays: season.totalMatchdays,
    progressPct,
  };
}
