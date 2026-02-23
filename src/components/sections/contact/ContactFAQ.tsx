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

/**
 * Contact page FAQ accordion section.
 * Follows same pattern as ServiceFAQ but reads from 'contact' namespace.
 * Includes FAQPage JSON-LD schema for SEO.
 */
export function ContactFAQ(): React.JSX.Element {
  const t = useTranslations('contact');

  const faqItems = t.raw('faq.items') as ReadonlyArray<{
    question: string;
    answer: string;
  }>;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <SectionWrapper theme="dark" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionHeader
        overline={t('faq.overline')}
        heading={t('faq.heading')}
        align="center"
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
    </SectionWrapper>
  );
}
