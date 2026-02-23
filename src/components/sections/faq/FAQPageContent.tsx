'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

interface FAQCategory {
  readonly name: string;
  readonly items: readonly FAQItem[];
}

/**
 * Standalone FAQ page content with categorized accordion sections.
 * Reads from 'faq' i18n namespace.
 * Includes FAQPage JSON-LD schema with all Q&A pairs for rich results.
 */
export function FAQPageContent(): React.JSX.Element {
  const t = useTranslations('faq');

  const categories = t.raw('categories') as readonly FAQCategory[];

  // Flatten all items for JSON-LD schema
  const allItems = categories.flatMap((category) => category.items);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <SectionWrapper theme="light" id="faq-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {categories.map((category, categoryIndex) => (
        <div key={category.name} className={categoryIndex > 0 ? 'mt-12' : ''}>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            {category.name}
          </h2>

          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {category.items.map((item, itemIndex) => {
              const globalIndex = categories
                .slice(0, categoryIndex)
                .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;

              return (
                <AccordionItem key={globalIndex} value={`faq-${globalIndex}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-[var(--section-text-muted)]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ))}
    </SectionWrapper>
  );
}
