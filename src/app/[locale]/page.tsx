import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { AboutPreview } from '@/components/sections/home/AboutPreview';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { CTASection } from '@/components/sections/home/CTASection';
import { Newsletter } from '@/components/sections/home/Newsletter';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <HeroTransition namespace="home" i18nPrefix="heroTransition" />
      <ServicesPreview />
      <StatsSection />
      <AboutPreview />
      <Testimonials />
      <CTASection />
      <Newsletter />
    </>
  );
}
