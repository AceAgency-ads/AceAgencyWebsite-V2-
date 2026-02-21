'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  MessageSquare,
  PenTool,
  Rocket,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

const STEP_ICONS: readonly LucideIcon[] = [
  MessageSquare,
  PenTool,
  Rocket,
  BarChart3,
] as const;

/**
 * "Cum Lucram" / "How We Work" section for the services index page.
 * 4 numbered steps with icons, connected by dotted lines on desktop.
 * Vertical timeline on mobile.
 */
export function ProcessSteps(): React.JSX.Element {
  const t = useTranslations('services');
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll('[data-step]');
      if (steps.length === 0) return;

      gsap.from(steps, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
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
    },
    { scope: stepsRef }
  );

  return (
    <SectionWrapper theme="light" id="process">
      <SectionHeader
        overline={t('index.process.overline')}
        heading={t('index.process.heading')}
        description={t('index.process.description')}
      />

      <div
        ref={stepsRef}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {STEP_ICONS.map((Icon, index) => (
          <div
            key={index}
            data-step
            className="group relative flex flex-col items-start gap-4 pl-8 lg:items-center lg:pl-0 lg:text-center"
          >
            {/* Vertical line on mobile */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute left-3 top-16 h-full w-px border-l border-dashed border-[var(--section-text-muted)]/30 lg:hidden"
                aria-hidden="true"
              />
            )}

            {/* Horizontal connector on desktop */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute right-0 top-8 hidden h-px w-full border-t border-dashed border-[var(--section-text-muted)]/30 lg:block"
                style={{ left: '60%', width: '80%' }}
                aria-hidden="true"
              />
            )}

            {/* Large decorative number */}
            <span className="text-6xl font-bold text-[#56151A]/20 transition-opacity duration-300 group-hover:text-[#56151A]/40 lg:text-7xl">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <Icon
              className="size-8 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[#56151A]"
              strokeWidth={1.5}
            />

            {/* Title */}
            <h3 className="text-lg font-bold">
              {t(`index.process.steps.${index}.title`)}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--section-text-muted)]">
              {t(`index.process.steps.${index}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
