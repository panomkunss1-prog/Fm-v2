/**
 * React binding for the game state store. Purely mechanical wiring (no
 * markup, no business logic) — the store itself (`appReducer`,
 * `initialAppState`) is plain, framework-free TypeScript in `state.ts`/
 * `actions.ts`; this file only exposes it to the component tree.
 */
import { useReducer, type ReactNode } from 'react';
import { appReducer } from './actions';
import { initialAppState } from './state';
import { AppContext } from './appStore';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
