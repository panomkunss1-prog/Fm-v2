/**
 * i18n vocabulary — the Language type and the TranslationKey shape only.
 * No strings live here; the actual Thai/English dictionaries are reference
 * data in `src/data/translations/{th,en}.ts` (docs/ARCHITECTURE.md section
 * 4). Both dictionary files must define exactly this key set — see
 * `tests/unit/data/translations.test.ts`, which diffs them at test time,
 * and note that `TranslationDictionary` below already makes a missing/extra
 * key a `tsc` error at build time too.
 */
export type Language = 'th' | 'en';

export const LANGUAGES: readonly Language[] = ['th', 'en'];

export type TranslationKey =
  | 'nav.dashboard'
  | 'nav.club'
  | 'nav.finance'
  | 'nav.league'
  | 'nav.association'
  | 'nav.primaryLabel'
  | 'role.chairman'
  | 'role.faPresident'
  | 'role.groupLabel'
  | 'language.th'
  | 'language.en'
  | 'language.toggleLabel'
  | 'header.faPresidentTitle'
  | 'dashboard.seasonContext'
  | 'dashboard.boardConfidence'
  | 'dashboard.clubFinance'
  | 'dashboard.nextFixture'
  | 'dashboard.noFixtureScheduled'
  | 'dashboard.season'
  | 'dashboard.seasonProgressLabel'
  | 'dashboard.seasonProgressCaption'
  | 'dashboard.matchdayPill'
  | 'dashboard.home'
  | 'dashboard.away'
  | 'dashboard.vs'
  | 'board.level.critical'
  | 'board.level.underPressure'
  | 'board.level.stable'
  | 'board.level.strong'
  | 'finance.health.critical'
  | 'finance.health.caution'
  | 'finance.health.healthy'
  | 'emptyState.notBuiltYet'
  | 'common.tbd'
  | 'club.title'
  | 'club.description'
  | 'club.emptyState.meta'
  | 'finance.description'
  | 'finance.emptyState.meta'
  | 'league.eyebrow'
  | 'league.description'
  | 'league.emptyState.meta'
  | 'association.eyebrow'
  | 'association.title'
  | 'association.description'
  | 'association.emptyState.meta'
  | 'fa.officeOfPresident'
  | 'fa.seasonNote'
  | 'fa.governanceFocusAreas'
  | 'fa.focus.nationalCompetitions'
  | 'fa.focus.nationalTeamPipeline'
  | 'fa.focus.refereeDevelopment'
  | 'fa.focus.footballInfrastructure'
  | 'fa.planned'
  | 'fa.emptyState.eyebrow'
  | 'fa.emptyState.title'
  | 'fa.emptyState.description'
  | 'fa.emptyState.meta';

/** The shape every translation dictionary must satisfy — see the file doc-comment above. */
export type TranslationDictionary = Readonly<Record<TranslationKey, string>>;
