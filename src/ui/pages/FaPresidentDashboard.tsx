import { useAppState } from '@app/appStore';
import { selectFaPresidentDashboard } from '@app/selectors';
import { useTranslation } from '@app/i18n';
import { Card, CardHeader } from '@ui/components/Card';
import { Pill } from '@ui/components/Pill';
import { ProgressBar } from '@ui/components/ProgressBar';
import { EmptyState } from '@ui/components/EmptyState';
import type { TranslationKey } from '@core/i18n';

const FOCUS_AREA_KEYS: readonly TranslationKey[] = [
  'fa.focus.nationalCompetitions',
  'fa.focus.nationalTeamPipeline',
  'fa.focus.refereeDevelopment',
  'fa.focus.footballInfrastructure',
];

/**
 * FA President home. Real (non-fabricated) content: real association
 * identity, the shared season calendar, and an honest labeled preview of
 * the governance areas Piece 12 (Wave 4) will build — no invented numbers.
 */
export function FaPresidentDashboard() {
  const state = useAppState();
  const { t } = useTranslation();
  const vm = selectFaPresidentDashboard(state);

  return (
    <div className="fm-page" data-testid="fa-president-dashboard">
      <Card className="fm-identity-card">
        <span className="fm-identity-card__crest fm-identity-card__crest--gold" aria-hidden="true">
          {vm.association.crestInitials}
        </span>
        <div>
          <h2 className="fm-identity-card__name">{vm.association.name}</h2>
          <p className="fm-identity-card__meta">{t('fa.officeOfPresident')}</p>
        </div>
      </Card>

      <Card>
        <CardHeader title={t('dashboard.season')} right={<Pill tone="gold">{vm.season.label}</Pill>} />
        <ProgressBar percent={vm.season.progressPct} tone="gold" label={t('dashboard.seasonProgressLabel')} />
        <p className="fm-season__progress-caption">
          {t('dashboard.seasonProgressCaption', { percent: vm.season.progressPct })}
        </p>
        <p className="fm-muted">{t('fa.seasonNote')}</p>
      </Card>

      <Card>
        <CardHeader title={t('fa.governanceFocusAreas')} />
        <ul className="fm-focus-list">
          {FOCUS_AREA_KEYS.map((key) => (
            <li key={key} className="fm-focus-list__item">
              <span>{t(key)}</span>
              <Pill tone="muted">{t('fa.planned')}</Pill>
            </li>
          ))}
        </ul>
      </Card>

      <EmptyState
        eyebrow={t('fa.emptyState.eyebrow')}
        title={t('fa.emptyState.title')}
        description={t('fa.emptyState.description')}
        meta={t('fa.emptyState.meta')}
      />
    </div>
  );
}
