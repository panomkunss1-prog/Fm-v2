import type { ReactNode } from 'react';
import type { StatusTone } from './tone';

interface PillProps {
  readonly children: ReactNode;
  readonly tone?: StatusTone;
}

export function Pill({ children, tone = 'muted' }: PillProps) {
  return (
    <span className="fm-pill" data-tone={tone}>
      {children}
    </span>
  );
}
