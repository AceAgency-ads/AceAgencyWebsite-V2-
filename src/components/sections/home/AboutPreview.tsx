'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * About preview section with agency intro text on the left
 * and the AceAgency logo with a subtle float animation on the right.
 * Dark theme. Logo floats with a GSAP yoyo animation, desktop only.
 */
export function AboutPreview(): React.JSX.Element {
  const t = useTranslations('home');
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!logoRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(logoRef.current!, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'power1.inOut',
      });
    });
  });

  return (
    <SectionWrapper theme="dark" id="about-preview">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        {/* Left column — text + CTA */}
        <div className="lg:w-[55%]">
          <SectionHeader
            overline={t('about.overline')}
            heading={t('about.heading')}
            description={t('about.description')}
          />

          <ScrollReveal>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-[3rem] border-white/30 px-8 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/despre-noi">
                {t('about.cta')}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>

        {/* Right column — logo with float animation + brand glow */}
        <div className="flex items-center justify-center lg:w-[45%]">
          <ScrollReveal className="relative flex items-center justify-center">
            {/* Brand glow behind logo */}
            <div
              className="absolute h-[300px] w-[300px] rounded-full opacity-20"
              style={{ background: 'var(--ds-gradient-brand-glow)' }}
            />

            {/* Floating logo */}
            <div ref={logoRef} className="relative">
              <Image
                src="/ace-agency-logo.webp"
                alt="AceAgency logo"
                width={400}
                height={400}
                className="h-auto w-[250px] md:w-[350px] lg:w-[400px]"
                priority={false}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
