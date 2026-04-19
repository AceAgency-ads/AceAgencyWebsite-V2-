'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CirclePlay } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * ACE Growth Engine — VSL (Video Sales Letter) section.
 * Facade pattern: shows a YouTube thumbnail with a play icon overlay.
 * Does NOT embed an actual iframe until the user interacts.
 */
export function GrowthVSL(): React.JSX.Element {
  const t = useTranslations('growth');

  const handleScrollToAudit = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const target = document.getElementById('audit-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="vsl" className="bg-[#262523] px-6 py-10 md:py-14">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center font-[family-name:var(--font-glacial)] text-3xl font-bold text-white md:text-4xl">
            {t('vsl.heading')}
          </h2>

          {/* 16:9 video facade */}
          <div className="group relative mx-auto aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#1a1918]">
            {/* YouTube thumbnail background */}
            <Image
              src="/images/growth/vsl-thumb.webp"
              alt="ACE Growth Engine"
              fill
              className="object-cover"
            />

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/5" />

            {/* Pulsing glow overlay for interactivity hint */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute size-32 animate-pulse rounded-full bg-[#650CBE]/20 blur-xl" />
            </div>
          </div>

          {/* CTA below video with shine effect */}
          <div className="mt-8 text-center">
            <a
              href="#audit-form"
              onClick={handleScrollToAudit}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#650CBE] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#7A1FD8] hover:shadow-[0_0_40px_rgba(101,12,190,0.4)]"
            >
              {t('vsl.cta')}
              {/* Animated shine sweep */}
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
          </div>
        </ScrollReveal>
      </div>

      {/* Shine keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </section>
  );
}
