import { describe, it, expect } from 'vitest';
import { appReducer } from '@app/actions';
import { initialAppState } from '@app/state';

describe('app/actions.appReducer', () => {
  it('starts in the chairman role, Thai language, on the dashboard tab', () => {
    expect(initialAppState.role).toBe('chairman');
    expect(initialAppState.language).toBe('th');
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

  it('language/set switches the active language', () => {
    const next = appReducer(initialAppState, { type: 'language/set', language: 'en' });
    expect(next.language).toBe('en');
  });

  it('language/set is a no-op (same reference) when already in that language', () => {
    const next = appReducer(initialAppState, { type: 'language/set', language: 'th' });
    expect(next).toBe(initialAppState);
  });

  it('language/set does not touch role, activeTab, or any other field', () => {
    const next = appReducer(initialAppState, { type: 'language/set', language: 'en' });
    expect(next.role).toBe(initialAppState.role);
    expect(next.activeTab).toBe(initialAppState.activeTab);
    expect(next.club).toBe(initialAppState.club);
  });

  it('does not mutate the previous state object', () => {
    const before = { ...initialAppState };
    appReducer(initialAppState, { type: 'nav/setTab', tab: 'club' });
    expect(initialAppState).toEqual(before);
  });
});
