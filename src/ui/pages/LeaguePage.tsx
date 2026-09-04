import { useAppState } from '@app/appStore';
import { useTranslation } from '@app/i18n';
import { EmptyState } from '@ui/components/EmptyState';

export function LeaguePage() {
  const { club } = useAppState();
  const { t } = useTranslation();
  return (
    <div className="fm-page fm-page--centered" data-testid="league-page">
      <EmptyState
        eyebrow={t('league.eyebrow')}
        title={club.league}
        description={t('league.description')}
        meta={t('league.emptyState.meta')}
      />
    </div>
  );
}
