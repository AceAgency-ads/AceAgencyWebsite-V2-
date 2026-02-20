import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <ServicesPreview />
      {/* Plan 02 will add: StatsSection, AboutPreview, Testimonials, CTASection, Newsletter */}
    </main>
  );
}
