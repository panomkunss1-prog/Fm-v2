/**
 * The React Context object plus its read hooks. Split from AppProvider.tsx
 * (which owns the reducer wiring) purely so each file exports a single kind
 * of thing for Fast Refresh — no behavior difference.
 */
import { createContext, useContext, type Dispatch } from 'react';
import type { AppAction } from './actions';
import type { AppState } from './state';

export interface AppContextValue {
  readonly state: AppState;
  readonly dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState/useAppDispatch must be used within an AppProvider');
  return ctx;
}

export function useAppState(): AppState {
  return useAppContext().state;
}

export function useAppDispatch(): Dispatch<AppAction> {
  return useAppContext().dispatch;
}
