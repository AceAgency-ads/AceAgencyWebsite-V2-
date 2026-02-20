// Root layout - minimal shell.
// The [locale]/layout.tsx handles all locale-aware rendering.
// This file exists only because Next.js App Router requires a root layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return children as React.JSX.Element;
}
