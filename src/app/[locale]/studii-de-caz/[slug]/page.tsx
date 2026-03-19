import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { blogPostingSchema, renderJsonLd } from '@/lib/seo/schemas';
import { mdxComponents } from '@/lib/mdx-components';
import { Link } from '@/i18n/navigation';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { CaseStudyMetrics } from '@/components/sections/case-studies/CaseStudyMetrics';
import { CaseStudyDetailCTA } from '@/components/sections/case-studies/CaseStudyDetailCTA';
import type { CaseStudyMeta } from '@/types/content';

const SERVICE_NAMES: Record<string, string> = {
  'google-ads': 'Google Ads',
  'facebook-ads': 'Meta Ads',
  'tiktok-ads': 'TikTok Ads',
  'seo': 'SEO',
  'email-marketing': 'Email Marketing',
  'consultanta-marketing': 'Consultanta Marketing',
};

interface CaseStudyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string; locale: string }[] {
  return getAllSlugs('studii-de-caz');
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getContentBySlug<CaseStudyMeta>('studii-de-caz', slug, locale);
  if (!result) return {};

  return generatePageMetadata({
    title: result.meta.title,
    description: result.meta.description,
    path: `studii-de-caz/${slug}`,
    locale,
  });
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = getContentBySlug<CaseStudyMeta>('studii-de-caz', slug, locale);
  if (!result) notFound();

  const { meta, content } = result;
  const t = await getTranslations({ locale, namespace: 'caseStudies.detail' });

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            blogPostingSchema({
              title: meta.title,
              description: meta.description,
              url: `${SITE_URL}/${locale}/studii-de-caz/${slug}`,
              datePublished: meta.publishedAt,
              dateModified: meta.publishedAt,
              image: meta.heroImage,
              authorName: 'Laboratorul de Conversii',
            })
          ),
        }}
      />

      {/* Hero */}
      <SectionWrapper theme="dark" hero rounded={false}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--section-text-muted)]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[var(--section-text)]"
              >
                {t('breadcrumbHome')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/studii-de-caz"
                className="transition-colors hover:text-[var(--section-text)]"
              >
                {t('breadcrumbIndex')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              className="max-w-[200px] truncate text-[var(--section-text)]"
              aria-current="page"
            >
              {meta.client}
            </li>
          </ol>
        </nav>

        {/* Industry badge */}
        <span className="mb-4 inline-block rounded-full bg-[#650CBE]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#650CBE]">
          {meta.industry}
        </span>

        {/* H1 title */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[var(--section-text)] md:text-5xl lg:text-6xl">
          {meta.title}
        </h1>

        {/* Hero image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={meta.heroImage}
            alt={meta.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </div>
      </SectionWrapper>

      {/* Metrics bar */}
      <SectionWrapper theme="light">
        <CaseStudyMetrics metrics={meta.metrics} />

        {/* Services used */}
        {meta.services.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--section-text-muted)]">
              {t('servicesUsed')}
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.services.map((serviceSlug) => (
                <Link
                  key={serviceSlug}
                  href={`/servicii/${serviceSlug}`}
                  className="rounded-full border border-[#650CBE] px-4 py-1.5 text-sm font-medium text-[#650CBE] transition-colors hover:bg-[#650CBE] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650CBE]"
                >
                  {SERVICE_NAMES[serviceSlug] ?? serviceSlug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* MDX content */}
      <SectionWrapper theme="light">
        <article className="prose prose-lg mx-auto max-w-3xl">
          {mdxContent}
        </article>
      </SectionWrapper>

      {/* Screenshots */}
      {meta.screenshots.length > 0 && (
        <SectionWrapper theme="light">
          <h2 className="mb-8 text-2xl font-bold text-[var(--section-text)] md:text-3xl">
            {t('screenshotsHeading')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {meta.screenshots.map((screenshot) => (
              <div
                key={screenshot.src}
                className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--section-border)]"
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      <CaseStudyDetailCTA />
    </>
  );
}
