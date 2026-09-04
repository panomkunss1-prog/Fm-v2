/**
 * A football club. Only public facts (name, city, league) — see the real
 * football data policy in docs/ARCHITECTURE.md section 3. No individual
 * people live on this type.
 */
export interface Club {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly league: string;
  readonly city: string;
  /** 2-3 letter crest monogram. Static reference data, not derived at render time. */
  readonly crestInitials: string;
}
