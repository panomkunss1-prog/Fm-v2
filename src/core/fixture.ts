/**
 * A single scheduled or completed league fixture. The full League &
 * Fixtures System (Wave 2, Piece 3) will generate a whole season's worth of
 * these; for Piece 1/2 only the seed data in `src/data/fixtures.ts` exists.
 */
export type FixtureStatus = 'scheduled' | 'played';

export interface Fixture {
  readonly id: string;
  readonly competition: string;
  readonly season: string;
  readonly matchday: number;
  readonly homeClubId: string;
  readonly awayClubId: string;
  readonly kickoffIso: string;
  readonly status: FixtureStatus;
}
