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

interface ServiceFAQProps {
  readonly serviceKey: string;
}

/**
 * FAQ accordion section with FAQPage JSON-LD schema markup.
 * Uses shadcn Accordion (Radix) for accessible expand/collapse.
 * Keyboard navigable: Tab + Enter/Space to toggle items.
 */
export function ServiceFAQ({ serviceKey }: ServiceFAQProps): React.JSX.Element {
  const t = useTranslations('services');

  const faqItems = t.raw(`${serviceKey}.faq.items`) as ReadonlyArray<{
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
    <SectionWrapper theme="light" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionHeader
        overline={t(`${serviceKey}.faq.overline`)}
        heading={t(`${serviceKey}.faq.heading`)}
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
