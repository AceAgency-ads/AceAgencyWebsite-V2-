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
import { Analytics } from '@vercel/analytics/next';
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
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Laboratorul de Conversii',
  description: 'Growth lab din Bucuresti specializat in sisteme de conversie',
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
        {/* GTM noscript fallback for users with JavaScript disabled */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <NextIntlClientProvider>
          <Header />
          <SmoothScroll>
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <CookieConsentBanner locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
