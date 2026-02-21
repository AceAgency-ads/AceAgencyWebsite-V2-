'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CountUp } from '@/components/animations/CountUp';

/** Stat item shape from i18n. */
interface StatItem {
  readonly value: string;
  readonly suffix: string;
  readonly label: string;
}

/** Card theme with background and text color classes. */
interface CardTheme {
  readonly bg: string;
  readonly text: string;
  readonly muted: string;
  readonly countColor: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  /** Grid span classes for bento layout */
  readonly span: string;
}

/** Alternating card themes — bento style with mixed colors. */
const CARD_THEMES: readonly CardTheme[] = [
  {
    bg: 'bg-white',
    text: 'text-[#262523]',
    muted: 'text-[#262523]/60',
    countColor: 'text-[#56151A]',
    icon: TrendingUp,
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    bg: 'bg-[#56151A]',
    text: 'text-white',
    muted: 'text-white/70',
    countColor: 'text-white',
    icon: Users,
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    bg: 'bg-[#262523]',
    text: 'text-[#D9D9D9]',
    muted: 'text-[#a0a0a0]',
    countColor: 'text-[#7A2025]',
    icon: Award,
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    bg: 'bg-black',
    text: 'text-white',
    muted: 'text-white/60',
    countColor: 'text-[#7A2025]',
    icon: Zap,
    span: 'sm:col-span-1 sm:row-span-1',
  },
] as const;

/** Stat keys matching the i18n object. */
const STAT_KEYS = ['0', '1', '2', '3'] as const;

/**
 * Stats section — bento style.
 * Light bg (#F5F5F5), alternating card colors (white, burgundy, dark, black),
 * large animated counter numbers, decorative icons.
 */
export function StatsSection(): React.JSX.Element {
  const t = useTranslations('home');
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const statItems = gridRef.current!.querySelectorAll('[data-animate="stat"]');

        gsap.from(statItems, {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const statItems = gridRef.current!.querySelectorAll('[data-animate="stat"]');
        gsap.set(statItems, { opacity: 1, y: 0 });
      });
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper theme="light" id="stats">
      <SectionHeader
        overline={t('stats.overline')}
        heading={t('stats.heading')}
        align="center"
      />

      <div ref={gridRef} className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {STAT_KEYS.map((key, index) => {
          const item = t.raw(`stats.items.${key}`) as StatItem;
          const cardTheme = CARD_THEMES[index]!;
          const DecorativeIcon = cardTheme.icon;

          return (
            <div
              key={key}
              data-animate="stat"
              className={`relative overflow-hidden rounded-3xl p-8 ${cardTheme.bg} ${cardTheme.span}`}
            >
              {/* Decorative icon in top-right corner */}
              <DecorativeIcon
                className={`absolute -right-2 -top-2 size-24 opacity-[0.06] ${cardTheme.text}`}
              />

              <CountUp
                end={Number(item.value)}
                suffix={item.suffix}
                className={`text-4xl font-bold md:text-5xl lg:text-6xl ${cardTheme.countColor}`}
              />
              <span className={`mt-3 block text-sm ${cardTheme.muted}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
