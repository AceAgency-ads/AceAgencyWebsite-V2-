'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Premium guarantee card section with violet glow border.
 * Centered layout inspired by vladpuscas.ro guarantee badge.
 */
export function GrowthGuarantee(): React.JSX.Element {
  const t = useTranslations('growth');

  const handleScrollToCTA = (): void => {
    const el = document.getElementById('audit-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper theme="dark" id="guarantee" compact rounded={false}>
      {/* Subtle radial violet glow background */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(101, 12, 190, 0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <ScrollReveal className="w-full max-w-2xl">
            {/* Guarantee card with violet gradient border glow */}
            <div
              className="rounded-2xl border border-[#650CBE]/40 bg-[#1a1917] p-8 text-center md:p-12"
              style={{
                boxShadow: '0 0 40px rgba(101, 12, 190, 0.2)',
              }}
            >
              {/* Shield icon */}
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[#650CBE]/10 p-4">
                <ShieldCheck className="h-10 w-10 text-[#66F3A6]" strokeWidth={1.5} />
              </div>

              {/* Overline */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#66F3A6]">
                {t('guarantee.overline')}
              </p>

              {/* Heading */}
              <h2 className="mb-4 font-[family-name:var(--font-glacial)] text-3xl font-bold text-white md:text-4xl">
                {t('guarantee.heading')}
              </h2>

              {/* Description */}
              <p className="mx-auto mb-6 max-w-lg text-base leading-relaxed text-[#D9D9D9]">
                {t('guarantee.description')}
              </p>

              {/* Trust reinforcement */}
              <p className="mb-8 text-sm font-medium text-white/70">
                {t('guarantee.reinforcement')}
              </p>

              {/* CTA button */}
              <button
                type="button"
                onClick={handleScrollToCTA}
                className="inline-flex items-center justify-center rounded-full bg-[#650CBE] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t('guarantee.cta')}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
