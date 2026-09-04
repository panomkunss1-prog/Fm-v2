/**
 * Fixture selection system. Given a fixture list and a club, picks the next
 * scheduled fixture for that club. Minimal stand-in for the full League &
 * Fixtures System (Wave 2, Piece 3), which must extend this file once real
 * season-long fixture generation exists.
 */
import type { Fixture } from '@core/fixture';

export function getNextFixture(fixtures: readonly Fixture[], clubId: string): Fixture | undefined {
  return fixtures
    .filter(
      (fixture) =>
        fixture.status === 'scheduled' && (fixture.homeClubId === clubId || fixture.awayClubId === clubId),
    )
    .slice()
    .sort((a, b) => a.kickoffIso.localeCompare(b.kickoffIso))[0];
}

export function isHomeFixture(fixture: Fixture, clubId: string): boolean {
  return fixture.homeClubId === clubId;
}
