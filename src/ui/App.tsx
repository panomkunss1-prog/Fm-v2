import '@ui/theme/global.css';
import '@ui/shell/shell.css';
import '@ui/components/components.css';
import '@ui/pages/dashboard.css';

import { AppProvider } from '@app/AppProvider';
import { Shell } from '@ui/shell/Shell';

export function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
