import { headers } from 'next/headers';

const translations = {
  en: {
    title: '404 - Page not found | AceAgency',
    heading: 'Page not found',
    description:
      "Sorry, the page you're looking for doesn't exist or has been moved.",
    backHome: 'Back to home',
    homeHref: '/en/',
  },
  ro: {
    title: '404 - Pagina nu a fost gasita | AceAgency',
    heading: 'Pagina nu a fost gasita',
    description:
      'Ne pare rau, pagina pe care o cauti nu exista sau a fost mutata.',
    backHome: 'Inapoi acasa',
    homeHref: '/ro/',
  },
} as const;

export default async function GlobalNotFound() {
  const headersList = await headers();
  // next-intl middleware sets this header; fall back to referer path detection
  const intlLocale = headersList.get('x-next-intl-locale');
  const referer = headersList.get('referer') ?? '';
  const locale = intlLocale === 'en' || referer.includes('/en/') || referer.includes('/en?') ? 'en' : 'ro';
  const t = translations[locale];

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t.title}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: '1.5rem',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          backgroundColor: '#262523',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1
            style={{
              fontSize: '8rem',
              fontWeight: 700,
              lineHeight: 1,
              color: '#56151A',
              margin: 0,
            }}
          >
            404
          </h1>
          <h2
            style={{
              marginTop: '1rem',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            {t.heading}
          </h2>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              color: '#D9D9D9',
              lineHeight: 1.6,
            }}
          >
            {t.description}
          </p>
          <a
            href={t.homeHref}
            style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#56151A',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {t.backHome}
          </a>
        </div>
      </body>
    </html>
  );
}
