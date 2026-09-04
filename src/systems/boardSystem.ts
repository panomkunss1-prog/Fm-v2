/**
 * Board confidence system. The single source of truth for turning a raw
 * confidence score into the classified snapshot every screen displays — see
 * the anti-duplication rule in docs/ARCHITECTURE.md section 1. This is a
 * deliberately minimal stand-in for the full Board & Reputation System
 * (Wave 2, Piece 6), which must extend `classifyBoardConfidence` rather
 * than reimplement it once results/finance/decisions start feeding it.
 */
import type { BoardConfidenceLevel, BoardConfidenceSnapshot, BoardConfidenceState } from '@core/board';

interface BoardConfidenceThreshold {
  readonly min: number;
  readonly level: BoardConfidenceLevel;
  readonly label: string;
}

// Ordered highest-first; the first threshold the (clamped) score clears wins.
const THRESHOLDS: readonly BoardConfidenceThreshold[] = [
  { min: 80, level: 'strong', label: 'Strong' },
  { min: 60, level: 'stable', label: 'Stable' },
  { min: 40, level: 'under_pressure', label: 'Under Pressure' },
  { min: 0, level: 'critical', label: 'Critical' },
];

export function classifyBoardConfidence(score: number): { level: BoardConfidenceLevel; label: string } {
  const clamped = Math.max(0, Math.min(100, score));
  const match = THRESHOLDS.find((threshold) => clamped >= threshold.min) ?? THRESHOLDS[THRESHOLDS.length - 1];
  return { level: match.level, label: match.label };
}

export function getBoardConfidenceSnapshot(state: BoardConfidenceState): BoardConfidenceSnapshot {
  const clamped = Math.max(0, Math.min(100, state.score));
  const { level, label } = classifyBoardConfidence(clamped);
  return { score: clamped, level, label };
}
