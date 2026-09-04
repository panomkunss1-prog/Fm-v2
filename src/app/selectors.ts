/**
 * Composes Systems outputs (and static state) into ready-to-render view
 * models. This is the "wiring": selectors call into `src/systems/**` and
 * shape the result for `src/ui/**` — they never compute a financial
 * balance, board score, or classification themselves, only assemble what
 * Systems already computed (docs/ARCHITECTURE.md section 1).
 */
import type { AppState } from './state';
import type { BoardConfidenceSnapshot } from '@core/board';
import type { FinanceSnapshot } from '@core/finance';
import { getBoardConfidenceSnapshot } from '@systems/boardSystem';
import { getFinanceSnapshot } from '@systems/financeSystem';
import { getNextFixture, isHomeFixture } from '@systems/fixtureSystem';
import { getSeasonSummary, type SeasonSummary } from '@systems/seasonSystem';
import { formatKickoff } from '@core/format';

export interface HeaderViewModel {
  readonly eyebrow: string;
  readonly title: string;
  readonly contextLine: string;
}

export function selectHeaderViewModel(state: AppState): HeaderViewModel {
  const season = getSeasonSummary(state.season);
  if (state.role === 'chairman') {
    return {
      eyebrow: state.club.league,
      title: state.club.name,
      contextLine: `Season ${season.label} · ${season.matchdayLabel}`,
    };
  }
  return {
    eyebrow: 'Football Association of Thailand',
    title: 'Football Association President',
    contextLine: `Season ${season.label} · ${season.matchdayLabel}`,
  };
}

export interface NextFixtureViewModel {
  readonly homeName: string;
  readonly awayName: string;
  readonly homeIsPlayerClub: boolean;
  readonly matchdayLabel: string;
  readonly kickoffLabel: string;
}

export function selectNextFixture(state: AppState): NextFixtureViewModel | undefined {
  const fixture = getNextFixture(state.fixtures, state.club.id);
  if (!fixture) return undefined;
  const home = state.clubs[fixture.homeClubId];
  const away = state.clubs[fixture.awayClubId];
  return {
    homeName: home?.name ?? 'TBD',
    awayName: away?.name ?? 'TBD',
    homeIsPlayerClub: isHomeFixture(fixture, state.club.id),
    matchdayLabel: `Matchday ${fixture.matchday}`,
    kickoffLabel: formatKickoff(fixture.kickoffIso),
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
  readonly season: SeasonSummary;
}

export function selectFaPresidentDashboard(state: AppState): FaPresidentDashboardViewModel {
  return {
    season: getSeasonSummary(state.season),
  };
}
