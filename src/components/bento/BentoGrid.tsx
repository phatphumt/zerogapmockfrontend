import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export default function BentoGrid({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'grid gap-5 md:gap-6',
        'grid-cols-1 md:grid-cols-6 lg:grid-cols-12',
        className,
      )}
    >
      {children}
    </div>
  );
}
