import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { GoogleMap } from '@/components/sections/contact/GoogleMap';
import { ContactFAQ } from '@/components/sections/contact/ContactFAQ';
import { BookingSection } from '@/components/sections/contact/BookingSection';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const title = t('meta.title');
  const description = t('meta.description');

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AceAgency',
    url: 'https://aceagency.ro',
    email: 'cretualin@aceagency.ro',
    telephone: '+40750465757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bulevardul Aviatorilor 106',
      addressLocality: 'Bucuresti',
      addressCountry: 'RO',
    },
  };

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/contact`,
      languages: {
        ro: 'https://aceagency.ro/ro/contact',
        en: 'https://aceagency.ro/en/contact',
        'x-default': 'https://aceagency.ro/ro/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/contact`,
      siteName: 'AceAgency',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'script:ld+json': JSON.stringify(organizationSchema),
    },
  };
}

export default async function ContactPage({
  params,
}: ContactPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <ContactHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.contact') },
        ]}
      />

      {/* Form + Info two-column section */}
      <SectionWrapper theme="dark" id="contact-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-16">
          <div>
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </SectionWrapper>

      <GoogleMap />

      <BookingSection />

      <ContactFAQ />
    </>
  );
}
