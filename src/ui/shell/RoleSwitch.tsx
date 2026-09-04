import { useAppDispatch, useAppState } from '@app/appStore';
import type { Role } from '@core/role';

const OPTIONS: ReadonlyArray<{ readonly role: Role; readonly label: string }> = [
  { role: 'chairman', label: 'Chairman' },
  { role: 'fa_president', label: 'FA President' },
];

/** The clearly-visible Chairman <-> FA President switch. */
export function RoleSwitch() {
  const { role } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div className="fm-roleswitch" role="group" aria-label="Player role">
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
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
