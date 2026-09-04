/**
 * The canonical, ordered list of bottom-tab-bar destinations. Both the
 * reducer's `nav/setTab` contract and the UI's tab bar render from this one
 * list — see the anti-duplication rule in docs/ARCHITECTURE.md section 1.
 * Per-tab icon glyphs are a pure rendering detail and stay in `src/ui`.
 * `labelKey` (not a literal string) so the tab bar renders through the i18n
 * system per docs/ARCHITECTURE.md section 4 — no hardcoded UI strings here.
 */
import type { TabId } from '@core/navigation';
import type { TranslationKey } from '@core/i18n';

export interface TabConfig {
  readonly id: TabId;
  readonly labelKey: TranslationKey;
}

export const TAB_ORDER: readonly TabConfig[] = [
  { id: 'dashboard', labelKey: 'nav.dashboard' },
  { id: 'club', labelKey: 'nav.club' },
  { id: 'finance', labelKey: 'nav.finance' },
  { id: 'league', labelKey: 'nav.league' },
  { id: 'association', labelKey: 'nav.association' },
];
