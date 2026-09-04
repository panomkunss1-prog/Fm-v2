/**
 * The shared set of visual "tones" a status Pill or meter fill can take.
 * Values are either an already-computed Systems classification (so the
 * exact enum value flows straight from `app`/`systems` into a CSS
 * `data-tone` hook with no interpretation in the component) or a static
 * brand tone (teal/gold/muted) for content with no classification.
 */
import type { BoardConfidenceLevel } from '@core/board';
import type { FinanceHealth } from '@core/finance';

export type StatusTone = BoardConfidenceLevel | FinanceHealth | 'teal' | 'gold' | 'muted';
