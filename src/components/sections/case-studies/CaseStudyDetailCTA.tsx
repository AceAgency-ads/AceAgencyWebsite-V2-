import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Case study detail CTA section.
 * Accent theme. Heading + description + 2 buttons (primary to /contact, secondary outlined).
 */
export function CaseStudyDetailCTA(): React.JSX.Element {
  const t = useTranslations('caseStudies.detail');

  return (
    <SectionWrapper theme="accent" rounded={false}>
      <ScrollReveal className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold text-[var(--section-text)] md:text-4xl">
          {t('ctaHeading')}
        </h2>
        <p className="max-w-xl text-lg text-[var(--section-text-muted)]">
          {t('ctaDescription')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--section-text)] px-6 py-3 text-sm font-semibold text-[var(--section-bg)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-text)]"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--section-text)] px-6 py-3 text-sm font-semibold text-[var(--section-text)] transition-colors hover:bg-[var(--section-text)] hover:text-[var(--section-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-text)]"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
