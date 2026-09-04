/**
 * The canonical, ordered list of bottom-tab-bar destinations. Both the
 * reducer's `nav/setTab` contract and the UI's tab bar render from this one
 * list — see the anti-duplication rule in docs/ARCHITECTURE.md section 1.
 * Per-tab icon glyphs are a pure rendering detail and stay in `src/ui`.
 */
import type { TabId } from '@core/navigation';

export interface TabConfig {
  readonly id: TabId;
  readonly label: string;
}

export const TAB_ORDER: readonly TabConfig[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'club', label: 'Club' },
  { id: 'finance', label: 'Finance' },
  { id: 'league', label: 'League' },
  { id: 'association', label: 'Association' },
];
