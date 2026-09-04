import { describe, it, expect } from 'vitest';
import { getNextFixture, isHomeFixture } from '@systems/fixtureSystem';
import type { Fixture } from '@core/fixture';

const CLUB_A = 'club-a';
const CLUB_B = 'club-b';
const CLUB_C = 'club-c';

function fixture(overrides: Partial<Fixture>): Fixture {
  return {
    id: 'f1',
    competition: 'Thai League 1',
    season: '2026/27',
    matchday: 1,
    homeClubId: CLUB_A,
    awayClubId: CLUB_B,
    kickoffIso: '2026-09-13T19:30:00+07:00',
    status: 'scheduled',
    ...overrides,
  };
}

describe('fixtureSystem.getNextFixture', () => {
  it('returns undefined when there are no fixtures', () => {
    expect(getNextFixture([], CLUB_A)).toBeUndefined();
  });

  it('returns undefined when no fixture involves the given club', () => {
    const fixtures = [fixture({ id: 'f1', homeClubId: CLUB_B, awayClubId: CLUB_C })];
    expect(getNextFixture(fixtures, CLUB_A)).toBeUndefined();
  });

  it('picks the earliest scheduled fixture involving the club, by kickoff time', () => {
    const fixtures = [
      fixture({ id: 'later', matchday: 3, kickoffIso: '2026-10-01T19:30:00+07:00' }),
      fixture({ id: 'earlier', matchday: 1, kickoffIso: '2026-09-13T19:30:00+07:00' }),
      fixture({ id: 'middle', matchday: 2, kickoffIso: '2026-09-20T19:30:00+07:00' }),
    ];
    expect(getNextFixture(fixtures, CLUB_A)?.id).toBe('earlier');
  });

  it('excludes fixtures already played', () => {
    const fixtures = [
      fixture({ id: 'played', status: 'played', kickoffIso: '2026-09-01T19:30:00+07:00' }),
      fixture({ id: 'scheduled', status: 'scheduled', kickoffIso: '2026-09-13T19:30:00+07:00' }),
    ];
    expect(getNextFixture(fixtures, CLUB_A)?.id).toBe('scheduled');
  });

  it('matches a club whether it is home or away', () => {
    const fixtures = [fixture({ id: 'away-match', homeClubId: CLUB_C, awayClubId: CLUB_A })];
    expect(getNextFixture(fixtures, CLUB_A)?.id).toBe('away-match');
  });

  it('does not mutate the input array order', () => {
    const fixtures = [
      fixture({ id: 'b', kickoffIso: '2026-09-20T19:30:00+07:00' }),
      fixture({ id: 'a', kickoffIso: '2026-09-13T19:30:00+07:00' }),
    ];
    const snapshot = [...fixtures];
    getNextFixture(fixtures, CLUB_A);
    expect(fixtures).toEqual(snapshot);
  });
});

describe('fixtureSystem.isHomeFixture', () => {
  it('returns true when the club is the home club', () => {
    expect(isHomeFixture(fixture({ homeClubId: CLUB_A, awayClubId: CLUB_B }), CLUB_A)).toBe(true);
  });

  it('returns false when the club is the away club', () => {
    expect(isHomeFixture(fixture({ homeClubId: CLUB_A, awayClubId: CLUB_B }), CLUB_B)).toBe(false);
  });
});
