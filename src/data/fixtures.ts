/**
 * Seed fixture data. A single Matchday 1 fixture for now — the League &
 * Fixtures System (Wave 2, Piece 3) will generate the full season.
 */
import type { Fixture } from '@core/fixture';
import { BG_PATHUM_UNITED, SUKHOTHAI_FC } from './clubs';

export const SEED_FIXTURES: readonly Fixture[] = [
  {
    id: 'tl1-2026-27-md1-bgpu-skt',
    competition: 'Thai League 1',
    season: '2026/27',
    matchday: 1,
    homeClubId: BG_PATHUM_UNITED.id,
    awayClubId: SUKHOTHAI_FC.id,
    kickoffIso: '2026-09-13T19:30:00+07:00',
    status: 'scheduled',
  },
];
