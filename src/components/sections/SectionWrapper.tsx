import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

type SectionTheme = 'dark' | 'light' | 'light-muted' | 'burgundy';

interface SectionWrapperProps {
  readonly children: React.ReactNode;
  readonly theme: SectionTheme;
  readonly className?: string;
  readonly id?: string;
  /** Use larger padding for hero sections. Default: false */
  readonly hero?: boolean;
}

/**
 * Section wrapper with data-theme attribute for section-level theming.
 * Background and text colors are driven by [data-theme] CSS selectors
 * in design-system/tokens.css — no inline color styles needed.
 */
export function SectionWrapper({
  children,
  theme,
  className,
  id,
  hero = false,
}: SectionWrapperProps): React.JSX.Element {
  return (
    <section
      data-theme={theme}
      id={id}
      className={cn(
        'bg-[var(--section-bg)] text-[var(--section-text)]',
        hero ? 'py-20 md:py-32' : 'py-16 md:py-20 lg:py-24',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
