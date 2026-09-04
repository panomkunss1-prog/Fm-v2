/**
 * The Football Association the player governs as FA President. Only a
 * public fact (its real name) — same real-football-data policy as `Club`
 * (see docs/ARCHITECTURE.md section 3). No individual people live on this
 * type. Its name is a domain proper noun and is never re-invented per
 * language (docs/ARCHITECTURE.md section 4).
 */
export interface Association {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  /** 2-3 letter crest monogram. Static reference data, not derived at render time (mirrors `Club.crestInitials`). */
  readonly crestInitials: string;
}
