import { useAppDispatch, useAppState } from '@app/appStore';
import { useTranslation } from '@app/i18n';
import type { Language, TranslationKey } from '@core/i18n';
import { LANGUAGES } from '@core/i18n';

const LABEL_KEY: Readonly<Record<Language, TranslationKey>> = {
  th: 'language.th',
  en: 'language.en',
};

/**
 * The Thai/English toggle (docs/ARCHITECTURE.md section 4). Each language's
 * name is always shown in its own script regardless of the active
 * language — the standard convention for a language switcher — so both
 * dictionaries define `language.th`/`language.en` with the same value;
 * this still goes through `t()` rather than a bare literal, same as every
 * other label here.
 */
export function LanguageToggle() {
  const { language } = useAppState();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className="fm-langtoggle" role="group" aria-label={t('language.toggleLabel')}>
      {LANGUAGES.map((lang) => {
        const isActive = lang === language;
        return (
          <button
            key={lang}
            type="button"
            className="fm-langtoggle__option"
            data-active={isActive}
            aria-pressed={isActive}
            data-testid={`lang-${lang}`}
            onClick={() => dispatch({ type: 'language/set', language: lang })}
          >
            {t(LABEL_KEY[lang])}
          </button>
        );
      })}
    </div>
  );
}
