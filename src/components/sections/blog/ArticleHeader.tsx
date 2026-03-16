import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import type { BlogArticleMeta } from '@/types/content';

type ArticleHeaderArticle = BlogArticleMeta & { readonly readingTime: number };

interface ArticleHeaderProps {
  readonly article: ArticleHeaderArticle;
}

/**
 * Article detail hero.
 * Breadcrumbs → category badge → H1 title → meta row → featured image.
 * Dark theme with hero padding.
 */
export function ArticleHeader({ article }: ArticleHeaderProps): React.JSX.Element {
  const t = useTranslations('blog.article');

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SectionWrapper theme="dark" hero rounded={false}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-[var(--section-text-muted)]">
          <li>
            <Link
              href="/"
              className="hover:text-[var(--section-text)] transition-colors"
            >
              {t('breadcrumbHome')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/blog"
              className="hover:text-[var(--section-text)] transition-colors"
            >
              {t('breadcrumbBlog')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="max-w-[200px] truncate text-[var(--section-text)]"
            aria-current="page"
          >
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Category badge */}
      <span className="mb-4 inline-block rounded-full bg-[#650CBE] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        {article.category}
      </span>

      {/* H1 title */}
      <h1 className="mb-6 text-4xl font-bold leading-tight text-[var(--section-text)] md:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Meta row */}
      <div className="mb-10 flex items-center gap-6 text-sm text-[var(--section-text-muted)]">
        <span className="flex items-center gap-2">
          <Calendar size={14} aria-hidden="true" />
          <time dateTime={article.publishedAt}>{formattedDate}</time>
        </span>
        <span className="flex items-center gap-2">
          <Clock size={14} aria-hidden="true" />
          <span>{article.readingTime} min citire</span>
        </span>
      </div>

      {/* Featured image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        />
      </div>
    </SectionWrapper>
  );
}
