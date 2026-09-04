import { describe, it, expect } from 'vitest';
import { appReducer } from '@app/actions';
import { initialAppState } from '@app/state';

describe('app/actions.appReducer', () => {
  it('starts in the chairman role on the dashboard tab', () => {
    expect(initialAppState.role).toBe('chairman');
    expect(initialAppState.activeTab).toBe('dashboard');
  });

  it('role/set switches the active role', () => {
    const next = appReducer(initialAppState, { type: 'role/set', role: 'fa_president' });
    expect(next.role).toBe('fa_president');
  });

  it('role/set is a no-op (same reference) when already in that role', () => {
    const next = appReducer(initialAppState, { type: 'role/set', role: 'chairman' });
    expect(next).toBe(initialAppState);
  });

  it('nav/setTab changes the active tab without touching role', () => {
    const next = appReducer(initialAppState, { type: 'nav/setTab', tab: 'finance' });
    expect(next.activeTab).toBe('finance');
    expect(next.role).toBe(initialAppState.role);
  });

  it('does not mutate the previous state object', () => {
    const before = { ...initialAppState };
    appReducer(initialAppState, { type: 'nav/setTab', tab: 'club' });
    expect(initialAppState).toEqual(before);
  });
});
