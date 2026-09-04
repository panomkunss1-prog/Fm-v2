import { useAppState } from '@app/appStore';
import { DashboardPage } from '@ui/pages/DashboardPage';
import { ClubPage } from '@ui/pages/ClubPage';
import { FinancePage } from '@ui/pages/FinancePage';
import { LeaguePage } from '@ui/pages/LeaguePage';
import { AssociationPage } from '@ui/pages/AssociationPage';

/** Routes the active tab (already-known state) to its page component. */
export function TabPanel() {
  const { activeTab } = useAppState();
  switch (activeTab) {
    case 'dashboard':
      return <DashboardPage />;
    case 'club':
      return <ClubPage />;
    case 'finance':
      return <FinancePage />;
    case 'league':
      return <LeaguePage />;
    case 'association':
      return <AssociationPage />;
    default:
      return null;
  }
}
