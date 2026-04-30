import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ProblemSection } from '@/components/sections/home/ProblemSection';
import { ServicesROI } from '@/components/sections/home/ServicesROI';
import { ResultsTable } from '@/components/sections/home/ResultsTable';
import { TestimonialsBig } from '@/components/sections/home/TestimonialsBig';
import { HomeFAQ } from '@/components/sections/home/HomeFAQ';
import { FinalCTAUrgency } from '@/components/sections/home/FinalCTAUrgency';
import { LogoStrip, DEFAULT_CLIENTS } from '@/components/sections/LogoStrip';

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

      {/* Logo proof strip — sits between hero and problem framing */}
      <section className="bg-[#262523] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <LogoStrip dark clients={DEFAULT_CLIENTS} />
        </div>
      </section>

      <ProblemSection />
      <ServicesROI />
      <ResultsTable />
      <TestimonialsBig />
      <HomeFAQ />
      <FinalCTAUrgency />
    </>
  );
}
