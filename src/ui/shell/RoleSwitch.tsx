import { useAppDispatch, useAppState } from '@app/appStore';
import { useTranslation } from '@app/i18n';
import type { Role } from '@core/role';
import type { TranslationKey } from '@core/i18n';

const OPTIONS: ReadonlyArray<{ readonly role: Role; readonly labelKey: TranslationKey }> = [
  { role: 'chairman', labelKey: 'role.chairman' },
  { role: 'fa_president', labelKey: 'role.faPresident' },
];

/** The clearly-visible Chairman <-> FA President switch. */
export function RoleSwitch() {
  const { role } = useAppState();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className="fm-roleswitch" role="group" aria-label={t('role.groupLabel')}>
      {OPTIONS.map((option) => {
        const isActive = option.role === role;
        return (
          <button
            key={option.role}
            type="button"
            className="fm-roleswitch__option"
            data-active={isActive}
            aria-pressed={isActive}
            data-testid={`role-${option.role}`}
            onClick={() => dispatch({ type: 'role/set', role: option.role })}
          >
            {t(option.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
