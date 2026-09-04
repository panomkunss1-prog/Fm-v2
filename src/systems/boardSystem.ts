/**
 * Board confidence system. The single source of truth for turning a raw
 * confidence score into the classified snapshot every screen displays — see
 * the anti-duplication rule in docs/ARCHITECTURE.md section 1. This is a
 * deliberately minimal stand-in for the full Board & Reputation System
 * (Wave 2, Piece 6), which must extend `classifyBoardConfidence` rather
 * than reimplement it once results/finance/decisions start feeding it.
 *
 * Only the classification enum is computed here — the display label is
 * presentation copy, translated in `src/ui/` via `useTranslation()`
 * (docs/ARCHITECTURE.md section 4), not baked into Systems output.
 */
import type { BoardConfidenceLevel, BoardConfidenceSnapshot, BoardConfidenceState } from '@core/board';

interface BoardConfidenceThreshold {
  readonly min: number;
  readonly level: BoardConfidenceLevel;
}

// Ordered highest-first; the first threshold the (clamped) score clears wins.
const THRESHOLDS: readonly BoardConfidenceThreshold[] = [
  { min: 80, level: 'strong' },
  { min: 60, level: 'stable' },
  { min: 40, level: 'under_pressure' },
  { min: 0, level: 'critical' },
];

export function classifyBoardConfidence(score: number): BoardConfidenceLevel {
  const clamped = Math.max(0, Math.min(100, score));
  const match = THRESHOLDS.find((threshold) => clamped >= threshold.min) ?? THRESHOLDS[THRESHOLDS.length - 1];
  return match.level;
}

export function getBoardConfidenceSnapshot(state: BoardConfidenceState): BoardConfidenceSnapshot {
  const clamped = Math.max(0, Math.min(100, state.score));
  return { score: clamped, level: classifyBoardConfidence(clamped) };
}
