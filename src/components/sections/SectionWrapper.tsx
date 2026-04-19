import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

type SectionTheme = 'dark' | 'light' | 'light-warm' | 'light-muted' | 'accent' | 'violet';

interface SectionWrapperProps {
  readonly children: React.ReactNode;
  readonly theme: SectionTheme;
  readonly className?: string;
  readonly id?: string;
  /** Use larger padding for hero sections. Default: false */
  readonly hero?: boolean;
  /** Use tighter padding for compact layouts (e.g. growth funnel). Default: false */
  readonly compact?: boolean;
  /**
   * Wrap children in a rounded container that floats on the dark body.
   * Creates the addifico-style "floating panel" look. Default: true.
   */
  readonly rounded?: boolean;
  /** Ref forwarded to the underlying <section> element. */
  readonly ref?: React.Ref<HTMLElement>;
}

/**
 * Section wrapper with data-theme attribute for section-level theming.
 *
 * When `rounded` is true (default), the outer <section> gets the dark body
 * background and the section theme is applied to an inner rounded container.
 * This creates floating panels with the dark body peeking between sections.
 *
 * When `rounded` is false, the section behaves as before (edge-to-edge bg).
 */
export function SectionWrapper({
  children,
  theme,
  className,
  id,
  hero = false,
  compact = false,
  rounded = true,
  ref,
}: SectionWrapperProps): React.JSX.Element {
  const paddingClasses = hero
    ? 'py-20 md:py-32'
    : compact
      ? 'py-10 md:py-14'
      : 'py-20 md:py-28 lg:py-32';

  if (!rounded) {
    return (
      <section
        ref={ref}
        data-theme={theme}
        id={id}
        className={cn(
          'bg-[var(--section-bg)] text-[var(--section-text)]',
          paddingClasses,
          className
        )}
      >
        <Container>{children}</Container>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn('bg-[var(--color-black)] text-[var(--section-text)]', className)}
    >
      <Container>
        <div
          data-theme={theme}
          className={cn(
            'rounded-3xl bg-[var(--section-bg)] text-[var(--section-text)]',
            'px-6 md:px-10 lg:px-14',
            paddingClasses
          )}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
