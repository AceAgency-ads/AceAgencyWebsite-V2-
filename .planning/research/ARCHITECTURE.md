# Architecture Research

**Domain:** Premium Digital Agency Website (Next.js App Router)
**Researched:** 2026-02-20
**Confidence:** HIGH (Context7 verified + official Next.js and next-intl docs + multi-source corroboration)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                             │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Framer Motion  │  │ GSAP / ST    │  │  Cookie Consent UI   │   │
│  │  (UI transitions│  │ (scroll      │  │  GA4 / GTM events    │   │
│  │   layout anims) │  │  timelines)  │  │  Cal.com embed       │   │
│  └────────┬────────┘  └──────┬───────┘  └──────────┬───────────┘   │
│           │                  │                      │               │
│  ┌────────▼──────────────────▼──────────────────────▼───────────┐  │
│  │              Client Components ("use client")                  │  │
│  │  Header (locale switcher) │ ContactForm │ NewsletterForm       │  │
│  │  CookieBanner │ CalEmbed  │ AnimWrapper │ LocaleSwitcher       │  │
│  └────────────────────────────┬──────────────────────────────────┘  │
└───────────────────────────────│─────────────────────────────────────┘
                                │ Hydration (RSC payload)
┌───────────────────────────────▼─────────────────────────────────────┐
│                         SERVER (Vercel Edge / Node)                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    App Router (file-system)                    │  │
│  │  src/app/[locale]/                                             │  │
│  │   page.tsx (Home)       layout.tsx (Root + metadata)          │  │
│  │   despre-noi/page.tsx   servicii/page.tsx                     │  │
│  │   servicii/[slug]/page.tsx   contact/page.tsx                 │  │
│  │   intrebari-frecvente/  agentie-marketing-bucuresti/          │  │
│  │   politica-*/           termeni-si-conditii/                  │  │
│  └──────────────────┬────────────────────────────────────────────┘  │
│                     │                                                │
│  ┌──────────────────▼────────────────────────────────────────────┐  │
│  │              Server Components (default)                       │  │
│  │  Page shells │ Section layouts │ SEO metadata generation       │  │
│  │  Schema JSON-LD markup │ Breadcrumbs │ Static content blocks   │  │
│  └──────────────────┬────────────────────────────────────────────┘  │
│                     │                                                │
│  ┌──────────────────▼────────────────────────────────────────────┐  │
│  │              App Layer                                         │  │
│  │  next-intl middleware  │  i18n/routing.ts  │  i18n/request.ts │  │
│  │  Server Actions (form submit, newsletter)                      │  │
│  │  API Route Handlers (/api/contact, /api/newsletter)            │  │
│  └──────────────────┬────────────────────────────────────────────┘  │
│                     │                                                │
│  ┌──────────────────▼────────────────────────────────────────────┐  │
│  │              External Services                                 │  │
│  │  Resend (email) │ GA4 + GTM │ Vercel Analytics │ Cal.com      │  │
│  │  Google Maps embed                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Root Layout (`app/[locale]/layout.tsx`) | HTML shell, font loading, metadata base, next-intl Provider, analytics scripts | Server Component; wraps all pages |
| Page (`page.tsx`) | SEO metadata per-page, static content assembly, passes data to sections | Server Component; exports `generateMetadata` |
| Section Components (`components/sections/`) | Large page blocks (Hero, Services, Stats, Testimonials, CTA, About, FAQ) | Server Components by default; delegate interactivity to leaf Client Components |
| Layout Components (`components/layout/`) | Header, Footer, Navigation, Breadcrumbs, LocaleSwitcher | Header/LocaleSwitcher = Client (state); Footer/Breadcrumbs = Server |
| UI Components (`components/ui/`) | Atomic elements: Button, Card, Badge, Input, Textarea (shadcn/ui base) | Mix: pure display = Server; interactive = Client |
| Animation Wrappers (`components/animations/`) | ScrollReveal, Parallax, TextReveal, PageTransition — Framer Motion wrappers | All Client Components (`"use client"`) |
| Contact Form (`components/sections/ContactForm.tsx`) | React Hook Form + Zod client validation, Server Action submission, honeypot | Client Component calling a Server Action |
| Newsletter Form (`components/sections/NewsletterForm.tsx`) | Email capture, Resend integration | Client Component calling a Server Action |
| Server Actions (`lib/actions/`) | contact.ts, newsletter.ts — server-side Zod validation + Resend API calls | Pure server code, never imported on client |
| i18n Middleware (`middleware.ts`) | Locale detection, redirect, cookie persistence (next-intl) | Edge middleware |
| SEO Helpers (`lib/seo/`) | generateMetadata factories, JSON-LD schema builders (Organization, Service, FAQ, LocalBusiness, BreadcrumbList) | Server-only utilities |
| Content (`messages/`) | ro.json, en.json — all translatable strings for both locales | Static JSON, no runtime fetch needed |

