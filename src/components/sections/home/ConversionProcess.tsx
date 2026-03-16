'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Search,
  Target,
  Rocket,
  RefreshCw,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

const STEP_ICONS: readonly LucideIcon[] = [
  Search,
  Target,
  Rocket,
  RefreshCw,
  TrendingUp,
] as const;

/**
 * 5-step conversion methodology section for the homepage.
 * Showcases the systematic process: Audit → Strategy → Implementation → Optimization → Scaling.
 */
export function ConversionProcess(): React.JSX.Element {
  const t = useTranslations('home.conversionProcess');
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll('[data-step]');
      if (steps.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(steps, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        return () => {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === stepsRef.current)
            .forEach((st) => st.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(steps, { opacity: 1, y: 0 });
      });
    },
    { scope: stepsRef }
  );

  return (
    <SectionWrapper theme="dark" id="conversion-process">
      <SectionHeader
        overline={t('overline')}
        heading={t('heading')}
        description={t('description')}
      />

      <div
        ref={stepsRef}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5"
      >
        {STEP_ICONS.map((Icon, index) => (
          <div
            key={index}
            data-step
            className="group relative flex flex-col items-start gap-4 pl-8 sm:pl-0"
          >
            {/* Vertical connector on mobile */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute left-3 top-16 h-full w-px border-l border-dashed border-[var(--section-text-muted)]/30 sm:hidden"
                aria-hidden="true"
              />
            )}

            {/* Horizontal connector on desktop */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute right-0 top-8 hidden h-px border-t border-dashed border-[var(--section-text-muted)]/30 lg:block"
                style={{ left: '60%', width: '80%' }}
                aria-hidden="true"
              />
            )}

            {/* Large decorative number */}
            <span className="text-6xl font-bold text-[#650CBE]/20 transition-opacity duration-300 group-hover:text-[#650CBE]/40">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <Icon
              className="size-8 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[#650CBE]"
              strokeWidth={1.5}
            />

            {/* Title */}
            <h3 className="text-lg font-bold">
              {t(`steps.${index}.title`)}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--section-text-muted)]">
              {t(`steps.${index}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
