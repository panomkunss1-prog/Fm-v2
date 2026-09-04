/**
 * Money value object. `amount` is a whole number of major currency units
 * (baht, not satang) — sufficient precision for club-balance display at this
 * stage; the authoritative Finance System (Wave 2, Piece 5) owns any ledger
 * arithmetic and may refine this if minor-unit precision becomes necessary.
 */
export type Currency = 'THB';

export interface Money {
  readonly amount: number;
  readonly currency: Currency;
}

export function money(amount: number, currency: Currency = 'THB'): Money {
  return { amount, currency };
}
