'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Cal from '@calcom/embed-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Cal.com inline booking embed for the Contact page.
 *
 * Renders inside a dark container to prevent white flash during Cal.com load
 * (see RESEARCH.md Pitfall 3). Uses NEXT_PUBLIC_CAL_LINK env var or falls
 * back to "aceagency/consultatie".
 */
export function BookingSection(): React.JSX.Element {
  const t = useTranslations('contact.booking');
  const [isLoaded, setIsLoaded] = useState(false);

  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ?? 'aceagency/consultatie';

  return (
    <SectionWrapper theme="light" id="booking">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block font-subheading text-xs font-medium uppercase tracking-[0.2em] text-[#56151A]">
            {t('overline')}
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#262523] md:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#262523]/70">
            {t('description')}
          </p>
        </div>

        {/* Dark container prevents white flash while Cal.com loads */}
        <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-2xl bg-[#262523]"
          style={{ minHeight: '500px' }}
        >
          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D9D9D9]/20 border-t-[#D9D9D9]" />
                <span className="text-sm text-[#D9D9D9]/60">
                  {t('overline')}...
                </span>
              </div>
            </div>
          )}

          <Cal
            calLink={calLink}
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
            config={{
              theme: 'dark' as const,
              hideEventTypeDetails: 'false',
            }}
            calOrigin="https://cal.com"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
