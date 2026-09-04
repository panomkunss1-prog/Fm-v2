import { useAppDispatch, useAppState } from '@app/appStore';
import { TAB_ORDER } from '@app/navigation';
import { useTranslation } from '@app/i18n';
import { TabIcon } from './icons';

/** iOS-native bottom tab bar. Every item is a full-height, flex-grown touch target. */
export function BottomTabBar() {
  const { activeTab } = useAppState();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <nav className="fm-tabbar" aria-label={t('nav.primaryLabel')}>
      {TAB_ORDER.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className="fm-tabbar__item"
            data-active={isActive}
            aria-current={isActive ? 'page' : undefined}
            data-testid={`tab-${tab.id}`}
            onClick={() => dispatch({ type: 'nav/setTab', tab: tab.id })}
          >
            <TabIcon tab={tab.id} />
            <span className="fm-tabbar__label">{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