---

## Recommended Project Structure

```
src/
├── app/
│   ├── [locale]/                     # next-intl locale segment (ro | en)
│   │   ├── layout.tsx                # Root layout: fonts, analytics, metadata base, Providers
│   │   ├── page.tsx                  # Home — generateMetadata + sections assembly
│   │   ├── despre-noi/
│   │   │   └── page.tsx
│   │   ├── servicii/
│   │   │   ├── page.tsx              # Services index
│   │   │   ├── google-ads/page.tsx
│   │   │   ├── facebook-ads/page.tsx
│   │   │   ├── tiktok-ads/page.tsx
│   │   │   ├── seo/page.tsx
│   │   │   ├── email-marketing/page.tsx
│   │   │   └── consultanta-marketing/page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── intrebari-frecvente/
│   │   │   └── page.tsx
│   │   ├── agentie-marketing-bucuresti/
│   │   │   └── page.tsx
│   │   ├── agentie-marketing-cluj/
│   │   │   └── page.tsx
│   │   ├── politica-cookies/page.tsx
│   │   ├── politica-confidentialitate/page.tsx
│   │   └── termeni-si-conditii/page.tsx
│   ├── api/
│   │   ├── contact/route.ts          # Fallback API route (if not using Server Actions)
│   │   └── newsletter/route.ts
│   ├── sitemap.ts                    # Next.js sitemap generation
│   ├── robots.ts                     # Next.js robots.txt generation
│   └── not-found.tsx                 # Custom 404
│
├── components/
│   ├── ui/                           # shadcn/ui atomic components (Button, Card, Input, etc.)
│   ├── layout/
│   │   ├── Header.tsx                # Client (mobile menu state)
│   │   ├── Footer.tsx                # Server
│   │   ├── Navigation.tsx            # Server (links only)
│   │   ├── LocaleSwitcher.tsx        # Client (useRouter, usePathname)
│   │   ├── Breadcrumbs.tsx           # Server
│   │   └── CookieBanner.tsx          # Client (consent state)
│   ├── sections/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CtaSection.tsx
│   │   ├── about/
│   │   │   ├── AgencyStory.tsx
│   │   │   ├── ValuesSection.tsx
│   │   │   └── TeamPreview.tsx
│   │   ├── services/
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── ServiceFeatures.tsx
│   │   │   ├── ServiceFaq.tsx
│   │   │   └── ServiceCta.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx       # Client Component
│   │   │   └── ContactInfo.tsx       # Server Component
│   │   └── shared/
│   │       ├── NewsletterForm.tsx    # Client Component
│   │       └── CalBooking.tsx        # Client Component (embed)
│   └── animations/
│       ├── ScrollReveal.tsx          # Framer Motion scroll-triggered reveal
│       ├── Parallax.tsx              # Framer Motion useScroll parallax
│       ├── TextReveal.tsx            # GSAP SplitText / char animation
│       ├── PageTransition.tsx        # Framer Motion AnimatePresence
│       └── GSAPInit.tsx             # GSAP registration, ScrollTrigger setup
│
├── lib/
│   ├── actions/
│   │   ├── contact.ts               # Server Action: validate + send via Resend
│   │   └── newsletter.ts            # Server Action: subscribe via Resend
│   ├── seo/
│   │   ├── metadata.ts              # generateMetadata factory helpers
│   │   └── schemas.ts               # JSON-LD builders: Organization, Service, FAQ, etc.
│   ├── resend.ts                    # Resend client singleton
│   └── utils.ts                    # General utilities (cn, slugify, etc.)
│
├── i18n/
│   ├── routing.ts                   # defineRouting({ locales: ['ro','en'], defaultLocale: 'ro' })
│   ├── request.ts                   # getRequestConfig (loads messages per locale)
│   └── navigation.ts               # typed Link, useRouter, usePathname wrappers
│
├── messages/
│   ├── ro.json                      # Romanian translations (primary)
│   └── en.json                      # English translations
│
├── styles/
│   ├── globals.css                  # TailwindCSS 4 base, CSS custom properties (tokens)
│   └── tokens.css                  # Brand color tokens, typography scale
│
├── types/
│   └── index.ts                    # Shared TypeScript types and interfaces
│
└── middleware.ts                   # next-intl middleware (locale routing)
```

