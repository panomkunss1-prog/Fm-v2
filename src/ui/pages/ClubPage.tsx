import { useTranslation } from '@app/i18n';
import { EmptyState } from '@ui/components/EmptyState';

export function ClubPage() {
  const { t } = useTranslation();
  return (
    <div className="fm-page fm-page--centered" data-testid="club-page">
      <EmptyState
        eyebrow={t('nav.club')}
        title={t('club.title')}
        description={t('club.description')}
        meta={t('club.emptyState.meta')}
      />
    </div>
  );
}
