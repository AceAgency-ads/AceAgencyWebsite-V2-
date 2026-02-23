import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CookieConsentBanner } from '@/components/layout/CookieConsent';
import { GTM_CONSENT_DEFAULT_SCRIPT } from '@/lib/gtm';

import '@/styles/globals.css';

const glacialIndifference = localFont({
  src: [
    {
      path: '../../../public/fonts/GlacialIndifference-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/GlacialIndifference-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-glacial',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const redHatDisplay = localFont({
  src: '../../../public/fonts/RedHatDisplay-Regular.woff2',
  variable: '--font-red-hat',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AceAgency',
  description: 'Premium digital agency from Bucharest',
};

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`lenis lenis-smooth ${glacialIndifference.variable} ${redHatDisplay.variable} ${inter.variable}`}
    >
      <head>
        {/* GTM Consent Mode v2: default all consent to denied BEFORE GTM loads */}
        <Script id="gtm-consent-default" strategy="beforeInteractive">
          {GTM_CONSENT_DEFAULT_SCRIPT}
        </Script>

        {/* GTM container script: only injected when NEXT_PUBLIC_GTM_ID is set */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body>
        <NextIntlClientProvider>
          <Header />
          <SmoothScroll>
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <CookieConsentBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
