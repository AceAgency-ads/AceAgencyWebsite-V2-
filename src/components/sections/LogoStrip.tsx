import { cn } from '@/lib/utils';

export type ClientLogoVariant = 'serif' | 'sans' | 'mixed' | 'tech' | 'italic';

export interface ClientLogoSpec {
  name: string;
  variant: ClientLogoVariant;
}

const VARIANT_FAMILIES: Record<ClientLogoVariant, string> = {
  serif: "'Red Hat Display', Georgia, serif",
  sans: "'Red Hat Display', Arial, sans-serif",
  mixed: "'Red Hat Display', Arial, sans-serif",
  tech: "'Inter', monospace",
  italic: "'Red Hat Display', Georgia, serif",
};
const VARIANT_WEIGHTS: Record<ClientLogoVariant, number> = {
  serif: 700,
  sans: 700,
  mixed: 500,
  tech: 600,
  italic: 500,
};
const VARIANT_TRANSFORMS: Record<ClientLogoVariant, string> = {
  serif: 'uppercase',
  sans: 'uppercase',
  mixed: 'none',
  tech: 'uppercase',
  italic: 'uppercase',
};
const VARIANT_STYLES: Record<ClientLogoVariant, 'normal' | 'italic'> = {
  serif: 'normal',
  sans: 'normal',
  mixed: 'normal',
  tech: 'normal',
  italic: 'italic',
};
const VARIANT_TRACKING: Record<ClientLogoVariant, string> = {
  serif: '0.04em',
  sans: '0.06em',
  mixed: '-0.02em',
  tech: '0.14em',
  italic: '0.04em',
};

export const DEFAULT_CLIENTS: ClientLogoSpec[] = [
  { name: 'LEONOR', variant: 'serif' },
  { name: 'TRADY', variant: 'sans' },
  { name: 'doSense', variant: 'mixed' },
  { name: 'TUTTI', variant: 'italic' },
  { name: 'AMORA', variant: 'serif' },
  { name: 'ITMAR', variant: 'tech' },
];

interface ClientLogoProps {
  name: string;
  variant: ClientLogoVariant;
  dark?: boolean;
  size?: number;
}

export function ClientLogo({
  name,
  variant,
  dark,
  size = 18,
}: ClientLogoProps): React.JSX.Element {
  return (
    <span
      className="inline-block opacity-85"
      style={{
        fontFamily: VARIANT_FAMILIES[variant],
        fontWeight: VARIANT_WEIGHTS[variant],
        fontStyle: VARIANT_STYLES[variant],
        textTransform: VARIANT_TRANSFORMS[variant] as 'uppercase' | 'none',
        letterSpacing: VARIANT_TRACKING[variant],
        fontSize: size,
        color: dark ? '#E8E6E3' : '#4a4643',
      }}
    >
      {name}
    </span>
  );
}

interface LogoStripProps {
  clients?: ClientLogoSpec[];
  dark?: boolean;
  size?: number;
  className?: string;
}

/**
 * Horizontal row of stylized client wordmarks. Each variant picks a font
 * treatment (serif / sans / italic / tech mono / mixed-case) so the strip
 * reads as a real lineup of distinct brands rather than a uniform list.
 *
 * Defaults to 6 clients (LEONOR, TRADY, doSense, TUTTI, AMORA, ITMAR).
 * Wraps to multiple rows on narrow viewports.
 */
export function LogoStrip({
  clients = DEFAULT_CLIENTS,
  dark,
  size = 18,
  className,
}: LogoStripProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-11 gap-y-4',
        className,
      )}
    >
      {clients.map((c) => (
        <ClientLogo
          key={c.name}
          name={c.name}
          variant={c.variant}
          dark={dark}
          size={size}
        />
      ))}
    </div>
  );
}
