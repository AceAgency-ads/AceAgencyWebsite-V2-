import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AceAgency',
  description: 'Premium digital agency from Bucharest',
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
