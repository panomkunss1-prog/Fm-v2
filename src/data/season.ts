/**
 * Seed season state. 30 matchdays = a 16-club Thai League 1 double
 * round-robin (15 opponents x home-and-away).
 */
import type { SeasonState } from '@core/season';

export const SEED_SEASON: SeasonState = {
  label: '2026/27',
  matchday: 1,
  totalMatchdays: 30,
};
