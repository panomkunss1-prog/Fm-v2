/**
 * Seed association data. A real public fact (the actual governing body's
 * name) — same real-football-data policy as `src/data/clubs.ts` (see
 * docs/ARCHITECTURE.md section 3). This is NOT a translation-dictionary
 * entry: domain proper nouns are never re-invented per language (section
 * 4), so this name renders identically regardless of the active language,
 * exactly like a club name does.
 */
import type { Association } from '@core/association';

export const FOOTBALL_ASSOCIATION_OF_THAILAND: Association = {
  id: 'fa-thailand',
  name: 'Football Association of Thailand',
  shortName: 'FA Thailand',
  crestInitials: 'FA',
};

/** The association the player governs as FA President. */
export const PLAYER_ASSOCIATION = FOOTBALL_ASSOCIATION_OF_THAILAND;
