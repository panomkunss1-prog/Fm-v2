import { useAppState } from '@app/appStore';
import { selectHeaderViewModel } from '@app/selectors';
import { useTranslation } from '@app/i18n';
import { LanguageToggle } from './LanguageToggle';

/**
 * Persistent header: current role framing + season/matchday context + the
 * language toggle. The role switch itself lives lower on screen, in the
 * thumb-reachable zone above the tab bar (see `Shell.tsx`) — this control
 * is secondary/low-frequency by comparison, so the header (matching the
 * original prototype's placement) is a reasonable spot for it
 * (docs/ARCHITECTURE.md section 4).
 */
export function Header() {
  const state = useAppState();
  const { t } = useTranslation();
  const vm = selectHeaderViewModel(state);
  const title = vm.role === 'chairman' ? vm.clubName : t('header.faPresidentTitle');
  const contextLine = t('dashboard.seasonContext', {
    season: vm.season.label,
    matchday: vm.season.matchday,
    total: vm.season.totalMatchdays,
  });

  return (
    <header className="fm-header" data-testid="header">
      <div className="fm-header__top">
        <p className="fm-header__eyebrow">{vm.eyebrow}</p>
        <LanguageToggle />
      </div>
      <h1 className="fm-header__title">{title}</h1>
      <p className="fm-header__context">{contextLine}</p>
    </header>
  );
}
