/**
 * i18n wiring: resolves the active language (App-layer state, same pattern
 * as the Chairman/FA-President role — see `state.ts`) against the
 * translation dictionaries in `src/data/translations`
 * (docs/ARCHITECTURE.md section 4). `src/ui/` components call the
 * `useTranslation()` hook here and render its result; they never hold
 * their own copy of any string.
 */
import type { Language, TranslationKey } from '@core/i18n';
import { th } from '@data/translations/th';
import { en } from '@data/translations/en';
import { useAppState } from './appStore';

const DICTIONARIES: Readonly<Record<Language, Readonly<Record<TranslationKey, string>>>> = {
  th,
  en,
};

export type TranslateParams = Readonly<Record<string, string | number>>;

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  );
}

/** Plain (non-hook) lookup — for anywhere a component isn't available to call the hook. */
export function translate(language: Language, key: TranslationKey, params?: TranslateParams): string {
  return interpolate(DICTIONARIES[language][key], params);
}

export interface UseTranslationResult {
  readonly language: Language;
  readonly t: (key: TranslationKey, params?: TranslateParams) => string;
}

export function useTranslation(): UseTranslationResult {
  const { language } = useAppState();
  return {
    language,
    t: (key, params) => translate(language, key, params),
  };
}
