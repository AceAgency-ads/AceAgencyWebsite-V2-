import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricStatProps {
  value: ReactNode;
  label: ReactNode;
  /** Sub-label rendered below the main label, smaller. e.g. "Cazul ITMAR · iulie 2024" */
  context?: ReactNode;
  className?: string;
  /**
   * On dark background, uses bright burgundy #C4394A for legibility.
   * On light background, uses primary burgundy #56151A.
   */
  dark?: boolean;
  /** Alignment of the stat block. Defaults to left. */
  align?: 'left' | 'center';
  /** Size variant. lg = hero (60px), md = card (40px), sm = inline (28px). */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Single statistic display. Large burgundy number + uppercase muted label.
 * Used in hero stats, proof-stat strip, case-study tiles, and inside
 * testimonial quotes.
 */
export function MetricStat({
  value,
  label,
  context,
  className,
  dark,
  align = 'left',
  size = 'md',
}: MetricStatProps): React.JSX.Element {
  const valueSize =
    size === 'lg'
      ? 'text-[44px] sm:text-[60px]'
      : size === 'sm'
        ? 'text-[26px] sm:text-[28px]'
        : 'text-[34px] sm:text-[40px]';

  const valueColor = dark ? 'text-[#C4394A]' : 'text-[#56151A]';
  const labelColor = dark ? 'text-[#D9D9D9]' : 'text-[#71706E]';
  const contextColor = dark ? 'text-[#a0a0a0]' : 'text-[#71706E]';

  return (
    <div
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      <div
        className={cn(
          'font-heading font-bold leading-[0.95] tracking-tight',
          valueSize,
          valueColor,
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'mt-2 font-body text-[12px] font-semibold uppercase tracking-[0.16em]',
          labelColor,
        )}
      >
        {label}
      </div>
      {context ? (
        <div
          className={cn(
            'mt-1 font-body text-[11px] tracking-wide',
            contextColor,
          )}
        >
          {context}
        </div>
      ) : null}
    </div>
  );
}
