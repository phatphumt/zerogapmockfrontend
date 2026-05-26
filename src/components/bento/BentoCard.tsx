import type { CSSProperties, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps extends PropsWithChildren {
  variant?: 'cloud' | 'light' | 'dark' | 'midnight';
  span?: string;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'a' | 'button';
  href?: string;
  onClick?: () => void;
}

export default function BentoCard({
  variant = 'cloud',
  span,
  className,
  style,
  as = 'div',
  children,
  href,
  onClick,
}: BentoCardProps) {
  const surfaceClass =
    variant === 'cloud'
      ? 'bg-[var(--color-cloud-canvas)] text-[var(--color-carbon)] border-[var(--color-sage-mist)]'
      : variant === 'light'
        ? 'bg-[var(--color-light-gray)] text-[var(--color-carbon)] border-[var(--color-sage-mist)]'
        : variant === 'dark'
          ? 'bg-[var(--color-carbon)] text-[var(--color-polar-white)] border-[var(--color-fog)]'
          : 'bg-[var(--color-midnight-ink)] text-[var(--color-polar-white)] border-[var(--color-fog)]';

  const classes = cn(
    'rounded-[40px] border p-10 transition-colors',
    onClick || as === 'a' || as === 'button' ? 'cursor-pointer hover:border-[var(--color-bio-green)]' : '',
    surfaceClass,
    span,
    className,
  );

  if (as === 'a') {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }
  if (as === 'button') {
    return (
      <button type="button" onClick={onClick} className={classes} style={style}>
        {children}
      </button>
    );
  }
  return (
    <div className={classes} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
