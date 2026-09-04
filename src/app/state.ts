/**
 * The single game state store shape and its initial value, built from
 * `src/data` seeds. This is the only place seed data is read into the live
 * app — everything downstream (selectors, UI) reads from `AppState`, never
 * from `src/data` directly (docs/ARCHITECTURE.md section 1).
 */
import type { Role } from '@core/role';
import type { TabId } from '@core/navigation';
import type { Club } from '@core/club';
import type { Fixture } from '@core/fixture';
import type { SeasonState } from '@core/season';
import type { BoardConfidenceState } from '@core/board';
import type { FinanceState } from '@core/finance';
import { CLUBS_BY_ID, PLAYER_CLUB } from '@data/clubs';
import { SEED_FIXTURES } from '@data/fixtures';
import { SEED_SEASON } from '@data/season';
import { SEED_BOARD } from '@data/board';
import { SEED_FINANCE } from '@data/finance';

export interface AppState {
  readonly role: Role;
  readonly activeTab: TabId;
  readonly club: Club;
  readonly clubs: Readonly<Record<string, Club>>;
  readonly season: SeasonState;
  readonly fixtures: readonly Fixture[];
  readonly board: BoardConfidenceState;
  readonly finance: FinanceState;
}

export const initialAppState: AppState = {
  role: 'chairman',
  activeTab: 'dashboard',
  club: PLAYER_CLUB,
  clubs: CLUBS_BY_ID,
  season: SEED_SEASON,
  fixtures: SEED_FIXTURES,
  board: SEED_BOARD,
  finance: SEED_FINANCE,
};
