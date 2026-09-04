import type { StatusTone } from './tone';

interface ProgressBarProps {
  /** Already-computed 0-100 value from Systems — this component only renders it. */
  readonly percent: number;
  readonly tone?: StatusTone;
  readonly label: string;
}

export function ProgressBar({ percent, tone = 'teal', label }: ProgressBarProps) {
  return (
    <div
      className="fm-progress"
      data-tone={tone}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="fm-progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
