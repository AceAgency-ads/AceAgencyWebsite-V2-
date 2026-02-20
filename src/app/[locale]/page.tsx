import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent(): React.JSX.Element {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Hero Section — demonstrates brand colors + fonts ── */}
      <section className="bg-electric-violet text-white py-24">
        <Container>
          <span className="inline-block text-electric-mint text-sm font-medium uppercase tracking-widest mb-4">
            {t('hero.badge')}
          </span>
          {/* H1: renders in Glacial Indifference (--font-heading via @layer base) */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.heading')}
          </h1>
          {/* Subheading: Red Hat Display via explicit font-subheading class */}
          <p
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            {t('hero.subheading')}
          </p>
          {/* Button: min 48x48px tap target via shadcn/ui Button */}
          <Button
            size="lg"
            className="bg-electric-mint text-black font-semibold hover:bg-electric-mint/90 min-h-[3rem] px-8"
          >
            {t('hero.cta')}
          </Button>
        </Container>
      </section>

      {/* ── Color Tokens Section — demonstrates all brand utilities ── */}
      <section className="py-20 bg-black">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-10">
              {t('colors.heading')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ColorSwatch
                bg="bg-electric-violet"
                label={t('colors.electricViolet')}
                hex="#650CBE"
              />
              <ColorSwatch
                bg="bg-cobalt-blue"
                label={t('colors.cobaltBlue')}
                hex="#4500D0"
              />
              <ColorSwatch
                bg="bg-electric-mint"
                label={t('colors.electricMint')}
                hex="#66F3A6"
                dark
              />
              <ColorSwatch
                bg="bg-black border border-grey/30"
                label={t('colors.black')}
                hex="#262523"
              />
              <ColorSwatch
                bg="bg-grey"
                label={t('colors.grey')}
                hex="#D9D9D9"
                dark
              />
              <ColorSwatch
                bg="bg-burgundy"
                label={t('colors.burgundy')}
                hex="#56151A"
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── Animation Section — demonstrates GSAP ScrollReveal ── */}
      <section className="py-20 bg-background">
        <Container>
          <ScrollReveal yOffset={60} duration={1} start="top 80%">
            <div className="border border-border rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('animation.heading')}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {t('animation.description')}
              </p>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm">
                  GSAP 3.13
                </span>
                <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm">
                  @gsap/react useGSAP
                </span>
                <span className="bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm">
                  ScrollTrigger
                </span>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── Typography Section — demonstrates font rendering ── */}
      <section className="py-20 bg-black/40">
        <Container>
          <ScrollReveal>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-foreground">
                H1 — Glacial Indifference Bold
              </h1>
              <h2 className="text-4xl font-bold text-foreground">
                H2 — Glacial Indifference Bold
              </h2>
              <h3 className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-subheading)' }}>
                H3 — Red Hat Display Regular
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Body text renders in Inter — the web-safe fallback. Minimum font size is 16px
                as required by project rules and WCAG 2.1 AA accessibility guidelines.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}

interface ColorSwatchProps {
  readonly bg: string;
  readonly label: string;
  readonly hex: string;
  readonly dark?: boolean;
}

function ColorSwatch({ bg, label, hex, dark = false }: ColorSwatchProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-full aspect-square rounded-xl ${bg}`} />
      <div>
        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-white'}`}>{label}</p>
        <p className="text-xs text-muted-foreground font-mono">{hex}</p>
      </div>
    </div>
  );
}
