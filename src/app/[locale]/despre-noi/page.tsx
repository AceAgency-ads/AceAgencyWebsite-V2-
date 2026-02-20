import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/sections/about/AboutHero';
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

  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <DivisionsSection />
      <MissionVision />
      <WhyChooseUs />
      <CTASection namespace="about" secondaryHref="/servicii" />
    </>
  );
}
