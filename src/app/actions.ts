/**
 * Action dispatch: the only way `AppState` changes. "The player tapped a
 * role segment" or "the player tapped a tab" becomes an action here; UI
 * only ever dispatches, never mutates state itself
 * (docs/ARCHITECTURE.md section 1).
 */
import type { Role } from '@core/role';
import type { TabId } from '@core/navigation';
import type { AppState } from './state';

export type AppAction = { type: 'role/set'; role: Role } | { type: 'nav/setTab'; tab: TabId };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'role/set':
      return state.role === action.role ? state : { ...state, role: action.role };
    case 'nav/setTab':
      return state.activeTab === action.tab ? state : { ...state, activeTab: action.tab };
    default:
      return state;
  }
}
