import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ClientLogoBar } from '@/components/sections/home/ClientLogoBar';
import { CertificationBadges } from '@/components/sections/home/CertificationBadges';
import { ConversionProcess } from '@/components/sections/home/ConversionProcess';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { BeforeAfterPreview } from '@/components/sections/home/BeforeAfterPreview';
import { CaseStudyPreview } from '@/components/sections/home/CaseStudyPreview';
import { AboutPreview } from '@/components/sections/home/AboutPreview';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { HomeFAQ } from '@/components/sections/home/HomeFAQ';
import { CTASection } from '@/components/sections/home/CTASection';
import { ExitIntentPopup } from '@/components/sections/home/ExitIntentPopup';
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
      <CertificationBadges />
      <ConversionProcess />
      <ServicesPreview />
      <StatsSection />
      <BeforeAfterPreview />
      <CaseStudyPreview />
      <AboutPreview />
      <Testimonials />
      <HomeFAQ />
      <CTASection secondaryHref="/studii-de-caz" />
      <ExitIntentPopup />
    </>
  );
}
