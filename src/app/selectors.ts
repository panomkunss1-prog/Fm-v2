/**
 * Composes Systems outputs (and static state) into ready-to-render view
 * models. This is the "wiring": selectors call into `src/systems/**` and
 * shape the result for `src/ui/**` — they never compute a financial
 * balance, board score, or classification themselves, only assemble what
 * Systems already computed (docs/ARCHITECTURE.md section 1).
 *
 * View models here carry raw data (proper nouns, numbers, enum
 * classifications) rather than pre-assembled sentences — translation
 * lookups happen in `src/ui/` via `useTranslation()`
 * (docs/ARCHITECTURE.md section 4), so no English/Thai copy is ever baked
 * in at this layer.
 */
import type { AppState } from './state';
import type { Role } from '@core/role';
import type { BoardConfidenceSnapshot } from '@core/board';
import type { FinanceSnapshot } from '@core/finance';
import { getBoardConfidenceSnapshot } from '@systems/boardSystem';
import { getFinanceSnapshot } from '@systems/financeSystem';
import { getNextFixture, isHomeFixture } from '@systems/fixtureSystem';
import { getSeasonSummary, type SeasonSummary } from '@systems/seasonSystem';
import { formatKickoff } from '@core/format';

export interface HeaderViewModel {
  readonly role: Role;
  /** Always a proper noun (league name or association name) — never translated. */
  readonly eyebrow: string;
  /** Proper noun (club name); only meaningful when `role === 'chairman'`. */
  readonly clubName: string | undefined;
  readonly season: SeasonSummary;
}

export function selectHeaderViewModel(state: AppState): HeaderViewModel {
  const season = getSeasonSummary(state.season);
  if (state.role === 'chairman') {
    return { role: state.role, eyebrow: state.club.league, clubName: state.club.name, season };
  }
  return { role: state.role, eyebrow: state.association.name, clubName: undefined, season };
}

export interface NextFixtureViewModel {
  readonly homeName: string | undefined;
  readonly awayName: string | undefined;
  readonly homeIsPlayerClub: boolean;
  readonly matchday: number;
  readonly kickoffLabel: string;
}

export function selectNextFixture(state: AppState): NextFixtureViewModel | undefined {
  const fixture = getNextFixture(state.fixtures, state.club.id);
  if (!fixture) return undefined;
  const home = state.clubs[fixture.homeClubId];
  const away = state.clubs[fixture.awayClubId];
  return {
    homeName: home?.name,
    awayName: away?.name,
    homeIsPlayerClub: isHomeFixture(fixture, state.club.id),
    matchday: fixture.matchday,
    kickoffLabel: formatKickoff(fixture.kickoffIso, state.language),
  };
}

export interface ChairmanDashboardViewModel {
  readonly club: AppState['club'];
  readonly season: SeasonSummary;
  readonly nextFixture: NextFixtureViewModel | undefined;
  readonly board: BoardConfidenceSnapshot;
  readonly finance: FinanceSnapshot;
}

export function selectChairmanDashboard(state: AppState): ChairmanDashboardViewModel {
  return {
    club: state.club,
    season: getSeasonSummary(state.season),
    nextFixture: selectNextFixture(state),
    board: getBoardConfidenceSnapshot(state.board),
    finance: getFinanceSnapshot(state.finance),
  };
}

export interface FaPresidentDashboardViewModel {
  readonly association: AppState['association'];
  readonly season: SeasonSummary;
}

export function selectFaPresidentDashboard(state: AppState): FaPresidentDashboardViewModel {
  return {
    association: state.association,
    season: getSeasonSummary(state.season),
  };
}
