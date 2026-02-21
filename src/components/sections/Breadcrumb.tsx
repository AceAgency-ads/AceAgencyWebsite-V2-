import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

interface BreadcrumbProps {
  readonly items: readonly BreadcrumbItem[];
}

/**
 * Reusable breadcrumb navigation with BreadcrumbList JSON-LD schema.
 * Server component -- no 'use client' needed.
 * Renders inside SectionWrapper (inherits section theme colors).
 */
export function Breadcrumb({ items }: BreadcrumbProps): React.JSX.Element {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://aceagency.ro${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center gap-2 text-sm text-[var(--section-text-muted)]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--section-text)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--section-text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
