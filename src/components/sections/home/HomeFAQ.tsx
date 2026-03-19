'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { faqSchema, renderJsonLd } from '@/lib/seo/schemas';

/**
 * Homepage FAQ accordion with FAQPage JSON-LD schema.
 * Uses shadcn Accordion (Radix) for accessible expand/collapse.
 */
export function HomeFAQ(): React.JSX.Element {
  const t = useTranslations('home');

  const faqItems = t.raw('faq.items') as ReadonlyArray<{
    question: string;
    answer: string;
  }>;

  return (
    <SectionWrapper theme="light" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(faqSchema(faqItems)) }}
      />

      <SectionHeader
        overline={t('faq.overline')}
        heading={t('faq.heading')}
      />

      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-[var(--section-text-muted)]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA link */}
      <ScrollReveal className="mt-10 text-center">
        <Link
          href="/intrebari-frecvente"
          className="inline-flex items-center gap-2 text-lg font-semibold text-[#650CBE] transition-colors hover:text-[#7A1FD8]"
        >
          {t('faq.cta')}
          <ArrowRight className="size-5" />
        </Link>
      </ScrollReveal>
    </SectionWrapper>
  );
}
