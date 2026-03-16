import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { BlogArticleMeta } from '@/types/content';

type BlogCardArticle = BlogArticleMeta & { readonly readingTime: number };

interface BlogCardProps {
  readonly article: BlogCardArticle;
}

/**
 * Blog article card.
 * Featured image (16:9), category badge, title, description (line-clamp-2),
 * meta row with date + reading time. Wrapped in Link to /blog/{slug}.
 */
export function BlogCard({ article }: BlogCardProps): React.JSX.Element {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <ScrollReveal>
      <Link
        href={`/blog/${article.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650CBE]"
      >
        {/* Featured image — 16:9 */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Category badge */}
          <span className="absolute left-3 top-3 rounded-full bg-[#650CBE] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {article.category}
          </span>
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3 className="mb-2 text-lg font-bold leading-snug text-[var(--section-text)] transition-colors group-hover:text-[#650CBE]">
            {article.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-[var(--section-text-muted)]">
            {article.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-[var(--section-text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              <span>{article.readingTime} min citire</span>
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
