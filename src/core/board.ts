/**
 * Board confidence. `BoardConfidenceState` is the raw tracked score;
 * `BoardConfidenceSnapshot` is what `systems/boardSystem` computes from it
 * for display. The full Board & Reputation System (Wave 2, Piece 6) will
 * extend `boardSystem` to actually move this score in response to results,
 * finance and decisions — it must extend this file, not fork a parallel one
 * (docs/ARCHITECTURE.md section 5).
 */
export type BoardConfidenceLevel = 'critical' | 'under_pressure' | 'stable' | 'strong';

export interface BoardConfidenceState {
  readonly score: number;
}

export interface BoardConfidenceSnapshot {
  readonly score: number;
  readonly level: BoardConfidenceLevel;
}
