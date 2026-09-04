import { useAppState } from '@app/appStore';
import { Header } from './Header';
import { BottomTabBar } from './BottomTabBar';
import { TabPanel } from './TabPanel';

/** The mobile app shell: persistent header, scrollable content, bottom tab bar. */
export function Shell() {
  const { role } = useAppState();
  return (
    <div className="fm-shell" data-role={role}>
      <Header />
      <main className="fm-main">
        <TabPanel />
      </main>
      <BottomTabBar />
    </div>
  );
}
