import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Card({ children, className }: CardProps) {
  return <section className={className ? `fm-card ${className}` : 'fm-card'}>{children}</section>;
}

interface CardHeaderProps {
  readonly title: string;
  readonly right?: ReactNode;
}

export function CardHeader({ title, right }: CardHeaderProps) {
  return (
    <div className="fm-card__header">
      <h2 className="fm-card__title">{title}</h2>
      {right ? <div className="fm-card__header-right">{right}</div> : null}
    </div>
  );
}