### Structure Rationale

- **`app/[locale]/`:** The entire route tree lives under the locale segment. next-intl requires this for locale-prefixed URLs (`/ro/servicii`, `/en/services`). `generateStaticParams` in the root layout pre-renders all locale variants at build time.
- **`components/sections/`:** Organized by page/domain, not by component type. Keeps related section components co-located and makes per-page changes surgical.
- **`components/animations/`:** Isolated animation layer. All Framer Motion and GSAP code lives here. Server Components import these wrappers only where needed, keeping the client bundle lean.
- **`lib/actions/`:** Server Actions are the contact/newsletter submission boundary. Zod validation runs server-side; Resend API keys never reach the client.
- **`i18n/`:** Centralized i18n config following next-intl's recommended structure (routing, request, navigation all separate).
- **`lib/seo/`:** SEO utilities are pure server code. JSON-LD schema builders are generated per-page in Server Components, injected via `<script type="application/ld+json">`.

---

## Architectural Patterns

### Pattern 1: Server Components as Page Shells, Client Components as Leaf Nodes

**What:** Pages (`page.tsx`) are Server Components that assemble sections. Interactive elements (forms, animations, locale switcher) are isolated Client Components pushed to the leaf of the tree.

**When to use:** Always — this is the App Router default mental model.

**Trade-offs:** More files, but drastically smaller client JS bundle. The agency site ships near-zero JS for static sections.

**Example:**

```typescript
// app/[locale]/page.tsx — Server Component
import { HeroSection } from '@/components/sections/home/HeroSection'
import { ServicesPreview } from '@/components/sections/home/ServicesPreview'
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection'
import { CtaSection } from '@/components/sections/home/CtaSection'
import { NewsletterForm } from '@/components/sections/shared/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentie Marketing Digital Romania | AceAgency',
  description: 'AceAgency — agentie de marketing digital din Bucuresti...',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />         {/* Server Component — static content */}
      <ServicesPreview />     {/* Server Component — static cards */}
      <TestimonialsSection /> {/* Server Component — static quotes */}
      <CtaSection />          {/* Server Component — static content */}
      <NewsletterForm />      {/* Client Component — interactive form */}
    </>
  )
}
```

### Pattern 2: Animation Wrapper Pattern (Client Boundary at Animation Layer)

**What:** Section content is rendered on the server. An animation wrapper Client Component wraps sections to add scroll-triggered reveal. The content itself is passed as `children` (Server Component children can be passed into Client Component props).

**When to use:** Any section needing scroll-triggered or entrance animation.

