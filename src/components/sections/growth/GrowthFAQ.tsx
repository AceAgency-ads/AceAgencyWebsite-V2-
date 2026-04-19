'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { faqSchema, renderJsonLd } from '@/lib/seo/schemas';

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * Growth page FAQ accordion with FAQPage JSON-LD schema.
 * Dark luxury design with mint hover accents and CTA button.
 */
export function GrowthFAQ(): React.JSX.Element {
  const t = useTranslations('growth');

  const rawItems = t.raw('faq.items') as Record<string, FAQItem>;
  const faqItems: readonly FAQItem[] = Object.keys(rawItems)
    .sort()
    .map((key) => rawItems[key]!);

  return (
    <SectionWrapper theme="dark" id="faq" compact>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(faqSchema(faqItems)) }}
      />

      {/* Radial violet glow behind FAQ */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/10 blur-[120px]"
        />

        <SectionHeader
          overline={t('faq.overline')}
          heading={t('faq.heading')}
        />

        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-white/10"
            >
              <AccordionTrigger className="text-left text-lg font-semibold transition-colors hover:text-[#66F3A6]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[var(--section-text-muted)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA button that scrolls to audit form */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <a
            href="#audit-form"
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#650CBE] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 -translate-x-full animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </span>
            <span className="relative z-10">
              {t.has('faq.cta')
                ? t('faq.cta')
                : 'Aplica pentru audit gratuit \u2192'}
            </span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
