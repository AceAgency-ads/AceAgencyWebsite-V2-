import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { StorySection } from '@/components/sections/about/StorySection';
import { TeamSection } from '@/components/sections/about/TeamSection';
import { ValuesSection } from '@/components/sections/about/ValuesSection';
import { MissionVision } from '@/components/sections/about/MissionVision';
import { WhyChooseUs } from '@/components/sections/about/WhyChooseUs';
import { CTASection } from '@/components/sections/home/CTASection';
import { organizationSchema, renderJsonLd } from '@/lib/seo/schemas';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'despre-noi',
    locale,
  });
}

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />
      <AboutHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.about') },
        ]}
      />
      <HeroTransition namespace="about" i18nPrefix="heroTransition" />
      <StorySection />
      <TeamSection />
      <ValuesSection />
      <MissionVision />
      <WhyChooseUs />
      <CTASection namespace="about" secondaryHref="/servicii" />
    </>
  );
}
