import { cn } from '@/lib/utils';
import type { CSSProperties, PropsWithChildren } from 'react';

interface MonoTagProps extends PropsWithChildren {
  variant?: 'solid' | 'ghost';
  className?: string;
  style?: CSSProperties;
}

export default function MonoTag({ children, variant = 'solid', className, style }: MonoTagProps) {
  return (
    <span className={cn(variant === 'solid' ? 'mono-tag' : 'mono-tag-ghost', className)} style={style}>
      {children}
    </span>
  );
}
