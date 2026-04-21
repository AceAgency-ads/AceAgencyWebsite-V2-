'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * ACE Growth Engine — Hero section with integrated VSL.
 * Full viewport: headline + subheadline, video thumbnail, CTA, guarantee badge.
 * All visible from first load without scrolling.
 */
export function GrowthHero(): React.JSX.Element {
  const t = useTranslations('growth');

  const handleScrollToAudit = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const target = document.getElementById('audit-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="vsl"
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#262523] px-6 py-16 md:py-20"
    >
      {/* Layered radial glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/15 blur-[160px]" />
        <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-[#66F3A6]/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-[#66F3A6]/5 blur-[120px]" />
      </div>

      {/* CSS grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
        }}
      />

      {/* Brand wordmark */}
      <div className="absolute left-6 top-6 z-10">
        <span className="font-[family-name:var(--font-glacial)] text-sm font-bold tracking-widest text-white/60 uppercase">
          Laboratorul de Conversii
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Headline + Subheadline */}
        <ScrollReveal className="mb-8 text-center md:mb-10">
          <h1 className="mb-4 font-[family-name:var(--font-glacial)] text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:mb-6 md:text-6xl lg:text-7xl">
            {t('hero.headline')}
          </h1>
          <p className="mx-auto max-w-2xl font-[family-name:var(--font-red-hat)] text-base text-[#D9D9D9] md:text-lg">
            {t('hero.subheadline')}
          </p>
        </ScrollReveal>

        {/* Video facade — 16:9 thumbnail */}
        <ScrollReveal className="mb-8">
          <div className="group relative mx-auto aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#1a1918] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/growth/vsl-thumb.webp"
              alt="ACE Growth Engine — Video"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
            {/* Subtle pulsing glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute size-28 animate-pulse rounded-full bg-[#650CBE]/20 blur-xl" />
            </div>
          </div>
        </ScrollReveal>

        {/* CTA + Guarantee */}
        <ScrollReveal className="text-center">
          <div className="relative inline-flex flex-col items-center gap-3">
            <div className="absolute -inset-4 top-0 h-14 animate-pulse rounded-full bg-[#650CBE]/30 blur-2xl" />
            <a
              href="#audit-form"
              onClick={handleScrollToAudit}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#650CBE] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#7A1FD8] hover:shadow-[0_0_40px_rgba(101,12,190,0.4)]"
            >
              {t('vsl.cta')}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    animation: 'shine 3s ease-in-out infinite',
                  }}
                />
              </span>
            </a>
            <span className="relative text-sm text-[#66F3A6]/80">
              {t('hero.guarantee')}
            </span>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
