import { Pill } from './Pill';

interface EmptyStateProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly meta?: string;
}

/**
 * The honest "not built yet" state for any tab/screen without a real
 * system behind it yet. Never pair this with fabricated numbers — see the
 * data policy in docs/ARCHITECTURE.md section 3.
 */
export function EmptyState({ eyebrow, title, description, meta }: EmptyStateProps) {
  return (
    <div className="fm-empty">
      <span className="fm-empty__mark" aria-hidden="true" />
      <Pill tone="muted">Not built yet</Pill>
      <p className="fm-empty__eyebrow">{eyebrow}</p>
      <h2 className="fm-empty__title">{title}</h2>
      <p className="fm-empty__description">{description}</p>
      {meta ? <p className="fm-empty__meta">{meta}</p> : null}
    </div>
  );
}
