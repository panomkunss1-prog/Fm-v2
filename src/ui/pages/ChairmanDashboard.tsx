import { useAppState } from '@app/appStore';
import { selectChairmanDashboard } from '@app/selectors';
import { formatMoney, formatPercent } from '@core/format';
import { Card, CardHeader } from '@ui/components/Card';
import { Pill } from '@ui/components/Pill';
import { ProgressBar } from '@ui/components/ProgressBar';

/** Chairman home: real club identity, season/matchday, next fixture, board + finance snapshots. */
export function ChairmanDashboard() {
  const state = useAppState();
  const vm = selectChairmanDashboard(state);
  const fixture = vm.nextFixture;

  return (
    <div className="fm-page" data-testid="chairman-dashboard">
      <Card className="fm-identity-card">
        <span className="fm-identity-card__crest" aria-hidden="true">
          {vm.club.crestInitials}
        </span>
        <div>
          <h2 className="fm-identity-card__name">{vm.club.name}</h2>
          <p className="fm-identity-card__meta">
            {vm.club.city} · {vm.club.league}
          </p>
        </div>
      </Card>

      <div className="fm-grid-2">
        <Card>
          <CardHeader title="Board Confidence" />
          <div className="fm-metric">
            <span className="fm-metric__value">{formatPercent(vm.board.score)}</span>
          </div>
          <Pill tone={vm.board.level}>{vm.board.label}</Pill>
          <ProgressBar percent={vm.board.score} tone={vm.board.level} label="Board confidence" />
        </Card>

        <Card>
          <CardHeader title="Club Finance" />
          <div className="fm-metric">
            <span className="fm-metric__value fm-metric__value--money">{formatMoney(vm.finance.balance)}</span>
          </div>
          <Pill tone={vm.finance.health}>{vm.finance.label}</Pill>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Next Fixture"
          right={fixture ? <Pill tone="muted">{fixture.matchdayLabel}</Pill> : undefined}
        />
        {fixture ? (
          <>
            <div className="fm-fixture">
              <div className="fm-fixture__team" data-mine={fixture.homeIsPlayerClub}>
                <span className="fm-fixture__tag">Home</span>
                <strong>{fixture.homeName}</strong>
              </div>
              <span className="fm-fixture__vs">vs</span>
              <div className="fm-fixture__team" data-mine={!fixture.homeIsPlayerClub}>
                <span className="fm-fixture__tag">Away</span>
                <strong>{fixture.awayName}</strong>
              </div>
            </div>
            <p className="fm-fixture__kickoff">{fixture.kickoffLabel}</p>
          </>
        ) : (
          <p className="fm-muted">No fixture scheduled.</p>
        )}
      </Card>

      <Card>
        <CardHeader title="Season" right={<Pill tone="teal">{vm.season.label}</Pill>} />
        <p className="fm-season__matchday">{vm.season.matchdayLabel}</p>
        <ProgressBar percent={vm.season.progressPct} tone="teal" label="Season progress" />
      </Card>
    </div>
  );
}
