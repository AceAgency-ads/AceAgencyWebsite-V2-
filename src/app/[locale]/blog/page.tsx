import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySection } from '@/lib/content';
import { collectionPageSchema, renderJsonLd } from '@/lib/seo/schemas';
import { BlogHero } from '@/components/sections/blog/BlogHero';
import { BlogList } from '@/components/sections/blog/BlogList';
import type { BlogArticleMeta } from '@/types/content';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'blog',
    locale,
  });
}

export default async function BlogPage({
  params,
}: BlogPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const articles = getContentBySection<BlogArticleMeta>('blog', locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            collectionPageSchema({
              name: t('meta.title'),
              description: t('meta.description'),
              url: `${SITE_URL}/${locale}/blog`,
            })
          ),
        }}
      />
      <BlogHero />
      <BlogList articles={articles} />
    </>
  );
}
