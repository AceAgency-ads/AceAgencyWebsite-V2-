import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySection } from '@/lib/content';
import { collectionPageSchema, renderJsonLd } from '@/lib/seo/schemas';
import { CaseStudyHero } from '@/components/sections/case-studies/CaseStudyHero';
import { CaseStudyCard } from '@/components/sections/case-studies/CaseStudyCard';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import type { CaseStudyMeta } from '@/types/content';

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'studii-de-caz',
    locale,
  });
}

export default async function CaseStudiesPage({
  params,
}: CaseStudiesPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'caseStudies' });
  const caseStudies = getContentBySection<CaseStudyMeta>('studii-de-caz', locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            collectionPageSchema({
              name: t('meta.title'),
              description: t('meta.description'),
              url: `${SITE_URL}/${locale}/studii-de-caz`,
            })
          ),
        }}
      />
      <CaseStudyHero />
      <SectionWrapper theme="light">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
