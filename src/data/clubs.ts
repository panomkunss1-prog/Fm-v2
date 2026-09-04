/**
 * Seed club data. Real public facts only (club name, city, league) per the
 * data policy in docs/ARCHITECTURE.md section 3 — both names are already
 * established identity for this project (BG Pathum United is the player's
 * club; Sukhothai FC is the Matchday 1 opponent).
 */
import type { Club } from '@core/club';

export const BG_PATHUM_UNITED: Club = {
  id: 'bg-pathum-united',
  name: 'BG Pathum United',
  shortName: 'BG Pathum',
  league: 'Thai League 1',
  city: 'Pathum Thani',
  crestInitials: 'BG',
};

export const SUKHOTHAI_FC: Club = {
  id: 'sukhothai-fc',
  name: 'Sukhothai FC',
  shortName: 'Sukhothai',
  league: 'Thai League 1',
  city: 'Sukhothai',
  crestInitials: 'SK',
};

/** The player's club. Every Chairman-mode screen is scoped to this club. */
export const PLAYER_CLUB = BG_PATHUM_UNITED;

export const CLUBS_BY_ID: Readonly<Record<string, Club>> = {
  [BG_PATHUM_UNITED.id]: BG_PATHUM_UNITED,
  [SUKHOTHAI_FC.id]: SUKHOTHAI_FC,
};
