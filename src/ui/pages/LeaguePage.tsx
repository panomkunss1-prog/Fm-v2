import { EmptyState } from '@ui/components/EmptyState';

export function LeaguePage() {
  return (
    <div className="fm-page fm-page--centered" data-testid="league-page">
      <EmptyState
        eyebrow="COMPETITION"
        title="Thai League 1"
        description="The full fixture list and league table are coming in a later piece."
        meta="Planned for Wave 2 — Piece 3"
      />
    </div>
  );
}
