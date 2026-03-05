'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ScrubReveal } from '@/components/animations/ScrubReveal';

/**
 * About preview section — addifico "Why we exist?" style.
 * Full-width scroll-scrubbed text reveal with violet gradient glow on left.
 * No image/logo — pure text-driven section.
 */
export function AboutPreview(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="about-preview" rounded={false} className="relative overflow-hidden">
      {/* Violet gradient glow on left side */}
      <div
        className="pointer-events-none absolute -left-[10%] top-1/3 h-[600px] w-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(101, 12, 190, 0.35), rgba(101, 12, 190, 0.08) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <div className="lg:w-[60%]">
          {/* "Why we exist?" label — small, left side */}
          <ScrollReveal className="mb-10 md:mb-14">
            <span
              className="inline-block text-xs uppercase tracking-[0.18em] text-[var(--section-text-muted)]"
            >
              {t('about.overline')}
            </span>
          </ScrollReveal>

          {/* Scroll-scrubbed text reveal — large, full-width */}
          <ScrubReveal
            className="mb-10 max-w-4xl text-2xl font-medium leading-[1.4] md:text-3xl lg:text-4xl"
          >
            {t('about.description')}
          </ScrubReveal>

          <ScrollReveal>
            <Button
              asChild
              size="lg"
              className="min-h-[3rem] rounded-full bg-[#650CBE] px-8 font-semibold text-white hover:bg-[#7A1FD8]"
            >
              <Link href="/despre-noi">
                {t('about.cta')}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>

        <div className="hidden lg:block lg:w-[40%]">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/home/about-preview.webp"
              alt="Echipa Laboratorul de Conversii într-o sesiune de brainstorming creativ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 40vw"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