**Trade-offs:** Slight complexity in understanding RSC children composition, but avoids converting entire sections to Client Components.

**Example:**

```typescript
// components/animations/ScrollReveal.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ScrollReveal({ children, delay = 0 }: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// Usage in a Server Component section:
// <ScrollReveal delay={0.2}>
//   <StatCard value="150+" label="Clienti activi" />
// </ScrollReveal>
```

### Pattern 3: Server Action Form Pattern (React Hook Form + Zod + Server Action)

**What:** ContactForm is a Client Component that uses React Hook Form for client-side UX. On submit, it calls a Server Action that re-validates with Zod on the server and sends email via Resend. Zod schema is defined once in `lib/actions/contact.ts` and shared.

**When to use:** All form submissions (contact, newsletter). Never POST to `/api/` routes — prefer Server Actions for simplicity and co-location.

**Trade-offs:** Server Actions require React 19. This stack (Next.js 16) ships with React 19, so this is the correct modern pattern.

**Example:**

```typescript
// lib/actions/contact.ts
'use server'
import { z } from 'zod'
import { resend } from '@/lib/resend'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.literal(''),  // anti-spam
})

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, error: 'Date invalide. Verifica campurile.' }
  }
  await resend.emails.send({
    from: 'contact@aceagency.ro',
    to: 'hello@aceagency.ro',
    subject: `Mesaj nou de la ${parsed.data.name}`,
    text: parsed.data.message,
  })
  return { success: true }
}
```

### Pattern 4: Metadata + JSON-LD per Page

**What:** Each `page.tsx` exports `generateMetadata` for Open Graph, Twitter Card, canonical URL. A separate `<script type="application/ld+json">` is rendered inline in the page with the relevant schema (Organization, Service, FAQ, BreadcrumbList, LocalBusiness on home).

**When to use:** Every page without exception.

**Trade-offs:** Verbose boilerplate per page. Mitigation: create `lib/seo/metadata.ts` factory functions that accept page-specific data and return the full Metadata object.

**Example:**

```typescript
// lib/seo/metadata.ts
import type { Metadata } from 'next'

export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  locale?: 'ro' | 'en'
}): Metadata {
  const base = 'https://aceagency.ro'
  const canonical = `${base}${opts.locale === 'en' ? '/en' : ''}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: 'AceAgency',
      locale: opts.locale === 'en' ? 'en_US' : 'ro_RO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  }
}
```

### Pattern 5: GSAP + Framer Motion Dual Layer

**What:** Use Framer Motion for all component-level transitions and UI micro-interactions (fade-ins, hover states, page transitions via AnimatePresence). Use GSAP (with ScrollTrigger) only for advanced timeline sequences — hero text split animations, pinned scroll sections, complex parallax that requires precise timeline control.

**When to use:** Framer Motion is the default. Reach for GSAP only when Framer Motion cannot express the animation cleanly (multi-step timelines, SplitText, ScrollTrigger pin/scrub).

**Trade-offs:** Two animation libraries increase bundle size (~50KB gzip combined). Justified for premium agency site where animation IS the product differentiator. GSAP must be registered only in a Client Component with `useEffect` (no SSR execution).

**Example:**

```typescript
// components/animations/GSAPInit.tsx
'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function GSAPInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])
  return null
}
// Placed once in root layout, before other components
```

---

## Data Flow

### Request Flow (Static Page)

```
User requests /ro/servicii/google-ads
    ↓
middleware.ts (next-intl) — detect locale, rewrite to /[locale]/servicii/google-ads
    ↓
app/[locale]/layout.tsx — Server Component: applies root layout, loads 'ro' messages
    ↓
app/[locale]/servicii/google-ads/page.tsx — Server Component
    ↓ exports generateMetadata → injected into <head>
    ↓ renders section Server Components (ServiceHero, ServiceFeatures, ServiceFaq, ServiceCta)
    ↓ renders ScrollReveal Client Component wrappers (animation boundary)
    ↓
