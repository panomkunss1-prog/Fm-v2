/**
 * English dictionary. Reference data, same category as club/seed lists —
 * see docs/ARCHITECTURE.md section 4. Must define exactly the same key set
 * as `./th.ts`; `TranslationDictionary` makes a missing/extra key a `tsc`
 * error, and `tests/unit/data/translations.test.ts` diffs the two key sets
 * again at test time.
 */
import type { TranslationDictionary } from '@core/i18n';

export const en: TranslationDictionary = {
  'nav.dashboard': 'Dashboard',
  'nav.club': 'Club',
  'nav.finance': 'Finance',
  'nav.league': 'League',
  'nav.association': 'Association',
  'nav.primaryLabel': 'Primary',

  'role.chairman': 'Chairman',
  'role.faPresident': 'FA President',
  'role.groupLabel': 'Player role',

  'language.th': 'ไทย',
  'language.en': 'English',
  'language.toggleLabel': 'Language',

  'header.faPresidentTitle': 'Football Association President',

  'dashboard.seasonContext': 'Season {season} · Matchday {matchday} of {total}',
  'dashboard.boardConfidence': 'Board Confidence',
  'dashboard.clubFinance': 'Club Finance',
  'dashboard.nextFixture': 'Next Fixture',
  'dashboard.noFixtureScheduled': 'No fixture scheduled.',
  'dashboard.season': 'Season',
  'dashboard.seasonProgressLabel': 'Season progress',
  'dashboard.seasonProgressCaption': '{percent}% of the season complete',
  'dashboard.matchdayPill': 'Matchday {matchday}',
  'dashboard.home': 'Home',
  'dashboard.away': 'Away',
  'dashboard.vs': 'vs',

  'board.level.critical': 'Critical',
  'board.level.underPressure': 'Under Pressure',
  'board.level.stable': 'Stable',
  'board.level.strong': 'Strong',

  'finance.health.critical': 'Critical',
  'finance.health.caution': 'Caution',
  'finance.health.healthy': 'Healthy',

  'emptyState.notBuiltYet': 'Not built yet',
  'common.tbd': 'TBD',

  'club.title': 'Club Management',
  'club.description':
    'Manager oversight, transfers, sponsors, stadium and facility investment are coming in later pieces.',
  'club.emptyState.meta': 'Planned for Wave 2–3',

  'finance.description':
    'The full income and expense ledger, budgets and sponsorship revenue are coming in a later piece.',
  'finance.emptyState.meta': 'Planned for Wave 2 — Piece 5',

  'league.eyebrow': 'Competition',
  'league.description': 'The full fixture list and league table are coming in a later piece.',
  'league.emptyState.meta': 'Planned for Wave 2 — Piece 3',

  'association.eyebrow': 'Governance',
  'association.title': 'Football Association',
  'association.description':
    'National competitions, referee development and youth-pipeline oversight are coming in a later piece.',
  'association.emptyState.meta': 'Planned for Wave 4 — Piece 12',

  'fa.officeOfPresident': 'Office of the President',
  'fa.seasonNote': 'National competition oversight follows the same league calendar.',
  'fa.governanceFocusAreas': 'Governance Focus Areas',
  'fa.focus.nationalCompetitions': 'National Competitions',
  'fa.focus.nationalTeamPipeline': 'National Team Pipeline',
  'fa.focus.refereeDevelopment': 'Referee Development',
  'fa.focus.footballInfrastructure': 'Football Infrastructure',
  'fa.planned': 'Planned',
  'fa.emptyState.eyebrow': 'Football Association President',
  'fa.emptyState.title': "President's command center",
  'fa.emptyState.description':
    'Full national oversight tools — competitions, referees, youth pipeline and infrastructure — arrive in a later piece.',
  'fa.emptyState.meta': 'Planned for Wave 4',
};
