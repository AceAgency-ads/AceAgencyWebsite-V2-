import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OverlineProps {
  children: ReactNode;
  className?: string;
  /**
   * `dark` = on dark background (returns warm-grey #D9D9D9).
   * Defaults to muted on light background (#71706E).
   */
  dark?: boolean;
  as?: 'div' | 'span' | 'p';
}

/**
 * Micro-label uppercase eyebrow. Inter 12px, 0.18em tracking.
 * Used above hero h1 and above section headers ("AGENȚIE DE PERFORMANCE
 * MARKETING · BUCUREȘTI", "PROCES", "REZULTATE").
 */
export function Overline({
  children,
  className,
  dark,
  as: Tag = 'div',
}: OverlineProps): React.JSX.Element {
  return (
    <Tag
      className={cn(
        'font-body text-[12px] font-semibold uppercase leading-tight tracking-[0.18em]',
        dark ? 'text-[#D9D9D9]' : 'text-[#71706E]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
