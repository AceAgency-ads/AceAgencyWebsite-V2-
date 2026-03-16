import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySlug, getContentBySection, getAllSlugs } from '@/lib/content';
import { blogPostingSchema, renderJsonLd } from '@/lib/seo/schemas';
import { mdxComponents } from '@/lib/mdx-components';
import { ArticleHeader } from '@/components/sections/blog/ArticleHeader';
import { ArticleCTA } from '@/components/sections/blog/ArticleCTA';
import { RelatedArticles } from '@/components/sections/blog/RelatedArticles';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import type { BlogArticleMeta } from '@/types/content';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string; locale: string }[] {
  return getAllSlugs('blog');
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getContentBySlug<BlogArticleMeta>('blog', slug, locale);
  if (!result) return {};

  return generatePageMetadata({
    title: result.meta.title,
    description: result.meta.description,
    path: `blog/${slug}`,
    locale,
  });
}

export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = getContentBySlug<BlogArticleMeta>('blog', slug, locale);
  if (!result) notFound();

  const { meta, content } = result;

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  // Related articles: same category, exclude current, max 3
  const allArticles = getContentBySection<BlogArticleMeta>('blog', locale);
  const related = allArticles
    .filter((a) => a.category === meta.category && a.slug !== meta.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            blogPostingSchema({
              title: meta.title,
              description: meta.description,
              url: `${SITE_URL}/${locale}/blog/${slug}`,
              datePublished: meta.publishedAt,
              dateModified: meta.updatedAt,
              image: meta.featuredImage,
              authorName: meta.author,
            })
          ),
        }}
      />
      <ArticleHeader article={meta} />
      <SectionWrapper theme="light">
        <article className="prose prose-lg mx-auto max-w-3xl">
          {mdxContent}
        </article>
      </SectionWrapper>
      <RelatedArticles articles={related} />
      <ArticleCTA />
    </>
  );
}
