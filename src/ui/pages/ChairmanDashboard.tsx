import { useAppState } from '@app/appStore';
import { selectChairmanDashboard } from '@app/selectors';
import { useTranslation } from '@app/i18n';
import { formatMoney, formatPercent } from '@core/format';
import { Card, CardHeader } from '@ui/components/Card';
import { Pill } from '@ui/components/Pill';
import { ProgressBar } from '@ui/components/ProgressBar';
import { BOARD_LEVEL_LABEL_KEY, FINANCE_HEALTH_LABEL_KEY } from '@ui/components/tone';

/** Chairman home: real club identity, season/matchday, next fixture, board + finance snapshots. */
export function ChairmanDashboard() {
  const state = useAppState();
  const { t } = useTranslation();
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

      <Card>
        <CardHeader title={t('dashboard.boardConfidence')} />
        <div className="fm-metric">
          <span className="fm-metric__value">{formatPercent(vm.board.score)}</span>
        </div>
        <Pill tone={vm.board.level}>{t(BOARD_LEVEL_LABEL_KEY[vm.board.level])}</Pill>
        <ProgressBar percent={vm.board.score} tone={vm.board.level} label={t('dashboard.boardConfidence')} />
      </Card>

      <Card data-testid="finance-card">
        <CardHeader title={t('dashboard.clubFinance')} />
        <div className="fm-metric">
          <span className="fm-metric__value fm-metric__value--money" data-testid="finance-balance">
            {formatMoney(vm.finance.balance)}
          </span>
        </div>
        <Pill tone={vm.finance.health}>{t(FINANCE_HEALTH_LABEL_KEY[vm.finance.health])}</Pill>
      </Card>

      <Card>
        <CardHeader
          title={t('dashboard.nextFixture')}
          right={fixture ? <Pill tone="muted">{t('dashboard.matchdayPill', { matchday: fixture.matchday })}</Pill> : undefined}
        />
        {fixture ? (
          <>
            <div className="fm-fixture">
              <div className="fm-fixture__team" data-mine={fixture.homeIsPlayerClub}>
                <span className="fm-fixture__tag">{t('dashboard.home')}</span>
                <strong>{fixture.homeName ?? t('common.tbd')}</strong>
              </div>
              <span className="fm-fixture__vs">{t('dashboard.vs')}</span>
              <div className="fm-fixture__team" data-mine={!fixture.homeIsPlayerClub}>
                <span className="fm-fixture__tag">{t('dashboard.away')}</span>
                <strong>{fixture.awayName ?? t('common.tbd')}</strong>
              </div>
            </div>
            <p className="fm-fixture__kickoff">{fixture.kickoffLabel}</p>
          </>
        ) : (
          <p className="fm-muted">{t('dashboard.noFixtureScheduled')}</p>
        )}
      </Card>

      <Card>
        <CardHeader title={t('dashboard.season')} right={<Pill tone="teal">{vm.season.label}</Pill>} />
        <ProgressBar percent={vm.season.progressPct} tone="teal" label={t('dashboard.seasonProgressLabel')} />
        <p className="fm-season__progress-caption">
          {t('dashboard.seasonProgressCaption', { percent: vm.season.progressPct })}
        </p>
      </Card>
    </div>
  );
}
