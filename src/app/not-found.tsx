export default function GlobalNotFound() {
  return (
    <html lang="ro">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 - Pagina nu a fost gasita | AceAgency</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: '1.5rem',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
            Pagina nu a fost gasita
          </h2>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              color: '#D9D9D9',
              lineHeight: 1.6,
            }}
          >
            Ne pare rau, pagina pe care o cauti nu exista sau a fost mutata.
          </p>
          <a
            href="/ro/"
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
            Inapoi acasa
          </a>
        </div>
      </body>
    </html>
  );
}
