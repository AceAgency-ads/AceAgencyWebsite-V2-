'use client';

import { useTranslations } from 'next-intl';

interface LegalSection {
  readonly heading: string;
  readonly content: string;
}

interface LegalContentProps {
  readonly namespace: 'privacy' | 'cookies' | 'terms';
}

/**
 * Reusable legal content renderer.
 * Reads sections array from i18n namespace and renders heading + paragraphs.
 * Splits content on double newlines to create separate <p> elements.
 */
export function LegalContent({ namespace }: LegalContentProps): React.JSX.Element {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as readonly LegalSection[];
  const lastUpdated = t('lastUpdated');

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-10 text-sm text-[var(--section-text-muted)]">{lastUpdated}</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <article key={section.heading}>
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--section-text)] md:text-2xl">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.content.split('\n\n').map((paragraph) => (
                <p
                  key={paragraph.slice(0, 60)}
                  className="text-base leading-relaxed text-[var(--section-text-muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
