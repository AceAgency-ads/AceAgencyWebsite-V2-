import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { GrowthV2Calendar } from './GrowthV2Calendar';

interface GrowthV2PageProps {
  locale: string;
}

type Copy = {
  nav: { label: string; href: string }[];
  heroLinks: { current: string; other: string };
  headerCta: string;
  footer: string[];
  vsl: {
    overline: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    body: string;
    button: string;
    note: string[];
    speaker: string;
    duration: string;
  };
  hero: {
    overline: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    trust: string[];
  };
  proof: {
    overline: string;
    title: string;
    cards: { name: string; category: string; stat: string; label: string; logo: string }[];
    link: string;
  };
  pipeline: {
    overline: string;
    title: string;
    body: string;
    items: { index: string; title: string; description: string }[];
  };
  call: {
    overline: string;
    title: string;
    body: string;
    month: string;
    confirm: string;
  };
  lead: {
    overline: string;
    title: string;
    body: string;
    items: { tag: string; title: string; description: string }[];
    cardTitle: string;
    cardBody: string;
    input: string;
    button: string;
  };
};

const copyByLocale: Record<string, Copy> = {
  ro: {
    nav: [
      { label: 'Acasă', href: '/' },
      { label: 'Servicii', href: '/servicii' },
      { label: 'Creștere V2', href: '/growth-v2' },
      { label: 'Studii de caz', href: '/studii-de-caz' },
      { label: 'Contact', href: '/contact' },
    ],
    heroLinks: { current: 'RO', other: 'EN' },
    headerCta: 'Audit gratuit',
    footer: [
      '© 2026 Laboratorul de Conversii',
      'Politica de confidențialitate',
      'contact@aceagency.ro',
    ],
    vsl: {
      overline: '7 MINUTE. FĂRĂ SLIDE-URI.',
      titleStart: '„Dacă ai 7 minute, îți arăt ',
      titleAccent: 'exact',
      titleEnd: ' cum am crescut 150 magazine.”',
      body:
        'Urmărește metoda noastră pe bune: dashboard-uri reale, sistemul de tracking și deciziile care mută ROAS-ul în direcția corectă.',
      button: 'După video, un call',
      note: ['Fără email pentru vizionare', '0 pitch generic'],
      speaker: 'Andrei Mihai · CEO & Fondator',
      duration: 'Play · 7:24',
    },
    hero: {
      overline: 'SERVICIU · CREȘTERE E-COMMERCE',
      title: 'Magazinul tău merită clienți care cumpără.',
      body:
        'Sisteme de conversie pentru magazine online din România. Google, Meta, TikTok, Email și Analytics într-un singur mecanism disciplinat.',
      primary: 'Cere audit gratuit',
      secondary: 'Vezi studiile de caz',
      trust: ['Audit în 48h', 'Fără contract minim', 'Rapoarte lunare'],
    },
    proof: {
      overline: 'STUDII DE CAZ',
      title: 'Magazine care au ales disciplina.',
      cards: [
        {
          name: 'Leonor',
          category: 'Fashion',
          stat: '+347%',
          label: 'ROAS în 90 zile',
          logo: '/images/clients/leonor.png',
        },
        {
          name: 'Trady',
          category: 'Marketplace',
          stat: '-62%',
          label: 'reducere CAC în 6 luni',
          logo: '/images/clients/trady.png',
        },
        {
          name: 'doSense',
          category: 'SaaS',
          stat: '3.8×',
          label: 'multiplicator MRR',
          logo: '/images/clients/dosense.svg',
        },
      ],
      link: 'Citește studiul',
    },
    pipeline: {
      overline: 'SISTEMUL',
      title: '5 piese. 1 sistem.',
      body:
        'Fiecare canal vorbește cu celelalte. Fără silozuri, fără date pierdute între ads, CRO, email și analytics.',
      items: [
        { index: '01', title: 'Ads', description: 'Google, Meta, TikTok' },
        { index: '02', title: 'Landing', description: 'CRO + A/B tests' },
        { index: '03', title: 'Email', description: 'Flows + campanii' },
        { index: '04', title: 'Analytics', description: 'GA4 + server-side' },
        { index: '05', title: 'Raport', description: 'Lunar + weekly call' },
      ],
    },
    call: {
      overline: 'BOOK CALL',
      title: 'Alege o oră. Vorbim 30 min.',
      body:
        'Discovery call cu un strategist senior. Zero pitch, doar întrebări serioase despre magazinul tău și unde se pierde conversia.',
      month: 'Noiembrie 2026',
      confirm: 'Confirmă ·',
    },
    lead: {
      overline: 'KIT GRATUIT · 3 RESURSE',
      title: 'Tot ce ai nevoie să începi.',
      body:
        'Un PDF. Un audit copiabil în Notion. Template-uri de email gata de importat. Le primești împreună, le aplici separat.',
      items: [
        {
          tag: 'PDF',
          title: 'Playbook PDF',
          description: '38 pagini · metodologie completă',
        },
        {
          tag: 'NOTION',
          title: '47-point audit',
          description: 'Checklist Notion · copiabil',
        },
        {
          tag: 'JSON',
          title: '6 email flows',
          description: 'Template-uri Klaviyo · import direct',
        },
      ],
      cardTitle: 'Primește kit-ul complet pe email',
      cardBody: 'Livrare instant · fără abonament · dezabonare oricând',
      input: 'Email',
      button: 'Descarcă',
    },
  },
  en: {
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/servicii' },
      { label: 'Growth V2', href: '/growth-v2' },
      { label: 'Case Studies', href: '/studii-de-caz' },
      { label: 'Contact', href: '/contact' },
    ],
    heroLinks: { current: 'EN', other: 'RO' },
    headerCta: 'Free audit',
    footer: [
      '© 2026 Conversion Lab',
      'Privacy policy',
      'contact@aceagency.ro',
    ],
    vsl: {
      overline: '7 MINUTES. NO SLIDES.',
      titleStart: '"If you have 7 minutes, I’ll show you ',
      titleAccent: 'exactly',
      titleEnd: ' how we scaled 150 stores."',
      body:
        'Watch the real method: live dashboards, tracking architecture, and the decisions that move ROAS in the right direction.',
      button: 'Watch, then talk',
      note: ['No email required', '0 generic pitch'],
      speaker: 'Andrei Mihai · CEO & Founder',
      duration: 'Play · 7:24',
    },
    hero: {
      overline: 'SERVICE · ECOMMERCE GROWTH',
      title: 'Your store deserves customers who buy.',
      body:
        'Conversion systems for ecommerce brands. Google, Meta, TikTok, Email, and Analytics in one disciplined growth mechanism.',
      primary: 'Request free audit',
      secondary: 'See case studies',
      trust: ['48h audit', 'No minimum contract', 'Monthly reporting'],
    },
    proof: {
      overline: 'CASE STUDIES',
      title: 'Brands that chose discipline.',
      cards: [
        {
          name: 'Leonor',
          category: 'Fashion',
          stat: '+347%',
          label: 'ROAS in 90 days',
          logo: '/images/clients/leonor.png',
        },
        {
          name: 'Trady',
          category: 'Marketplace',
          stat: '-62%',
          label: 'CAC reduction in 6 months',
          logo: '/images/clients/trady.png',
        },
        {
          name: 'doSense',
          category: 'SaaS',
          stat: '3.8×',
          label: 'MRR multiplier',
          logo: '/images/clients/dosense.svg',
        },
      ],
      link: 'Read the case study',
    },
    pipeline: {
      overline: 'THE SYSTEM',
      title: '5 parts. 1 system.',
      body:
        'Every channel talks to the others. No silos, no data loss between ads, CRO, email, and analytics.',
      items: [
        { index: '01', title: 'Ads', description: 'Google, Meta, TikTok' },
        { index: '02', title: 'Landing', description: 'CRO + A/B testing' },
        { index: '03', title: 'Email', description: 'Flows + campaigns' },
        { index: '04', title: 'Analytics', description: 'GA4 + server-side' },
        { index: '05', title: 'Reporting', description: 'Monthly + weekly call' },
      ],
    },
    call: {
      overline: 'BOOK A CALL',
      title: 'Pick a time. We talk for 30 min.',
      body:
        'Discovery call with a senior strategist. No pitch, just serious questions about your store and where conversion is leaking.',
      month: 'November 2026',
      confirm: 'Confirm ·',
    },
    lead: {
      overline: 'FREE KIT · 3 RESOURCES',
      title: 'Everything you need to start.',
      body:
        'A PDF. A copyable Notion audit. Email templates ready to import. Delivered together, used separately.',
      items: [
        {
          tag: 'PDF',
          title: 'Playbook PDF',
          description: '38 pages · full methodology',
        },
        {
          tag: 'NOTION',
          title: '47-point audit',
          description: 'Copyable Notion checklist',
        },
        {
          tag: 'JSON',
          title: '6 email flows',
          description: 'Klaviyo templates · direct import',
        },
      ],
      cardTitle: 'Get the full kit by email',
      cardBody: 'Instant delivery · no subscription · unsubscribe anytime',
      input: 'Email',
      button: 'Download',
    },
  },
};

