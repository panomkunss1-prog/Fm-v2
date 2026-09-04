import { useEffect } from 'react';
import { useAppState } from '@app/appStore';
import { Header } from './Header';
import { RoleSwitch } from './RoleSwitch';
import { BottomTabBar } from './BottomTabBar';
import { TabPanel } from './TabPanel';

/**
 * The mobile app shell: persistent header, scrollable content, a
 * thumb-reachable role-switch bar, and the bottom tab bar.
 *
 * The role switch — arguably the single most important control for this
 * game's whole premise (Chairman <-> FA President) — is deliberately
 * pinned here, directly above the tab bar, rather than in the top-pinned
 * header: `.fm-header` never scrolls out of the top third of the screen
 * (see shell.css), so a control living there can never be one-handed
 * thumb-reachable no matter how the page is scrolled. Anchoring it in this
 * bottom strip instead puts it in the reachable bottom two-thirds
 * (docs/ARCHITECTURE.md section 5), always visible, exactly like today.
 */
export function Shell() {
  const { role, language } = useAppState();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="fm-shell" data-role={role}>
      <Header />
      <main className="fm-main">
        <TabPanel />
      </main>
      <div className="fm-rolebar">
        <RoleSwitch />
      </div>
      <BottomTabBar />
    </div>
  );
}
