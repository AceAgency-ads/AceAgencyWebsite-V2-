'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface CTASectionProps {
  /** i18n namespace for translations. Enables reuse on About page. Default: 'home' */
  readonly namespace?: string;
}

/**
 * Burgundy CTA section with TextReveal heading and dual action buttons.
 * Reusable across pages via namespace prop (default: 'home', About page can pass 'about').
 * Primary button links to /contact, secondary is disabled (Portfolio is V2).
 */
export function CTASection({ namespace = 'home' }: CTASectionProps): React.JSX.Element {
  const t = useTranslations(namespace);

  return (
    <SectionWrapper theme="burgundy" id="cta" className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        {/* Heading with word-level TextReveal on scroll */}
        <TextReveal
          as="h2"
          variant="word"
          className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
        >
          {t('cta.heading')}
        </TextReveal>

        {/* Description */}
        <ScrollReveal>
          <p className="mb-10 text-lg text-white/90">
            {t('cta.description')}
          </p>
        </ScrollReveal>

        {/* Dual CTAs */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary: accent variant (grey bg, black text) */}
            <Button
              asChild
              size="lg"
              className="min-h-[3rem] bg-grey px-8 font-semibold text-black hover:bg-grey/90"
            >
              <Link href="/contact">{t('cta.primary')}</Link>
            </Button>

            {/* Secondary: ghost variant, disabled (Portfolio is V2) */}
            <Button
              variant="outline"
              size="lg"
              className="min-h-[3rem] border-white/30 px-8 text-white opacity-50"
              aria-disabled="true"
              tabIndex={-1}
              style={{ pointerEvents: 'none' }}
            >
              {t('cta.secondary')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
