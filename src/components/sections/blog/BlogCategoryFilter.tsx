'use client';

import { cn } from '@/lib/utils';

type BlogCategory =
  | 'all'
  | 'optimizare-conversii'
  | 'google-ads'
  | 'meta-ads'
  | 'tiktok-ads'
  | 'seo'
  | 'email-marketing'
  | 'ai-marketing';

const CATEGORIES: readonly { readonly value: BlogCategory; readonly label: string }[] = [
  { value: 'all', label: 'Toate' },
  { value: 'optimizare-conversii', label: 'Optimizare Conversii' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'tiktok-ads', label: 'TikTok Ads' },
  { value: 'seo', label: 'SEO' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'ai-marketing', label: 'AI in Marketing' },
];

interface BlogCategoryFilterProps {
  readonly selected: string;
  readonly onSelect: (category: string) => void;
}

/**
 * Category pill filter for the blog list.
 * Selected pill: solid #650CBE. Unselected: bordered with hover state.
 * Uses role="tablist" / role="tab" for accessibility.
 */
export function BlogCategoryFilter({
  selected,
  onSelect,
}: BlogCategoryFilterProps): React.JSX.Element {
  return (
    <div
      role="tablist"
      aria-label="Filtrare articole dupa categorie"
      className="flex flex-wrap gap-2"
    >
      {CATEGORIES.map(({ value, label }) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650CBE]',
              isSelected
                ? 'bg-[#650CBE] text-white'
                : 'border border-[var(--section-border)] text-[var(--section-text-muted)] hover:border-[#650CBE] hover:text-[var(--section-text)]'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
