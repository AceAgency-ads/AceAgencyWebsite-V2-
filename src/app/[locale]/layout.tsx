import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
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
      className={`${glacialIndifference.variable} ${redHatDisplay.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <header className="flex justify-end p-4">
            <LocaleSwitcher />
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
