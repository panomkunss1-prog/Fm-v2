/**
 * Hand-rolled inline SVG icon set for the bottom tab bar. Kept dependency
 * free (no icon font/library) to avoid shipping unused JS.
 */
import type { TabId } from '@core/navigation';

interface TabIconProps {
  readonly tab: TabId;
}

export function TabIcon({ tab }: TabIconProps) {
  switch (tab) {
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path
            d="M4 11.5 12 5l8 6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 10.3V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'club':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path
            d="M12 3.4 19 6v5.3c0 4.3-3 7.5-7 9.3-4-1.8-7-5-7-9.3V6l7-2.6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 12.1l2 2 4.2-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'finance':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 7.8v8.4M9.8 15c.4.8 1.2 1.4 2.2 1.4 1.4 0 2.5-.8 2.5-2 0-1.1-.9-1.6-2.5-2-1.5-.4-2.5-.9-2.5-2 0-1.2 1.1-2 2.5-2 1 0 1.8.5 2.2 1.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'league':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M7 4h10v4.3c0 2.9-2.2 5.2-5 5.2s-5-2.3-5-5.2V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M7 5.2H5c-.5 0-.9.4-.9 1 0 1.9 1.4 3.4 3.3 3.6M17 5.2h2c.5 0 .9.4.9 1 0 1.9-1.4 3.4-3.3 3.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M12 13.5V17M9.2 20h5.6M10.3 17h3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'association':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.3 12h15.4M12 4c1.9 2.2 2.9 5 2.9 8s-1 5.8-2.9 8c-1.9-2.2-2.9-5-2.9-8s1-5.8 2.9-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
