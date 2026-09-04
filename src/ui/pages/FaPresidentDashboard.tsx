import { useAppState } from '@app/appStore';
import { selectFaPresidentDashboard } from '@app/selectors';
import { Card, CardHeader } from '@ui/components/Card';
import { Pill } from '@ui/components/Pill';
import { ProgressBar } from '@ui/components/ProgressBar';
import { EmptyState } from '@ui/components/EmptyState';

const FOCUS_AREAS: readonly string[] = [
  'National Competitions',
  'National Team Pipeline',
  'Referee Development',
  'Football Infrastructure',
];

/**
 * FA President home. Real (non-fabricated) content: real association
 * identity, the shared season calendar, and an honest labeled preview of
 * the governance areas Piece 12 (Wave 4) will build — no invented numbers.
 */
export function FaPresidentDashboard() {
  const state = useAppState();
  const vm = selectFaPresidentDashboard(state);

  return (
    <div className="fm-page" data-testid="fa-president-dashboard">
      <Card className="fm-identity-card">
        <span className="fm-identity-card__crest fm-identity-card__crest--gold" aria-hidden="true">
          FA
        </span>
        <div>
          <h2 className="fm-identity-card__name">Football Association of Thailand</h2>
          <p className="fm-identity-card__meta">Office of the President</p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Season" right={<Pill tone="gold">{vm.season.label}</Pill>} />
        <p className="fm-season__matchday">{vm.season.matchdayLabel}</p>
        <ProgressBar percent={vm.season.progressPct} tone="gold" label="Season progress" />
        <p className="fm-muted">National competition oversight follows the same league calendar.</p>
      </Card>

      <Card>
        <CardHeader title="Governance Focus Areas" />
        <ul className="fm-focus-list">
          {FOCUS_AREAS.map((area) => (
            <li key={area} className="fm-focus-list__item">
              <span>{area}</span>
              <Pill tone="muted">Planned</Pill>
            </li>
          ))}
        </ul>
      </Card>

      <EmptyState
        eyebrow="FOOTBALL ASSOCIATION PRESIDENT"
        title="President's command center"
        description="Full national oversight tools — competitions, referees, youth pipeline and infrastructure — arrive in a later piece."
        meta="Planned for Wave 4"
      />
    </div>
  );
}
