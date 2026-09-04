import { EmptyState } from '@ui/components/EmptyState';

export function ClubPage() {
  return (
    <div className="fm-page fm-page--centered" data-testid="club-page">
      <EmptyState
        eyebrow="CLUB"
        title="Club Management"
        description="Manager oversight, transfers, sponsors, stadium and facility investment are coming in later pieces."
        meta="Planned for Wave 2–3"
      />
    </div>
  );
}
