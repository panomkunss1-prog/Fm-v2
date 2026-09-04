import { EmptyState } from '@ui/components/EmptyState';

export function FinancePage() {
  return (
    <div className="fm-page fm-page--centered" data-testid="finance-page">
      <EmptyState
        eyebrow="FINANCE"
        title="Club Finance"
        description="The full income and expense ledger, budgets and sponsorship revenue are coming in a later piece."
        meta="Planned for Wave 2 — Piece 5"
      />
    </div>
  );
}
