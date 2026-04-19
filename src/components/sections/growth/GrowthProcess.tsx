'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

/**
 * 3-step numbered process section with connecting dots/line.
 * Vertical layout on mobile, horizontal on desktop.
 * Dark luxury design with gradient numbers and shine CTA.
 */
export function GrowthProcess(): React.JSX.Element {
  const t = useTranslations('growth');

  const rawSteps = t.raw('process.steps') as Record<string, ProcessStep>;
  const steps = Object.keys(rawSteps)
    .sort()
    .map((key) => rawSteps[key]!);

  const handleScrollToCTA = (): void => {
    const el = document.getElementById('audit-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper theme="dark" id="process" compact>
      <SectionHeader
        overline={t('process.overline')}
        heading={t('process.heading')}
        description={t('process.description')}
      />

      <div className="relative grid grid-cols-1 gap-0 md:grid-cols-3">
        {/* Connecting dashed line on desktop */}
        <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px md:block">
          <div className="mx-20 border-t-2 border-dashed border-[#650CBE]/30" />
        </div>

        {steps.map((step, index) => (
          <ScrollReveal key={index}>
            <div
              className={
                'group relative px-6 py-8 transition-all duration-300 md:px-8 md:py-6' +
                /* Mobile: border-top on all except first */
                (index > 0 ? ' border-t border-[var(--section-border)] md:border-t-0' : '') +
                /* Desktop: border-left on all except first */
                (index > 0 ? ' md:border-l md:border-[var(--section-border)]' : '')
              }
            >
              {/* Hover left accent bar */}
              <div className="absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-gradient-to-b from-[#650CBE] to-[#66F3A6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Connecting dot on desktop */}
              {index > 0 && (
                <div className="absolute -left-1.5 top-[48px] hidden size-3 rounded-full border-2 border-[#650CBE] bg-[#262523] md:block" />
              )}

              <span className="mb-4 block bg-gradient-to-br from-[#650CBE] to-[#66F3A6] bg-clip-text font-[family-name:var(--font-glacial)] text-5xl font-bold text-transparent md:text-6xl">
                {step.number}
              </span>
              <h3 className="mb-2 font-[family-name:var(--font-red-hat)] text-xl font-semibold text-[var(--section-text)]">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-[var(--section-text-muted)]">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-12 text-center">
        <button
          type="button"
          onClick={handleScrollToCTA}
          className="inline-flex items-center justify-center rounded-full bg-[#650CBE] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span className="relative overflow-hidden">
            {t('process.cta')}
            <span className="absolute inset-0 -translate-x-full animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </span>
        </button>
      </ScrollReveal>
    </SectionWrapper>
  );
}