HTML streamed to browser
    ↓
Client hydration: ScrollReveal, Header, LocaleSwitcher initialize
    ↓
GSAP ScrollTrigger registers (GSAPInit useEffect)
    ↓
Framer Motion animations begin on scroll
```

### Contact Form Submission Flow

```
User fills form (React Hook Form client validation with Zod)
    ↓
handleSubmit → calls Server Action submitContact(formData)
    ↓
Server Action: Zod re-validates on server
    ↓ (on error) → returns { success: false, error: string } → RHF shows error
    ↓ (on success) → Resend.emails.send() → returns { success: true }
    ↓
ContactForm updates UI: shows success state
    ↓
GA4 event: generate_lead fired (client-side, useEffect on success state)
```

### i18n Data Flow

```
next-intl middleware detects locale from URL prefix
    ↓
[locale] segment passed to all Server Components as param
    ↓
Root layout: NextIntlClientProvider wraps app with locale messages
    ↓
Server Components: useTranslations() accesses messages synchronously
    ↓
Client Components: useTranslations() from next-intl/client works identically
    ↓
LocaleSwitcher: router.replace(pathname, { locale: newLocale })
    → URL changes (/ro → /en), middleware handles redirect
```

### Key Data Flows Summary

1. **Page content:** All static — lives in `messages/ro.json` and `messages/en.json`. No CMS fetch in V1. Server Components read translations synchronously via `useTranslations()`.
2. **Forms:** Client → Server Action → Resend API. No intermediate API route needed.
3. **Analytics:** Client-only (GA4, GTM, Vercel Analytics). No server involvement. Deferred until after hydration to avoid CLS.
4. **SEO metadata:** Server-only. Never touches the client bundle. `generateMetadata` + JSON-LD in Server Components.
5. **Animations:** Client-only after hydration. Server renders static HTML; Framer Motion and GSAP take over on client.

---

## Build Order (Dependencies Between Components)

Build in this exact order to avoid blockers:

```
Phase 1: Foundation (blocks everything)
├── Next.js project init + TypeScript strict config
├── TailwindCSS 4 + shadcn/ui setup
├── next-intl middleware + i18n/routing.ts + i18n/request.ts
├── messages/ro.json + messages/en.json (skeleton keys)
├── app/[locale]/layout.tsx (root layout with NextIntlClientProvider)
├── styles/globals.css + styles/tokens.css (brand tokens)
└── lib/utils.ts (cn utility)

