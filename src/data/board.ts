/**
 * Seed board confidence. A fixed starting score for a new game — the Board
 * & Reputation System (Wave 2, Piece 6) will make this move over time.
 */
import type { BoardConfidenceState } from '@core/board';

export const SEED_BOARD: BoardConfidenceState = {
  score: 64,
};
