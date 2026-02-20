import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

type HeadingTag = 'h1' | 'h2' | 'h3';

interface SectionHeaderProps {
  readonly overline?: string;
  readonly heading: string;
  readonly description?: string;
  readonly align?: 'left' | 'center';
  readonly className?: string;
  readonly headingAs?: HeadingTag;
}

/**
 * Reusable section header with overline + heading + description pattern.
 * Wrapped in ScrollReveal for scroll-triggered fade-up animation.
 * Uses section-level CSS custom properties from data-theme.
 */
export function SectionHeader({
  overline,
  heading,
  description,
  align = 'left',
  className,
  headingAs: HeadingTag = 'h2',
}: SectionHeaderProps): React.JSX.Element {
  return (
    <ScrollReveal
      className={cn(
        'mb-10 md:mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {overline && (
        <span
          className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {overline}
        </span>
      )}
      <HeadingTag className="text-3xl font-bold md:text-4xl lg:text-5xl">
        {heading}
      </HeadingTag>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-[var(--section-text-muted)]">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
