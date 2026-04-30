import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CaseStudyHero } from '@/components/sections/case-studies/CaseStudyHero';
import { ContextSplit } from '@/components/sections/case-studies/ContextSplit';
import { ResultsSection } from '@/components/sections/case-studies/ResultsSection';
import { ProcessSteps } from '@/components/sections/case-studies/ProcessSteps';
import { BurgundyTestimonial } from '@/components/sections/case-studies/BurgundyTestimonial';
import { CaseStudyFinalCTA } from '@/components/sections/case-studies/CaseStudyFinalCTA';
import {
  CASE_STUDY_SLUGS,
  isCaseStudySlug,
  type CaseStudySlug,
} from '@/lib/case-studies';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  graph,
  caseStudySchema,
  breadcrumbListSchema,
  organizationSchema,
} from '@/lib/seo/schemas';

interface CaseStudyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { locale: string; slug: string }[] {
  return routing.locales.flatMap((locale) =>
    CASE_STUDY_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isCaseStudySlug(slug)) return {};
  const t = await getTranslations({
    locale,
    namespace: `caseStudies.${slug}`,
  });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;

  if (!isCaseStudySlug(slug)) {
    notFound();
  }

  setRequestLocale(locale);

  const namespace = `caseStudies.${slug as CaseStudySlug}`;
  const t = await getTranslations({ locale, namespace });

  const breadcrumb = [
    { label: 'Home', href: '/' as const },
    { label: 'Studii de caz', href: '/studii-de-caz' as const },
    { label: t('breadcrumbLabel') },
  ];

  const ld = graph(
    organizationSchema(),
    caseStudySchema({
      slug,
      name: t('metaTitle'),
      description: t('metaDescription'),
      datePublished: '2026-04-01',
      about: t('hero.overline'),
    }),
    breadcrumbListSchema([
      { name: 'Home', url: 'https://aceads.co/' },
      { name: 'Studii de caz', url: 'https://aceads.co/studii-de-caz' },
      { name: t('breadcrumbLabel'), url: `https://aceads.co/studii-de-caz/${slug}` },
    ]),
  );

  return (
    <>
      <JsonLd data={ld} />
      <CaseStudyHero namespace={namespace} breadcrumbItems={breadcrumb} />
      <ContextSplit namespace={namespace} />
      <ResultsSection namespace={namespace} />
      <ProcessSteps namespace={namespace} />
      <BurgundyTestimonial namespace={namespace} />
      <CaseStudyFinalCTA namespace={namespace} />
    </>
  );
}
