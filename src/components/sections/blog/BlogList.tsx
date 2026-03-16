'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { BlogCategoryFilter } from './BlogCategoryFilter';
import { BlogCard } from './BlogCard';
import type { BlogArticleMeta } from '@/types/content';

type BlogCardArticle = BlogArticleMeta & { readonly readingTime: number };

interface BlogListProps {
  readonly articles: readonly BlogCardArticle[];
}

/**
 * Client component combining BlogCategoryFilter + grid of BlogCards.
 * Manages category filter state. Shows empty state when no articles match.
 * Grid: 1 col mobile, 2 cols md.
 */
export function BlogList({ articles }: BlogListProps): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <SectionWrapper theme="light" rounded={false}>
      {/* Category filter */}
      <div className="mb-10">
        <BlogCategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {/* Article grid */}
      {filteredArticles.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          aria-label="Lista articole blog"
        >
          {filteredArticles.map((article) => (
            <li key={article.slug}>
              <BlogCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-12 text-center">
          <p className="text-[var(--section-text-muted)]">
            Nu exista articole in aceasta categorie.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
