import { useTranslation } from '@app/i18n';
import { EmptyState } from '@ui/components/EmptyState';

export function FinancePage() {
  const { t } = useTranslation();
  return (
    <div className="fm-page fm-page--centered" data-testid="finance-page">
      <EmptyState
        eyebrow={t('nav.finance')}
        title={t('dashboard.clubFinance')}
        description={t('finance.description')}
        meta={t('finance.emptyState.meta')}
      />
    </div>
  );
}
