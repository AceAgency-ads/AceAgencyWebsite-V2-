import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface BurgundyGlowProps {
  className?: string;
  style?: CSSProperties;
  size?: number;
  variant?: 'primary' | 'bright';
}

/**
 * Decorative radial gradient halo. Position with absolute + style props
 * (top/left/right/bottom). Inert: pointer-events disabled, hidden from a11y tree.
 *
 * primary  — burgundy #56151A glow, used on dark hero backgrounds
 * bright   — burgundy #C4394A glow, used over deep-black sections for more presence
 */
export function BurgundyGlow({
  className,
  style,
  size = 800,
  variant = 'primary',
}: BurgundyGlowProps): React.JSX.Element {
  const gradient =
    variant === 'bright'
      ? 'radial-gradient(circle, rgba(196,57,74,0.35), transparent 65%)'
      : 'radial-gradient(circle, rgba(86,21,26,0.40), transparent 65%)';

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
      style={{
        width: size,
        height: size,
        background: gradient,
        ...style,
      }}
    />
  );
}
