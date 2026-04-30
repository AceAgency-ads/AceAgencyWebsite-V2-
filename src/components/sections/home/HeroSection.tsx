'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { VSLCard } from '@/components/sections/VSLCard';

interface HeroStat {
  value: string;
  label: string;
}

/**
 * Homepage hero — Hero_Specific from aceads-website.
 * Two-column on desktop (text left, VSL right). On mobile: trust badges stack
 * inline, VSL drops below CTAs full-width.
 *
 * Entry animations are pure CSS via globals.css `.hero-*` selectors —
 * no GSAP, no scroll-pinning, no client-side bundle bloat for FCP.
 *
 * All copy comes from i18n namespace `home.hero.*`. Keys: overline, h1
 * (with `{accent}...{/accent}` markers), subline, body, primaryCta,
 * secondaryCta, stats (4 items), trustBadges (4 items).
 */
export function HeroSection(): React.JSX.Element {
  const t = useTranslations('home.hero');
  const stats = t.raw('stats') as readonly HeroStat[];
  const trustBadges = t.raw('trustBadges') as readonly string[];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-20 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-28"
    >
      {/* Burgundy radial glows — top-right + bottom-left */}
      <BurgundyGlow style={{ top: -280, right: -200 }} size={800} />
      <BurgundyGlow
        variant="bright"
        style={{ bottom: -200, left: -100 }}
        size={500}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Overline */}
        <Overline dark className="hero-overline mb-6">
          {t('overline')}
        </Overline>

        {/* Two-column row: headline+body left, VSL right */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            {/* Massive headline */}
            <h1 className="hero-h1 max-w-[20ch] font-heading text-[clamp(2rem,5vw+1rem,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              {t.rich('h1', {
                accent: (chunks: ReactNode) => (
                  <span className="text-[#C4394A]">{chunks}</span>
                ),
              })}
            </h1>

            {/* Subline / body */}
            <p className="hero-body mt-7 max-w-[60ch] font-subheading text-[18px] leading-[1.55] text-[#D9D9D9] sm:text-[19px]">
              {t('subline')}
            </p>
            <p className="hero-body mt-5 max-w-[60ch] font-body text-[15px] leading-[1.65] text-[#a0a0a0] sm:text-[16px]">
              {t('body')}
            </p>

            {/* CTA row */}
            <div className="hero-cta mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CTAButton asChild>
                <Link href="/contact">{t('primaryCta')}</Link>
              </CTAButton>
              <CTAButton asChild variant="ghost">
                <Link href="/studii-de-caz">{t('secondaryCta')}</Link>
              </CTAButton>
            </div>

            {/* Trust badges */}
            <div className="hero-stats mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[12px] uppercase tracking-[0.12em] text-[#a0a0a0]">
              {trustBadges.map((badge, i) => (
                <span key={i}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Right: VSL card */}
          <div className="lg:min-w-0">
            <VSLCard />
          </div>
        </div>

        {/* Stat strip — 4 tiles */}
        <div className="hero-stats mt-16 grid grid-cols-2 gap-6 border-t border-[rgba(74,70,67,0.5)] pt-12 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <MetricStat
              key={i}
              dark
              size="lg"
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
