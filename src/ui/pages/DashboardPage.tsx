import { useAppState } from '@app/appStore';
import { ChairmanDashboard } from './ChairmanDashboard';
import { FaPresidentDashboard } from './FaPresidentDashboard';

/** Dashboard is the one tab with real content in both roles (Piece 2). */
export function DashboardPage() {
  const { role } = useAppState();
  return role === 'chairman' ? <ChairmanDashboard /> : <FaPresidentDashboard />;
}
