/**
 * Season/matchday progress. `totalMatchdays` is the number of rounds in a
 * full double round-robin among the league's clubs (a fact about the
 * competition's shape, not a computed value, so it lives here as data
 * rather than being derived in Systems).
 */
export interface SeasonState {
  readonly label: string;
  readonly matchday: number;
  readonly totalMatchdays: number;
}
