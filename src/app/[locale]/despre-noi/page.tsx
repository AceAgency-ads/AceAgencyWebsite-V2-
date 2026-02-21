import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { StorySection } from '@/components/sections/about/StorySection';
import { ValuesSection } from '@/components/sections/about/ValuesSection';
import { DivisionsSection } from '@/components/sections/about/DivisionsSection';
import { MissionVision } from '@/components/sections/about/MissionVision';
import { WhyChooseUs } from '@/components/sections/about/WhyChooseUs';
import { CTASection } from '@/components/sections/home/CTASection';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <AboutHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.about') },
        ]}
      />
      <HeroTransition namespace="about" i18nPrefix="heroTransition" />
      <StorySection />
      <ValuesSection />
      <DivisionsSection />
      <MissionVision />
      <WhyChooseUs />
      <CTASection namespace="about" secondaryHref="/servicii" />
    </>
  );
}
