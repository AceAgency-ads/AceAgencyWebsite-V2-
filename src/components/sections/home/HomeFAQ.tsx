'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Overline } from '@/components/ui/Overline';

interface FAQItem {
  q: string;
  a: string;
}

/**
 * FAQ_Section — 5 Q&A items in an accordion. Native disclosure pattern
 * (controlled state, single-open) — no Radix dependency for this small
 * surface. FAQPage JSON-LD is emitted by lib/seo/schemas at the page level,
 * not here.
 *
 * Each answer is intentionally 134-167 words for AI citation eligibility per
 * the project GEO rules — preserved verbatim from i18n.
 */
export function HomeFAQ(): React.JSX.Element {
  const t = useTranslations('home.faq');
  const items = t.raw('items') as readonly FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="text-center">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t.rich('h2', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#56151A]">{chunks}</span>
              ),
            })}
          </h2>
          <p className="mx-auto mt-5 max-w-[55ch] font-body text-[16px] leading-[1.65] text-[#71706E]">
            {t('body')}
          </p>
        </div>

        <ul className="mt-12 divide-y divide-[#E8E6E3] border-y border-[#E8E6E3]">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-[#56151A]"
                >
                  <span className="font-subheading text-[17px] font-bold leading-snug sm:text-[19px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`mt-1 size-5 shrink-0 text-[#56151A] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 font-body text-[15px] leading-[1.7] text-[#71706E] sm:text-[16px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
