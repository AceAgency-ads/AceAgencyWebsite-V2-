import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroDespre } from '@/components/sections/about/HeroDespre';
import { ValuesSection } from '@/components/sections/about/ValuesSection';
import { TeamSection } from '@/components/sections/about/TeamSection';
import { SubBrandsSection } from '@/components/sections/about/SubBrandsSection';
import { AboutFinalCTA } from '@/components/sections/about/AboutFinalCTA';

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
      <HeroDespre
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.about') },
        ]}
      />
      <ValuesSection />
      <TeamSection />
      <SubBrandsSection />
      <AboutFinalCTA />
    </>
  );
}
