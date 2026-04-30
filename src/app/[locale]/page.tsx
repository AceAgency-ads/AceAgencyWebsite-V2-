import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ProblemSection } from '@/components/sections/home/ProblemSection';
import { ServicesROI } from '@/components/sections/home/ServicesROI';
import { ResultsTable } from '@/components/sections/home/ResultsTable';
import { TestimonialsBig } from '@/components/sections/home/TestimonialsBig';
import { HomeFAQ } from '@/components/sections/home/HomeFAQ';
import { FinalCTAUrgency } from '@/components/sections/home/FinalCTAUrgency';
import { LogoStrip, DEFAULT_CLIENTS } from '@/components/sections/LogoStrip';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  graph,
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  faqPageSchema,
} from '@/lib/seo/schemas';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: 'home.hero' });
  return {
    title:
      locale === 'ro'
        ? 'ACE Agency — Performance marketing din București cu ROAS măsurabil'
        : 'ACE Agency — Performance marketing from Bucharest with measurable ROAS',
    description: tHero('subline').replace(/<\/?[a-z]+>/g, ''),
    alternates: { canonical: '/' },
  };
}

interface FAQItem {
  q: string;
  a: string;
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'home.faq' });
  const faqItems = tFaq.raw('items') as readonly FAQItem[];

  const ld = graph(
    organizationSchema(),
    localBusinessSchema(),
    webSiteSchema(),
    faqPageSchema(faqItems),
  );

  return (
    <>
      <JsonLd data={ld} />
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
