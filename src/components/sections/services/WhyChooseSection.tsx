'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CountUp } from '@/components/animations/CountUp';

const STAT_COUNT = 4;
const DIFFERENTIATOR_COUNT = 5;

/**
 * "De Ce Sa Ne Alegi" / "Why Choose Us" section for services index page.
 * Two-column layout: stats grid (left) + differentiators list (right).
 */
export function WhyChooseSection(): React.JSX.Element {
  const t = useTranslations('services');
  const diffRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!diffRef.current) return;

      const items = diffRef.current.querySelectorAll('[data-diff]');
      if (items.length === 0) return;

      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: diffRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === diffRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: diffRef }
  );

  return (
    <SectionWrapper theme="dark" id="why-choose-us">
      <SectionHeader
        overline={t('index.whyUs.overline')}
        heading={t('index.whyUs.heading')}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left column: 2x2 stat cards */}
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: STAT_COUNT }, (_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <CountUp
                end={Number(t(`index.whyUs.stats.${i}.value`))}
                suffix={t(`index.whyUs.stats.${i}.suffix`)}
                className="text-4xl font-bold text-[#56151A] md:text-5xl"
              />
              <p className="mt-2 text-sm text-[var(--section-text-muted)]">
                {t(`index.whyUs.stats.${i}.label`)}
              </p>
            </div>
          ))}
        </div>

        {/* Right column: differentiators list */}
        <div ref={diffRef} className="flex flex-col gap-6">
          {Array.from({ length: DIFFERENTIATOR_COUNT }, (_, i) => (
            <div key={i} data-diff className="flex items-start gap-4">
              <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#56151A]">
                <Check className="size-3.5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold">
                  {t(`index.whyUs.differentiators.${i}.title`)}
                </h3>
                <p className="mt-1 text-sm text-[var(--section-text-muted)]">
                  {t(`index.whyUs.differentiators.${i}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
