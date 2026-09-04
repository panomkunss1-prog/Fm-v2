import { describe, it, expect } from 'vitest';
import { th } from '@data/translations/th';
import { en } from '@data/translations/en';
import { LANGUAGES } from '@core/i18n';

/**
 * docs/ARCHITECTURE.md section 4: "both files must define the exact same
 * set of keys; a key present in one language and missing in the other is a
 * bug (fail the build/tests on drift if practical)." `TranslationDictionary`
 * already makes this a `tsc` error (both dictionaries are typed as
 * `Record<TranslationKey, string>`, so a missing/extra key fails the
 * build) — this test is the explicit, independent runtime check on top of
 * that compile-time guarantee, so drift fails loudly here too.
 */
describe('data/translations key-set parity', () => {
  it('th.ts and en.ts define exactly the same set of keys', () => {
    const thKeys = Object.keys(th).sort();
    const enKeys = Object.keys(en).sort();

    const onlyInTh = thKeys.filter((k) => !enKeys.includes(k));
    const onlyInEn = enKeys.filter((k) => !thKeys.includes(k));

    expect(onlyInTh, 'keys present in th.ts but missing from en.ts').toEqual([]);
    expect(onlyInEn, 'keys present in en.ts but missing from th.ts').toEqual([]);
    expect(thKeys).toEqual(enKeys);
  });

  it('neither dictionary has a duplicate key', () => {
    expect(Object.keys(th).length).toBe(new Set(Object.keys(th)).size);
    expect(Object.keys(en).length).toBe(new Set(Object.keys(en)).size);
  });

  it('both dictionaries define at least one key (the drift check above is not vacuously true)', () => {
    expect(Object.keys(th).length).toBeGreaterThan(0);
    expect(Object.keys(en).length).toBeGreaterThan(0);
  });

  it('every value in both dictionaries is a non-empty string', () => {
    for (const [key, value] of Object.entries(th)) {
      expect(typeof value, `th['${key}']`).toBe('string');
      expect(value.length, `th['${key}'] should not be empty`).toBeGreaterThan(0);
    }
    for (const [key, value] of Object.entries(en)) {
      expect(typeof value, `en['${key}']`).toBe('string');
      expect(value.length, `en['${key}'] should not be empty`).toBeGreaterThan(0);
    }
  });

  it('LANGUAGES lists exactly th and en', () => {
    expect([...LANGUAGES].sort()).toEqual(['en', 'th']);
  });
});
