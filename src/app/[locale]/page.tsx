import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ClientLogoBar } from '@/components/sections/home/ClientLogoBar';
import { VideoTestimonials } from '@/components/sections/home/VideoTestimonials';
import { ConversionProcess } from '@/components/sections/home/ConversionProcess';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { CaseStudyPreview } from '@/components/sections/home/CaseStudyPreview';
import { AboutPreview } from '@/components/sections/home/AboutPreview';
import { LeadMagnet } from '@/components/sections/home/LeadMagnet';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { CTASection } from '@/components/sections/home/CTASection';
import {
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  renderJsonLd,
} from '@/lib/seo/schemas';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: '',
    locale,
  });
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webSiteSchema()) }}
      />
      <HeroSection />
      <HeroTransition namespace="home" i18nPrefix="heroTransition" />
      <ClientLogoBar />
      <VideoTestimonials />
      <ConversionProcess />
      <ServicesPreview />
      <StatsSection />
      <CaseStudyPreview />
      <AboutPreview />
      <LeadMagnet />
      <Testimonials />
      <CTASection />
    </>
  );
}
