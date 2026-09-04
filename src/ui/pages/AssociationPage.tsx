import { EmptyState } from '@ui/components/EmptyState';

export function AssociationPage() {
  return (
    <div className="fm-page fm-page--centered" data-testid="association-page">
      <EmptyState
        eyebrow="GOVERNANCE"
        title="Football Association"
        description="National competitions, referee development and youth-pipeline oversight are coming in a later piece."
        meta="Planned for Wave 4 — Piece 12"
      />
    </div>
  );
}