export function GrowthV2Page({
  locale,
}: GrowthV2PageProps): React.JSX.Element {
  const copy = (copyByLocale[locale] ?? copyByLocale['ro']) as Copy;
  const otherLocale = locale === 'ro' ? 'en' : 'ro';
  const chartHeights = ['h-[30%]', 'h-[36%]', 'h-[42%]', 'h-[55%]', 'h-[60%]', 'h-[72%]', 'h-[84%]', 'h-full'];

  return (
    <div id="top" className="bg-[#1A1918] text-[#D9D9D9]">
      <header className="fixed inset-x-0 top-4 z-40">
        <Container>
          <div className="flex items-center justify-between gap-4 rounded-full border border-[#4A464380] bg-[rgba(38,37,35,0.78)] px-4 py-3 backdrop-blur-xl sm:px-6">
            <Link href="/" className="shrink-0">
              <Image
                src="/ace-agency-logo.webp"
                alt="Laboratorul de Conversii"
                width={132}
                height={28}
                className="h-6 w-auto brightness-0 invert"
              />
            </Link>

            <nav className="hidden items-center gap-6 font-body text-[14px] text-[#D9D9D9] lg:flex">
              {copy.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.href === '/growth-v2' ? 'text-[#66F3A6]' : 'hover:text-white'}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden font-body text-[12px] text-[#D9D9D9] sm:block">
                <span className="font-semibold text-[#66F3A6]">
                  {copy.heroLinks.current}
                </span>{' '}
                |{' '}
                <Link href="/growth-v2" locale={otherLocale} className="hover:text-white">
                  {copy.heroLinks.other}
                </Link>
              </div>
              <a
                href="#contact"
                className="inline-flex rounded-full bg-[#650CBE] px-4 py-2.5 font-body text-[13px] font-semibold text-white transition-colors hover:bg-[#4500D0]"
              >
                {copy.headerCta}
              </a>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <section className="relative overflow-hidden px-0 pb-24 pt-36 sm:pt-44">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(101,12,190,0.32),transparent_70%)] blur-2xl" />
          <div className="absolute right-0 top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(69,0,208,0.24),transparent_72%)] blur-3xl" />
          <Container className="relative">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D9D9D9]">
              {copy.vsl.overline}
            </p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="max-w-[30rem]">
                <h1 className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] text-white">
                  {copy.vsl.titleStart}
                  <span className="font-subheading font-medium italic text-[#66F3A6]">
                    {copy.vsl.titleAccent}
                  </span>
                  {copy.vsl.titleEnd}
                </h1>
                <p className="mt-6 max-w-[25rem] font-subheading text-[18px] leading-[1.6] text-[#D9D9D9]">
                  {copy.vsl.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="inline-flex rounded-full bg-[#650CBE] px-7 py-4 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#4500D0]"
                  >
                    {copy.vsl.button} →
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-6 font-body text-[12px] text-[#A0A0A0]">
                  {copy.vsl.note.map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#4A464380] bg-[#111111] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <div className="relative overflow-hidden rounded-[22px]">
                  <Image
                    src="/images/growth/vsl-thumb.webp"
                    alt={copy.vsl.speaker}
                    width={1280}
                    height={720}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.7))]" />
                  <div className="absolute left-4 top-4 rounded-full bg-[rgba(0,0,0,0.72)] px-4 py-2 font-body text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {copy.vsl.speaker}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <div className="flex size-[5.5rem] items-center justify-center rounded-full bg-[#650CBE] shadow-[0_20px_60px_rgba(101,12,190,0.5)]">
                      <div className="ml-1 h-0 w-0 border-b-[14px] border-l-[22px] border-t-[14px] border-b-transparent border-l-white border-t-transparent" />
                    </div>
                    <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
                      {copy.vsl.duration}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full w-1/3 rounded-full bg-[#66F3A6]" />
                      </div>
                      <span className="font-body text-[11px] text-white">2:31 / 7:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden pb-24">
          <div className="absolute right-[-8rem] top-[-2rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(101,12,190,0.18),transparent_72%)] blur-3xl" />
          <Container className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D9D9D9]">
                {copy.hero.overline}
              </p>
              <h2 className="mt-5 max-w-[40rem] font-heading text-[clamp(2.8rem,6vw,4.75rem)] leading-[0.96] tracking-[-0.03em] text-white">
                {copy.hero.title}
              </h2>
              <p className="mt-7 max-w-[32rem] font-subheading text-[19px] leading-[1.6] text-[#D9D9D9]">
                {copy.hero.body}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex rounded-full bg-[#650CBE] px-7 py-4 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#4500D0]"
                >
                  {copy.hero.primary} →
                </a>
                <a
                  href="#proof"
                  className="inline-flex rounded-full border border-white/30 px-7 py-4 font-body text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {copy.hero.secondary}
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-6 font-body text-[12px] text-[#A0A0A0]">
                {copy.hero.trust.map((item) => (
                  <span key={item}>✓ {item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#4A464380] bg-[#3A3836] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.12em] text-[#A0A0A0]">
                  Dashboard · Octombrie
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[18px] bg-[#650CBE] p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.12em] text-white/80">
                    ROAS
                  </p>
                  <p className="mt-3 font-heading text-[52px] leading-none tracking-[-0.03em] text-white">
                    5.2×
                  </p>
                  <p className="mt-2 font-body text-[11px] text-white/75">
                    +142% vs. luna trecută
                  </p>
                </div>
                <div className="rounded-[18px] border border-[#4A464380] bg-[#262523] p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0]">
                    CAC
                  </p>
                  <p className="mt-3 font-heading text-[52px] leading-none tracking-[-0.03em] text-white">
                    47
                    <span className="ml-2 font-body text-[18px] text-[#A0A0A0]">lei</span>
                  </p>
                  <p className="mt-2 font-body text-[11px] text-[#66F3A6]">-38%</p>
                </div>
              </div>
              <div className="mt-3 rounded-[18px] border border-[#4A464380] bg-[#262523] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-body text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0]">
                    Venit generat · 30 zile
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.12em] text-[#66F3A6]">
                    ▲ 24%
                  </p>
                </div>
                <div className="mt-5 grid h-28 grid-cols-8 items-end gap-2">
                  {chartHeights.map((heightClass) => (
                    <div key={heightClass} className="flex h-full items-end">
                      <div
                        className={`w-full rounded-t-full bg-[linear-gradient(180deg,#66F3A6_0%,#4500D0_100%)] ${heightClass}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="proof" className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-[#FAF9F7] px-6 py-20 text-[#262523] sm:px-8 lg:px-10">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#71706E]">
              {copy.proof.overline}
            </p>
            <h2 className="mt-4 max-w-[42rem] font-heading text-[clamp(2.4rem,5vw,4rem)] leading-[1] tracking-[-0.03em]">
              {copy.proof.title}
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {copy.proof.cards.map((card, index) => (
                <article
                  key={card.name}
                  className={`flex min-h-[320px] flex-col justify-between rounded-[28px] p-8 text-white ${
                    index === 0
                      ? 'bg-[#650CBE]'
                      : index === 1
                        ? 'bg-[#3A3836]'
                        : 'bg-[#262523]'
                  }`}
                >
                  <div>
                    <Image
                      src={card.logo}
                      alt={card.name}
                      width={132}
                      height={32}
                      className="h-7 w-auto brightness-0 invert"
                    />
                    <p className="mt-4 font-body text-[11px] uppercase tracking-[0.14em] text-white/65">
                      {card.category}
                    </p>
                  </div>
                  <div>
                    <p className="font-heading text-[72px] leading-none tracking-[-0.04em]">
                      {card.stat}
                    </p>
                    <p className="mt-2 font-body text-[13px] text-white/80">
                      {card.label}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 font-body text-[13px] font-medium">
                      <span>{copy.proof.link}</span>
                      <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="relative overflow-hidden py-24">
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(101,12,190,0.2),transparent_72%)] blur-3xl" />
          <Container className="relative">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D9D9D9]">
              {copy.pipeline.overline}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-0.03em] text-white">
              {copy.pipeline.title}
            </h2>
            <p className="mt-5 max-w-[35rem] font-subheading text-[19px] leading-[1.6] text-[#D9D9D9]">
              {copy.pipeline.body}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              {copy.pipeline.items.map((item, index) => (
                <div key={item.index} className="contents">
                  <div
                    className={`min-w-[180px] flex-1 rounded-[24px] p-6 ${
                      index % 2 === 0
                        ? 'border border-[#4A464380] bg-[#3A3836]'
                        : 'bg-[#650CBE]'
                    }`}
                  >
                    <p
                      className={`font-body text-[10px] uppercase tracking-[0.14em] ${
                        index % 2 === 0 ? 'text-[#A0A0A0]' : 'text-white/75'
                      }`}
                    >
                      {item.index}
                    </p>
                    <h3 className="mt-3 font-heading text-[28px] leading-none text-white">
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 font-body text-[13px] ${
                        index % 2 === 0 ? 'text-[#D9D9D9]' : 'text-white/85'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  {index < copy.pipeline.items.length - 1 && (
                    <span className="hidden text-[24px] text-[#66F3A6] lg:inline">→</span>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="contact" className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-[#FAF9F7] px-6 py-20 text-[#262523] sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="max-w-[30rem]">
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#71706E]">
                  {copy.call.overline}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-0.03em]">
                  {copy.call.title}
                </h2>
                <p className="mt-5 font-subheading text-[18px] leading-[1.6] text-[#71706E]">
                  {copy.call.body}
                </p>
              </div>

              <GrowthV2Calendar
                locale={locale}
                monthLabel={copy.call.month}
                confirmPrefix={copy.call.confirm}
              />
            </div>
          </div>
        </section>

        <section id="lead-kit" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-[#FAF9F7] px-6 py-20 text-[#262523] sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#650CBE]">
                {copy.lead.overline}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-0.03em]">
                {copy.lead.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[35rem] font-subheading text-[18px] leading-[1.6] text-[#71706E]">
                {copy.lead.body}
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {copy.lead.items.map((item) => (
                <article
                  key={item.title}
                  className="flex min-h-[240px] flex-col justify-between rounded-[24px] border border-[#E8E6E3] bg-white p-7"
                >
                  <div>
                    <span className="inline-flex rounded-md bg-[#262523] px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      {item.tag}
                    </span>
                    <h3 className="mt-5 font-heading text-[30px] leading-[1.02]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-[14px] leading-[1.6] text-[#71706E]">
                      {item.description}
                    </p>
                  </div>
                  <p className="mt-8 font-body text-[12px] font-semibold text-[#650CBE]">
                    Inclus în kit →
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-6 rounded-[28px] bg-[#262523] p-8 text-white lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-heading text-[26px] leading-tight">
                  {copy.lead.cardTitle}
                </h3>
                <p className="mt-2 font-body text-[13px] text-[#A0A0A0]">
                  {copy.lead.cardBody}
                </p>
              </div>
              <div className="flex w-full max-w-[440px] flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder={copy.lead.input}
                  className="min-h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-body text-[15px] text-white outline-none placeholder:text-[#A0A0A0]"
                />
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#650CBE] px-6 py-3 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#4500D0]"
                >
                  {copy.lead.button} →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4A464380] bg-[#1A1918] py-10">
        <Container className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Image
            src="/ace-agency-logo.webp"
            alt="Laboratorul de Conversii"
            width={120}
            height={26}
            className="h-6 w-auto brightness-0 invert"
          />
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-body text-[12px] text-[#A0A0A0]">
            {copy.footer.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Container>
      </footer>
    </div>
  );
}
