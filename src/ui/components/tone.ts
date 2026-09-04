/**
 * The shared set of visual "tones" a status Pill or meter fill can take.
 * Values are either an already-computed Systems classification (so the
 * exact enum value flows straight from `app`/`systems` into a CSS
 * `data-tone` hook with no interpretation in the component) or a static
 * brand tone (teal/gold/muted) for content with no classification.
 */
import type { BoardConfidenceLevel } from '@core/board';
import type { FinanceHealth } from '@core/finance';
import type { TranslationKey } from '@core/i18n';

export type StatusTone = BoardConfidenceLevel | FinanceHealth | 'teal' | 'gold' | 'muted';

/**
 * Systems only computes the classification enum, never its display label
 * (docs/ARCHITECTURE.md section 4) — these maps are the single place that
 * says which translation key renders each enum value, so every screen that
 * shows a board/finance status Pill resolves it the same way.
 */
export const BOARD_LEVEL_LABEL_KEY: Readonly<Record<BoardConfidenceLevel, TranslationKey>> = {
  critical: 'board.level.critical',
  under_pressure: 'board.level.underPressure',
  stable: 'board.level.stable',
  strong: 'board.level.strong',
};

export const FINANCE_HEALTH_LABEL_KEY: Readonly<Record<FinanceHealth, TranslationKey>> = {
  critical: 'finance.health.critical',
  caution: 'finance.health.caution',
  healthy: 'finance.health.healthy',
};
