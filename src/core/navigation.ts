/**
 * The bottom tab bar's fixed set of primary destinations. This is pure
 * vocabulary shared by `app` (which owns the current-tab state) and `ui`
 * (which renders the tab bar and routes tab content) — see
 * docs/ARCHITECTURE.md section 1.
 */
export type TabId = 'dashboard' | 'club' | 'finance' | 'league' | 'association';
