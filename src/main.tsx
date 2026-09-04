import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ padding: 24, color: '#eef5ff', background: '#07111d', minHeight: '100vh' }}>
      Scaffold smoke test — replaced by the App Shell in Piece 1.
    </div>
  </StrictMode>,
);
