import { useAppState } from '@app/appStore';
import { selectHeaderViewModel } from '@app/selectors';
import { RoleSwitch } from './RoleSwitch';

/** Persistent header: current role framing + season/matchday context. */
export function Header() {
  const state = useAppState();
  const vm = selectHeaderViewModel(state);

  return (
    <header className="fm-header" data-testid="header">
      <p className="fm-header__eyebrow">{vm.eyebrow}</p>
      <h1 className="fm-header__title">{vm.title}</h1>
      <p className="fm-header__context">{vm.contextLine}</p>
      <RoleSwitch />
    </header>
  );
}
