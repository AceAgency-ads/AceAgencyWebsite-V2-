'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ServiceCTAProps {
  readonly serviceKey: string;
}

/**
 * Service-specific CTA section.
 * Light grey card with TextReveal heading, following CTASection pattern.
 * Primary button links to /contact, secondary to /contact#calendly.
 */
export function ServiceCTA({ serviceKey }: ServiceCTAProps): React.JSX.Element {
  const t = useTranslations('services');

  return (
    <SectionWrapper theme="dark" id="service-cta" rounded={false}>
      <div className="mx-auto max-w-4xl rounded-[36px] bg-[#EBEBEB] p-12 md:p-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: heading */}
          <div className="flex-1">
            <TextReveal
              as="h2"
              variant="word"
              className="text-3xl font-bold text-[#262523] md:text-4xl lg:text-5xl"
            >
              {t(`${serviceKey}.cta.heading`)}
            </TextReveal>
          </div>

          {/* Right: description + CTAs */}
          <div className="flex flex-1 flex-col gap-6">
            <ScrollReveal>
              <p className="text-lg text-[#262523]">
                {t(`${serviceKey}.cta.description`)}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="min-h-[3rem] rounded-full bg-[#56151A] px-8 font-semibold text-white hover:bg-[#7A2025]"
                >
                  <Link href="/contact">
                    {t(`${serviceKey}.cta.primary`)}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[3rem] rounded-full border-[#262523]/30 px-8 text-[#262523] hover:bg-[#262523]/10"
                >
                  <Link href="/contact">
                    {t(`${serviceKey}.cta.secondary`)}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
