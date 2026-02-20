'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Newsletter signup section with email form and GDPR checkbox.
 * UI only — form prevents default on submit. Server action wiring in Phase 5.
 * Dark theme, centered narrow layout.
 */
export function Newsletter(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="newsletter">
      <div className="mx-auto max-w-xl text-center">
        <SectionHeader
          overline={t('newsletter.overline')}
          heading={t('newsletter.heading')}
          description={t('newsletter.description')}
          align="center"
        />

        <ScrollReveal>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Phase 5 wiring — server action will be connected here
            }}
            className="mx-auto flex max-w-md flex-col gap-4"
          >
            {/* Email input + submit button row */}
            <div className="flex">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                required
                className="h-12 flex-1 rounded-l-md border border-[var(--section-border)] bg-[var(--section-card-bg)] px-4 text-sm text-[var(--section-text)] placeholder:text-[var(--section-text-muted)]/60 focus:outline-none focus:ring-1 focus:ring-burgundy"
                aria-label={t('newsletter.placeholder')}
              />
              <button
                type="submit"
                className="h-12 rounded-r-md bg-grey px-4 text-sm font-semibold text-[#262523] transition-all duration-200 hover:brightness-95"
              >
                {t('newsletter.submit')}
              </button>
            </div>

            {/* GDPR checkbox */}
            <label className="flex items-start justify-center gap-2 text-xs text-[var(--section-text-muted)]">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-grey/30 bg-transparent"
              />
              <span>{t('newsletter.gdpr')}</span>
            </label>
          </form>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
