import { useTranslation } from '@app/i18n';
import { EmptyState } from '@ui/components/EmptyState';

export function AssociationPage() {
  const { t } = useTranslation();
  return (
    <div className="fm-page fm-page--centered" data-testid="association-page">
      <EmptyState
        eyebrow={t('association.eyebrow')}
        title={t('association.title')}
        description={t('association.description')}
        meta={t('association.emptyState.meta')}
      />
    </div>
  );
}