Phase 2: Design System Components (blocks sections)
├── components/ui/* (Button, Card, Badge, Input, Textarea — shadcn/ui)
├── components/layout/Header.tsx + Footer.tsx + Navigation.tsx
├── components/layout/LocaleSwitcher.tsx
└── components/layout/Breadcrumbs.tsx

Phase 3: Animation Layer (blocks section composition)
├── components/animations/ScrollReveal.tsx
├── components/animations/Parallax.tsx
├── components/animations/TextReveal.tsx
├── components/animations/PageTransition.tsx
└── components/animations/GSAPInit.tsx (registered in root layout)

Phase 4: Home + About Pages (design showcase, highest priority)
├── components/sections/home/* (Hero, ServicesPreview, Stats, Testimonials, CTA)
├── app/[locale]/page.tsx (Home)
├── components/sections/about/* (AgencyStory, Values)
└── app/[locale]/despre-noi/page.tsx

Phase 5: Service Pages (core conversion pages)
├── components/sections/services/* (ServiceHero, ServiceFeatures, ServiceFaq, ServiceCta)
├── app/[locale]/servicii/page.tsx (Services index)
└── app/[locale]/servicii/[slug]/page.tsx × 6

Phase 6: Contact + Forms (lead generation)
├── lib/resend.ts + lib/actions/contact.ts + lib/actions/newsletter.ts
├── components/sections/contact/ContactForm.tsx
├── components/sections/contact/ContactInfo.tsx
├── components/sections/shared/NewsletterForm.tsx
├── components/sections/shared/CalBooking.tsx
└── app/[locale]/contact/page.tsx

Phase 7: SEO + Analytics Layer
├── lib/seo/metadata.ts + lib/seo/schemas.ts
├── JSON-LD injection in all pages
├── app/sitemap.ts + app/robots.ts
├── GA4 + GTM integration
├── Vercel Analytics
└── Cookie consent banner (components/layout/CookieBanner.tsx)

Phase 8: Compliance + Remaining Pages
├── app/[locale]/politica-cookies/page.tsx
├── app/[locale]/politica-confidentialitate/page.tsx
├── app/[locale]/termeni-si-conditii/page.tsx
├── app/[locale]/intrebari-frecvente/page.tsx
├── app/[locale]/agentie-marketing-bucuresti/page.tsx
├── app/[locale]/agentie-marketing-cluj/page.tsx
└── app/not-found.tsx
```

**Dependency rationale:**
- Foundation must exist before anything else (layout, i18n, tokens).
- UI components must exist before sections can use them.
- Animation wrappers must exist before sections can use `<ScrollReveal>`.
- Home + About are built first because they carry the brand impression — they must reach full visual quality before proceeding.
- Server Actions and Resend must be set up before Contact form can submit.
- SEO layer is applied after page content is stable (adding metadata to moving targets wastes time).

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–10K visitors/month | Current architecture — fully sufficient. Static pages, no database, ISR not needed. |
| 10K–100K visitors/month | Enable ISR for FAQ/Blog pages when content becomes dynamic. Add Redis caching if contact form abuse detected. |
| 100K+ visitors/month | Edge middleware already in place. Add edge-rendered personalization if needed. Consider CDN image optimization (Cloudflare Images). Blog/CMS addition at V2 scale. |

**First bottleneck:** Animation bundle size (Framer Motion + GSAP ≈ 50KB gzip). Mitigation: dynamic `import()` for GSAP on pages that need it, not globally. Framer Motion can use `LazyMotion` to reduce base bundle.

**Second bottleneck:** Google Maps embed CLS and LCP impact. Use `loading="lazy"` iframe and reserve space with fixed aspect-ratio container. Consider static map image with link-to-maps fallback.

---

## Anti-Patterns

### Anti-Pattern 1: Converting Entire Sections to Client Components

**What people do:** Add `"use client"` to a section component because one child element needs `useState`.

**Why it's wrong:** The entire section (including all its children) is now part of the client bundle. Static content, headings, and icons that could have been server-rendered now ship as JS.

**Do this instead:** Keep the section as a Server Component. Extract only the interactive child (e.g., the FAQ accordion toggle, the tab switcher) into a small Client Component. Pass static content as props or children.

### Anti-Pattern 2: Putting Server Action Logic in Client Components

**What people do:** Import Resend or other server SDK directly in a `"use client"` component to avoid creating a Server Action file.

**Why it's wrong:** This leaks API keys and server credentials to the client bundle. Next.js may warn, but the build can still succeed with dangerous results.

**Do this instead:** Always place Resend calls, email logic, and API secrets in `lib/actions/*.ts` files marked `"use server"`. Client Components call the action by reference only.

### Anti-Pattern 3: Duplicating Translation Keys

**What people do:** Hard-code Romanian strings directly in components instead of routing through `messages/ro.json`, "to save time" early on.

**Why it's wrong:** Bilingual requirement means every hardcoded string must be found and moved later. At 20+ pages this becomes a painful audit.

**Do this instead:** Set up next-intl on Day 1. Add placeholder keys immediately. Even if English content is identical to Romanian initially, the key structure is already correct.

### Anti-Pattern 4: GSAP Without useEffect Boundary

**What people do:** Call `gsap.registerPlugin(ScrollTrigger)` at module level in a file imported by a Server Component.

**Why it's wrong:** GSAP accesses `window` and `document` on import. This causes SSR crashes with "window is not defined."

**Do this instead:** Always use the `GSAPInit` Client Component pattern (see Pattern 5). Register GSAP plugins inside `useEffect` only. Import GSAP dynamically if needed: `const gsap = (await import('gsap')).default`.

### Anti-Pattern 5: Loading GA4 / GTM in Blocking Script

**What people do:** Add `<script>` tags in layout without `strategy="afterInteractive"`.

**Why it's wrong:** Blocks page render, tanks LCP and INP scores. Directly contradicts the 90+ PageSpeed target.

**Do this instead:** Use Next.js `<Script strategy="afterInteractive">` for GA4 and GTM. Use `strategy="lazyOnload"` for non-critical third parties (Cal.com widget). This ensures analytics never block the critical render path.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend | Server Action only — `lib/resend.ts` singleton, called from `lib/actions/*.ts` | API key in `RESEND_API_KEY` env var; never on client |
| Google Analytics 4 | `<Script strategy="afterInteractive">` in root layout | Combined with GTM; fire custom events via `window.dataLayer.push()` |
| Google Tag Manager | `<Script strategy="afterInteractive">` + `<noscript>` iframe in `<body>` | GTM manages GA4, conversion events, cookie consent triggers |
| Cal.com | `<Script strategy="lazyOnload">` + iframe embed in ContactPage | Use Cal.com embed package or `@calcom/embed-react` Client Component |
| Google Maps | `<iframe>` with `loading="lazy"` + reserved aspect-ratio wrapper | No JS API needed for static embed; avoids Maps JS SDK weight |
| Vercel Analytics | `<Analytics />` from `@vercel/analytics/react` in root layout | Server Component compatible; no config needed on Vercel |
| Cookie Consent | Custom `CookieBanner.tsx` Client Component managing `localStorage` consent state | Consent gates GTM/GA4 script injection; required for GDPR/Romania |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Component → Client Component | Props (data down, events up) — or children composition | Never import server-only modules inside Client Component files |
| Client Component → Server Action | Direct function call reference (Next.js handles serialization) | Actions defined in `"use server"` files |
| page.tsx → Section components | Props for dynamic data; sections import translations themselves via `useTranslations()` | Pages are thin assemblers; sections own their content |
| Root layout → all pages | `NextIntlClientProvider` provides locale context; `GSAPInit` registers GSAP plugins | One-time setup; all downstream components inherit |
| i18n middleware → app | next-intl rewrites URL locale prefix; `[locale]` param available to all Server Components | Middleware runs at edge; zero latency for locale detection |

---

## Sources

- [Next.js App Router Official Docs — Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) — HIGH confidence (Context7 verified)
- [Next.js generateMetadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — HIGH confidence (Context7 verified)
- [next-intl App Router Setup with i18n Routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) — HIGH confidence (Context7 verified, official docs)
- [next-intl defineRouting Configuration](https://next-intl.dev/docs/routing/configuration) — HIGH confidence (Context7 verified)
- [Next.js Architecture in 2026 — Server-First, Client-Islands, and Scalable App Router Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — MEDIUM confidence (WebSearch, corroborated by official docs)
- [Next.js App Router Project Structure](https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure) — MEDIUM confidence (WebSearch, multiple sources agree)
- [Framer Motion + GSAP Dual Layer Pattern](https://motion.dev/docs/gsap-vs-motion) — MEDIUM confidence (official Motion docs + community corroboration)
- [React Hook Form + Zod + Server Actions pattern](https://www.deepintodev.com/blog/form-handling-in-nextjs) — MEDIUM confidence (multiple 2025 sources agree, corroborated by Next.js forms guide)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) — HIGH confidence (official docs)

---

*Architecture research for: Premium Digital Agency Website (AceAgency — Next.js App Router)*
*Researched: 2026-02-20*
