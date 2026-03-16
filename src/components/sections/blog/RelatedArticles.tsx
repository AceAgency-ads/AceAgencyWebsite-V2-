import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BlogCard } from './BlogCard';
import type { BlogArticleMeta } from '@/types/content';

type BlogCardArticle = BlogArticleMeta & { readonly readingTime: number };

interface RelatedArticlesProps {
  readonly articles: readonly BlogCardArticle[];
}

/**
 * Related articles section.
 * Shows max 3 articles in a BlogCard grid. Returns null if array is empty.
 * Light theme.
 */
export function RelatedArticles({ articles }: RelatedArticlesProps): React.JSX.Element | null {
  const t = useTranslations('blog.article');

  if (articles.length === 0) return null;
  const displayed = articles.slice(0, 3);

  return (
    <SectionWrapper theme="light" rounded={false}>
      <SectionHeader heading={t('relatedHeading')} align="left" />
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Articole similare">
        {displayed.map((article) => (
          <li key={article.slug}>
            <BlogCard article={article} />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
