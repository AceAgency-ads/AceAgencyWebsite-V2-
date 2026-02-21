'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Newsletter signup section — addifico style.
 * Light grey bg card (#EBEBEB), rounded-[36px], split layout:
 * heading left, description + form right.
 * Email input with border-bottom style, subscribe button with arrow.
 */
export function Newsletter(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="newsletter">
      {/* Light grey card container */}
      <div className="rounded-[36px] bg-[#EBEBEB] p-10 md:p-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Left: heading */}
          <div className="md:w-[40%]">
            <span
              className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#666666]"
            >
              {t('newsletter.overline')}
            </span>
            <h2 className="text-3xl font-bold text-[#262523] md:text-4xl">
              {t('newsletter.heading')}
            </h2>
          </div>

          {/* Right: description + form */}
          <div className="flex-1">
            <ScrollReveal>
              <p className="mb-6 text-[#262523]">
                {t('newsletter.description')}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Phase 5 wiring — server action will be connected here
                }}
                className="flex flex-col gap-5"
              >
                {/* Email input — border-bottom style */}
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="h-12 flex-1 border-b-2 border-[#262523]/30 bg-transparent px-1 text-[#262523] placeholder:text-[#666666] focus:border-[#262523] focus:outline-none"
                    aria-label={t('newsletter.placeholder')}
                  />
                  <button
                    type="submit"
                    className="flex h-12 items-center gap-2 rounded-full bg-[#56151A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7A2025]"
                  >
                    {t('newsletter.submit')}
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                {/* GDPR checkbox */}
                <label className="flex items-start gap-2 text-xs text-[#666666]">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#262523]/30 bg-transparent accent-[#56151A]"
                  />
                  <span>{t('newsletter.gdpr')}</span>
                </label>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
