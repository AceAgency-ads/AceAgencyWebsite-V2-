'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Search,
  Monitor,
  ShoppingCart,
  Youtube,
  Zap,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

/**
 * Default feature icons used when no service-specific icon mapping exists.
 * Components use index-based fallback from this array.
 */
const FEATURE_ICONS: readonly LucideIcon[] = [
  Search,
  Monitor,
  ShoppingCart,
  Youtube,
  Zap,
  RotateCcw,
] as const;

interface ServiceFeaturesProps {
  readonly serviceKey: string;
  readonly featureImage?: string;
}

/**
 * Service benefits/features grid section.
 * Renders 4-6 feature items from i18n with SpotlightCard hover effect.
 */
export function ServiceFeatures({ serviceKey, featureImage }: ServiceFeaturesProps): React.JSX.Element {
  const t = useTranslations('services');
  const gridRef = useRef<HTMLDivElement>(null);

  const items = t.raw(`${serviceKey}.features.items`) as ReadonlyArray<{
    title: string;
    description: string;
  }>;

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('[data-feature]');
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        return () => {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === gridRef.current)
            .forEach((st) => st.kill());
        };
      });

      // Reduced motion: make all feature cards immediately visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { opacity: 1, y: 0 });
      });
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper theme="light-warm" id="features">
      <SectionHeader
        overline={t(`${serviceKey}.features.overline`)}
        heading={t(`${serviceKey}.features.heading`)}
      />

      {featureImage && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <Image
            src={featureImage}
            alt=""
            width={1400}
            height={500}
            className="h-auto max-h-[280px] w-full object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
            aria-hidden="true"
          />
        </div>
      )}

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, index) => {
          // Modulo guarantees a valid index; fallback to Search for type safety
          const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length] ?? Search;

          return (
            <div key={index} data-feature>
              <SpotlightCard className="h-full rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-8">
                <Icon
                  className="mb-4 size-10 text-[#650CBE]"
                  strokeWidth={1.5}
                />
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-[var(--section-text-muted)]">
                  {item.description}
                </p>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
