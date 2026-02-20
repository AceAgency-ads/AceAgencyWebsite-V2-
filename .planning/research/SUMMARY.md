# Project Research Summary

**Project:** AceAgency Premium Digital Agency Website (aceagency.ro)
**Domain:** Premium digital agency website — marketing, lead generation, bilingual (RO/EN)
**Researched:** 2026-02-20
**Confidence:** HIGH

## Executive Summary

AceAgency is a full-service digital marketing agency (Bucharest, Romania) building its own premium corporate website to serve as both brand flagship and lead-generation engine. Expert agency sites in 2026 follow a content-first, animation-second architecture: Server Components render all static content with near-zero JavaScript, while isolated Client Component wrappers add scroll-triggered animations and micro-interactions at the leaf level. The primary visual reference is addifico.com — component-driven bento-grid layouts, large typographic heroes, zero stock photography, and dark/light section alternation that creates rhythm without color overload. The primary technical differentiator is bilingual support (Romanian primary, English secondary) via next-intl, which must be wired correctly from day one or it silently converts every marketing page from static to server-rendered.

The recommended stack is fully validated: Next.js 16 (App Router, React 19.2), TailwindCSS 4 with CSS-first `@theme` config, shadcn/ui (new-york style, Tailwind v4 CLI), next-intl 4.8.3, Framer Motion 12 (imported from `motion/react`), GSAP 3.13 with `@gsap/react` hook, and Resend 6.9.2 for email. All versions are confirmed compatible as of February 2026 via Context7 and official documentation. The one medium-confidence risk is `@calcom/embed-react` v1.5.3 which has an open React 19 peer dependency issue (GitHub #20814) — the inline script embed is the safe fallback if the npm package causes build failures.

The critical risk cluster for this project is the intersection of performance and design ambition: animation-heavy pages targeting addifico.com quality must simultaneously achieve 90+ PageSpeed on mobile. This is achievable but requires discipline from the first animated section — GPU-only transforms, lazy-loaded GSAP, proper `useGSAP()` cleanup, and a CI performance budget gate. The second risk is GDPR/legal compliance: in Romania, GA4 and GTM must not fire before granular cookie consent is granted. Both risks are fully preventable if addressed at the foundation phase, not retrofitted.

## Key Findings

### Recommended Stack

The stack is tightly prescribed by the project's CLAUDE.md and fully verified by research. Next.js 16 with App Router is the correct framework — Turbopack is default, React 19.2 is bundled, and Server Components enable near-zero JS for static marketing pages. TailwindCSS 4 introduces CSS-first configuration (`@theme {}` blocks, no `tailwind.config.js`) which breaks naive shadcn/ui setup; the solution is to follow the official shadcn/ui Tailwind v4 guide and replace the deprecated `tailwindcss-animate` with `tw-animate-css`.

next-intl 4.8.3 is the definitive App Router i18n solution. The critical pattern is `setRequestLocale(locale)` + `generateStaticParams()` on every page — without this, all pages become SSR dynamic routes, losing edge caching and failing the LCP < 2.5s target. Animation is dual-library: Framer Motion (`motion/react`) for component-level transitions and hover states; GSAP + ScrollTrigger for complex timelines, pinned scroll sections, and text split animations. All GSAP code must live inside `useGSAP()` hook from `@gsap/react` — never raw `useEffect`.

**Core technologies:**
- Next.js 16.1.6: App Router framework — React 19.2 bundled, Turbopack default, `use cache` stable
- TailwindCSS 4.x: CSS-first utility styling — `@theme {}` config, no tailwind.config.js, faster builds
- shadcn/ui (latest CLI): Accessible UI components — new-york style, fully Tailwind v4 compatible
- next-intl 4.8.3: Bilingual routing (RO/EN) — App Router native, type-safe, `defineRouting` API
- motion 12.34.0 (import from `motion/react`): Component animations — hardware-accelerated, LazyMotion for bundle reduction
- gsap 3.13.x + @gsap/react: Advanced scroll animations — `useGSAP()` hook handles cleanup, SSR-safe
- react-hook-form 7.66.0 + zod 4.0.1: Form validation — uncontrolled components, Zod 4 significantly faster TS compilation
- resend 6.9.2 + react-email 5.2.8: Email delivery — Server Actions only, Tailwind 4 support in v5
- shadcn-cookie-consent: GDPR banner — shadcn CLI installable, MIT licensed, three variants

### Expected Features

The website needs to function as a premium brand showcase AND a lead-generation machine simultaneously. The design proves capability (the site IS the portfolio for V1), while the technical SEO foundation generates organic traffic. Every feature was evaluated against the addifico.com reference and the 90+ mobile PageSpeed constraint.

**Must have (table stakes — launch blockers):**
- Responsive design 320px–2560px — credibility baseline for any professional site
- Hero section with large typography and single CTA — first impression hook, no carousel
- Services index + 6 individual service pages — SEO surface and conversion pages
- About page — trust signal, agency story and values
- Contact form (React Hook Form + Zod + Resend + honeypot) — primary lead capture
- Bilingual support RO/EN — required for target market (next-intl)
- Cookie consent + GDPR (granular: analytics, marketing, functional) — legally mandatory in Romania
- Privacy policy, Cookie policy, Terms of service pages — EU legal requirement
- Schema markup JSON-LD: Organization, LocalBusiness, Service, FAQ, BreadcrumbList — local SEO foundation
- Canonical URLs + hreflang (RO/EN + x-default) — bilingual duplicate content prevention
- GA4 + GTM (consent-gated) + Vercel Analytics + Speed Insights — measure from day one
- Newsletter signup — lead capture below transaction threshold
- Scroll-triggered reveal animations (Framer Motion) — primary visual differentiator
- Bento-grid component design — addifico.com aesthetic, differentiates from templates
- Core Web Vitals compliance (LCP <2.5s, INP <200ms, CLS <0.1) — Google ranking signal

**Should have (competitive differentiators — V1.x after validation):**
- Cal.com booking embed — lower friction for high-intent visitors wanting to schedule a call
- Local SEO landing pages (/agentie-marketing-bucuresti, /agentie-marketing-cluj) — local search capture
- FAQ page (/intrebari-frecvente) — long-tail SEO + reduces sales friction
- Custom cursor effect — micro-interaction that signals premium craft
- Kinetic/animated typography — staggered text reveals on hero headlines
- GSAP page transitions — seamless navigation feel across pages

**Defer to V2+:**
- Blog + CMS (Sanity/Contentful) — requires editorial workflow, thin content penalty risk if launched empty
- Portfolio / Case Studies — requires client content, approvals, professional production
- Team page (Echipa) — requires team photography and bios
- Client portal / reporting dashboard — separate product scope entirely

**Explicit anti-features (never build):**
- Mobile interstitial popup — Google SEO penalty since 2017
- Video background hero — destroys LCP, accessibility failure
- Testimonial carousel — hides 95% of content, bad UX and SEO
- CMS in V1 — premature complexity; hardcode content in next-intl JSON files

### Architecture Approach

The architecture is a clean Server-first RSC pattern: all pages are Server Components that assemble section components, with interactive elements (forms, animations, locale switcher) isolated as Client Components at the leaf of the tree. This delivers maximum static rendering performance for a content-heavy marketing site — near-zero JS for static sections, with the client bundle containing only Framer Motion, GSAP, and form logic. All content lives in `messages/ro.json` and `messages/en.json` (no CMS in V1). Server Actions handle form submissions with server-side Zod re-validation, keeping Resend API keys off the client entirely.

**Major components:**
1. `app/[locale]/` route tree — Server Component page shells, `generateMetadata` per page, static generation via `generateStaticParams`
2. `components/animations/` (ScrollReveal, Parallax, TextReveal, PageTransition, GSAPInit) — all Client Components, thin wrappers that accept Server Component children
3. `lib/actions/` (contact.ts, newsletter.ts) — Server Actions with Zod validation and Resend API calls
4. `lib/seo/` (metadata.ts, schemas.ts) — server-only utilities for generateMetadata factory and JSON-LD schema builders
5. `i18n/` (routing.ts, request.ts, navigation.ts) — centralized next-intl configuration, locale middleware at Edge
6. `messages/` (ro.json, en.json) — all translatable strings, no runtime fetch, synchronous access via `useTranslations()`

### Critical Pitfalls

1. **GSAP ScrollTrigger memory leaks on route transitions** — Always use `useGSAP()` from `@gsap/react` (never raw `useEffect`). Centralize plugin registration in a single `lib/gsap.ts`. Register at Foundation Phase before writing any animation code.

2. **next-intl opts pages into dynamic SSR** — Call `setRequestLocale(locale)` at the top of every `page.tsx` and `layout.tsx` before any `useTranslations()` call. Export `generateStaticParams()` from every `[locale]` page. Verify with `next build` output: all marketing pages must show `○` (static), not `λ` (dynamic).

3. **TailwindCSS 4 CSS-first config breaks shadcn/ui** — Follow the official shadcn/ui Tailwind v4 guide (`ui.shadcn.com/docs/tailwind-v4`). Replace `tailwindcss-animate` with `tw-animate-css`. Define all brand color tokens in `@theme {}` blocks. Verify component variants render correctly after every shadcn install.

4. **Heavy animations kill mobile PageSpeed** — Test every animated section on 6x CPU throttle before merging. Animate only `transform` and `opacity` — never `height`, `width`, `margin`. Lazy-load GSAP with `dynamic(() => import(...), { ssr: false })`. Wrap all animations with `useReducedMotion()` (also WCAG AA required). Set CI gate: mobile PageSpeed must not drop below 85.

5. **GA4/GTM fires before cookie consent = GDPR violation** — Initialize GTM in `denied` consent mode. Fire analytics events only after user grants consent via cookie banner. Gate `<Analytics />` from Vercel behind the same consent state. Never load GA4 directly — always route through GTM. This is a legal risk in Romania, not just a best practice.

6. **Custom font CLS destroys Core Web Vitals** — Use `next/font/local` for Glacial Indifference and Red Hat Display, never raw `@font-face` in CSS. The `size-adjust` fallback computed by `next/font` prevents layout shift on large headings. Configure in root layout before any section is built.

7. **Duplicate/missing hreflang causes international SEO cannibalization** — Create a shared `lib/seo/metadata.ts` utility that generates `alternates.languages` with both `ro` and `en` entries plus `x-default`. All `generateMetadata()` exports call this utility — never hand-write hreflang per page.

## Implications for Roadmap

Based on the dependency graph from ARCHITECTURE.md and the pitfall-to-phase mapping from PITFALLS.md, the research strongly suggests an 8-phase build order. The architecture document provides a fully validated build sequence; the roadmap should align tightly to it.

### Phase 1: Foundation and Infrastructure

**Rationale:** Every pitfall that causes the highest recovery cost (TailwindCSS 4 + shadcn compatibility, GSAP memory leaks, next-intl static rendering, custom font CLS) must be resolved before any feature code is written. Getting foundation wrong costs 2–5 days to fix after the fact. Getting it right takes 1 day upfront.

**Delivers:** Working Next.js 16 app with TypeScript strict, TailwindCSS 4 + shadcn/ui verified, next-intl bilingual routing with static generation confirmed (`○` in build output), custom fonts via `next/font/local`, GSAP centralized in `lib/gsap.ts`, brand tokens in `globals.css`, root layout with `NextIntlClientProvider` and `GSAPInit`.

**Addresses:** Bilingual support skeleton, brand design system infrastructure, legal compliance pages (scaffolded)

**Avoids:** All 7 critical pitfalls are preventable at this phase — do not proceed to Phase 2 without verifying `next build` shows static pages and PageSpeed CLS < 0.05 on a blank hero.

### Phase 2: Design System Components

**Rationale:** All section work depends on having Button, Card, Input, and layout components (Header, Footer, Navigation) available. Building sections before the design system leads to inconsistency and rework. The Header includes the locale switcher — a Client Component — which must be verified working before any page content is added.

**Delivers:** Full shadcn/ui component set (Button, Card, Badge, Input, Textarea), Header with mobile hamburger and locale switcher, Footer, Navigation, Breadcrumbs, Cookie Consent Banner (shadcn-cookie-consent). Animation wrappers (ScrollReveal, Parallax, TextReveal, PageTransition).

**Addresses:** Responsive navigation, cookie consent GDPR (banner UI only, gating logic in Phase 5), locale switching

**Avoids:** RSC/Client boundary bloat — animation wrappers are established here as thin Client Components accepting Server children

### Phase 3: Homepage and About Page

**Rationale:** Homepage is the highest-priority page — brand showcase, first impression, design proof. It must be built and reach visual quality before service pages, because service pages inherit design patterns from the homepage. About page is built in the same phase because it shares the same section pattern complexity (hero, content blocks, CTA) and is the second most critical trust page.

**Delivers:** Full homepage (HeroSection with kinetic typography, ServicesPreview in bento grid, StatsSection with animated counters, TestimonialsSection in bento tile layout, CtaSection, NewsletterForm). About page (AgencyStory, ValuesSection). Full bilingual content for both pages in ro.json + en.json.

**Addresses:** Scroll-triggered animations, bento-grid design, zero stock photos, large typography, dark/light section transitions, testimonials (non-carousel), stats section

**Avoids:** Mobile PageSpeed regression — establish performance budget at this phase, test on 6x CPU throttle before merging hero animations

**Research flag:** Animation performance needs active testing during this phase. Set CI gate at 85+ mobile PageSpeed before merging.

### Phase 4: Service Pages

**Rationale:** Service pages are the primary SEO surface (6 dedicated pages + services index = 7 pages targeting specific keywords). They follow a repeatable pattern (ServiceHero, ServiceFeatures, ServiceFaq, ServiceCta) established from homepage work. All 6 service pages should be built in parallel within this phase — they share identical structure.

**Delivers:** Services index page, 6 service sub-pages (Google Ads, Facebook Ads, TikTok Ads, SEO, Email Marketing, Consultanta Marketing). ServiceHero, ServiceFeatures, ServiceFaq, ServiceCta section components. FAQ content per service in ro.json + en.json.

**Addresses:** Individual service pages (6x), services index, service-specific CTAs, FAQ schema markup per service

**Avoids:** Schema markup added after content is stable (SEO pitfall — URL structure must be locked before writing JSON-LD)

### Phase 5: Contact Page and Lead Capture

**Rationale:** Contact form, Cal.com booking, and newsletter are the lead generation mechanisms. They require Resend API setup, Server Actions, Zod schemas, honeypot anti-spam, and rate limiting. This phase also includes the GA4/GTM consent gating — analytics must not fire before cookie consent, and the contact form success event (`generate_lead`) is the primary conversion metric.

**Delivers:** Contact page with ContactForm (React Hook Form + Zod + Resend + honeypot + rate limiting), ContactInfo, CalBooking embed (lazy-loaded via `next/script strategy="lazyOnload"`), Google Maps embed (lazy iframe), NewsletterForm. Server Actions (`lib/actions/contact.ts`, `lib/actions/newsletter.ts`). Cookie consent gating for GA4/GTM/Vercel Analytics. `generate_lead` GA4 event on form success.

**Addresses:** Contact form, Cal.com booking, newsletter signup, GDPR analytics gating, rate limiting, form security

**Avoids:** Resend API key on client, GA4 before consent, Cal.com blocking LCP, contact form spam without rate limiting

### Phase 6: SEO and Analytics Layer

**Rationale:** SEO metadata, JSON-LD schema, hreflang, sitemap, and analytics are applied after page content is stable. Adding metadata to pages with changing content wastes time. With all pages built (Phases 3–5), the URL structure is locked and the `lib/seo/metadata.ts` utility can be written once and applied across all pages systematically.

**Delivers:** `lib/seo/metadata.ts` factory (generates full Metadata object including `alternates.languages` with hreflang for every page). `lib/seo/schemas.ts` (JSON-LD builders: Organization, LocalBusiness, Service, FAQ, BreadcrumbList). Schema injection in all pages. `app/sitemap.ts` and `app/robots.ts`. GA4 + GTM integration via `next/script strategy="afterInteractive"`. Vercel Analytics + Speed Insights in root layout.

**Addresses:** Schema markup, canonical URLs, hreflang (RO/EN + x-default), Open Graph, Twitter Card, sitemap, robots.txt, analytics tracking

**Avoids:** Hreflang errors (shared utility prevents hand-writing per page), JSON-LD XSS (sanitized stringify), GTM blocking render path

### Phase 7: Compliance and Legal Pages

**Rationale:** Legal pages (Privacy Policy, Cookie Policy, Terms of Service) are required before launch by Romanian law. FAQ page provides quick SEO win. Local SEO landing pages (/agentie-marketing-bucuresti, /agentie-marketing-cluj) are low-effort high-value additions. Custom 404 page prevents dead-end user experience.

**Delivers:** /politica-cookies, /politica-confidentialitate, /termeni-si-conditii (full bilingual content). /intrebari-frecvente (FAQ page with FAQPage schema). /agentie-marketing-bucuresti and /agentie-marketing-cluj (local SEO pages with LocalBusiness schema). Custom 404 page.

**Addresses:** GDPR legal compliance, local SEO landing pages, FAQ SEO, complete site structure

**Avoids:** Missing GDPR pages at launch (legal risk), missing local SEO opportunities

### Phase 8: Polish, Performance Audit, and Launch Readiness

**Rationale:** Final validation phase before launch. All "looks done but isn't" checklist items from PITFALLS.md are verified. Performance is audited with PageSpeed Insights on real devices. Screaming Frog crawl validates hreflang pairs. Security headers are set in `next.config.ts`. Any animation polish items (custom cursor, GSAP page transitions) are evaluated against the performance budget.

**Delivers:** PageSpeed 90+ verified on mobile (all pages). GSAP memory leak audit (heap snapshot after 10 navigations). Screaming Frog hreflang validation. Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`). Reduced motion support verified. Final bilingual content audit (every key in ro.json present in en.json). Optional polish: custom cursor effect, GSAP page transitions (only if PageSpeed budget allows).

**Addresses:** Core Web Vitals compliance, security hardening, full bilingual content, WCAG 2.1 AA accessibility

**Avoids:** Launching with hreflang errors, GSAP memory leaks, missing security headers, or GA4 before consent

### Phase Ordering Rationale

- Foundation before everything: All 7 critical pitfalls are preventable at Phase 1. Recovery costs are 2–5 days each if discovered later.
- Design system before sections: Header, Button, Card must exist before any section can be assembled.
- Homepage before service pages: Homepage sets the design standard that service pages inherit.
- Contact/forms before SEO: Analytics conversion events (`generate_lead`) require the form to exist before GTM tracking is configured.
- SEO layer after content is stable: Metadata and JSON-LD are applied to finalized pages, not moving targets.
- Compliance and legal before launch: Romanian law requires privacy/cookie pages.
- Polish phase last: Performance audit, animation polish, and security hardening are final gate.

### Research Flags

Phases likely needing attention during planning or execution:

- **Phase 1:** Cal.com embed React 19 compatibility (MEDIUM confidence — open issue #20814). Test `@calcom/embed-react` install early; fall back to inline script if peer dep fails.
- **Phase 3:** Animation performance on mobile is the highest execution risk. Budget testing time. Establish 6x CPU throttle testing before merging any animated section.
- **Phase 5:** Rate limiting implementation — research suggests Upstash Redis or `next-rate-limit`. Implementation details not fully researched; may need brief phase research.
- **Phase 6:** GTM Consent Mode v2 integration with the cookie banner — the consent-first dataLayer pattern needs careful wiring. Test before launch.

Phases with standard, well-documented patterns (safe to skip deep research):

- **Phase 2:** shadcn/ui component installation is mechanical; follow the Tailwind v4 guide exactly.
- **Phase 4:** Service pages follow identical repeatable pattern established in Phase 3.
- **Phase 7:** Legal pages are static content; minimal technical complexity.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core libraries verified via Context7 + official docs. Only exception: @calcom/embed-react React 19 peer dep (MEDIUM — open GitHub issue). |
| Features | HIGH | Derived from competitor analysis (addifico.com), project brief, and multiple 2026 industry sources. Feature priority matrix is well-grounded. |
| Architecture | HIGH | Next.js App Router patterns verified via Context7 + official Next.js + next-intl docs. RSC/Client boundary strategy is the official recommended approach. |
| Pitfalls | MEDIUM–HIGH | Critical pitfalls verified against official docs and GSAP community. Some GSAP + TailwindCSS 4 edge cases rely on community sources (MEDIUM). Security and GDPR pitfalls are legally verified (HIGH). |

**Overall confidence:** HIGH

### Gaps to Address

- **Cal.com embed compatibility:** `@calcom/embed-react` v1.5.3 has an open React 19 peer dependency issue (GitHub #20814, open Feb 2026). Attempt npm install at Phase 1; if it fails, implement inline script embed as documented in Cal.com docs. Do not block Phase 1 on this — it's a fallback, not a blocker.
- **Contact form rate limiting:** The pitfalls research identified Upstash Redis and `next-rate-limit` as options but did not fully evaluate implementation patterns for Next.js 16 Server Actions specifically. Allocate 2–4 hours in Phase 5 to evaluate and implement.
- **GTM Consent Mode v2 wiring:** The exact pattern for integrating GTM consent mode v2 with the shadcn-cookie-consent banner needs implementation-time validation. The `dataLayer.push({ event: 'consent_update', ... })` pattern is documented by Google; wiring it to the specific banner's callback API needs hands-on testing.
- **GSAP SplitText licensing:** GSAP SplitText plugin requires a GSAP membership or is bundled in the GSAP Club. If SplitText is used for TextReveal animations, verify the project has the appropriate GSAP license. Alternative: use CSS `animation-timeline` or Framer Motion's `staggerChildren` for character-level text animation without GSAP Club requirement.

## Sources

### Primary (HIGH confidence)

- Context7 `/vercel/next.js/v16.1.6` — App Router, generateMetadata, Server/Client Components, Script strategy
- Context7 `/amannn/next-intl` — `defineRouting`, `setRequestLocale`, middleware, `getRequestConfig`
- Context7 `/websites/motion_dev` — `motion/react` vs GSAP, LazyMotion, `whileInView`, hardware acceleration
- Context7 `/react-hook-form/react-hook-form/v7.66.0` — `zodResolver`, Server Actions integration
- Context7 `/colinhacks/zod/v4.0.1` — Zod v4 breaking changes, `error` param, v3/v4 coexistence
- Context7 `/llmstxt/gsap_llms_txt` — `useGSAP`, `@gsap/react`, ScrollTrigger registration
- [nextjs.org/blog/next-16](https://nextjs.org/blog/next-16) — Next.js 16 release notes
- [ui.shadcn.com/docs/tailwind-v4](https://ui.shadcn.com/docs/tailwind-v4) — shadcn/ui TailwindCSS 4 compatibility
- [next-intl.dev/blog/next-intl-4-0](https://next-intl.dev/blog/next-intl-4-0) — next-intl v4 release
- [motion.dev/docs/react-reduce-bundle-size](https://motion.dev/docs/react-reduce-bundle-size) — LazyMotion bundle reduction
- [nextjs.org/docs/app/getting-started/fonts](https://nextjs.org/docs/app/getting-started/fonts) — `next/font/local` CLS prevention
- [web.dev/articles/optimize-cls](https://web.dev/articles/optimize-cls) — CLS optimization strategies
- [nextjs.org/docs/app/guides/forms](https://nextjs.org/docs/app/guides/forms) — Server Actions form pattern

### Secondary (MEDIUM confidence)

- [UXPilot 2026 Web Design Trends](https://uxpilot.ai/blogs/web-design-trends-2026) — bento grid adoption, scroll animation conversion impact
- [GSAP community forums — useGSAP in Next.js](https://gsap.com/community/forums/topic/40128) — memory leak prevention patterns
- [Medium: Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — cleanup patterns
- [Tailwind v4 GitHub Discussion #16517](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — missing defaults edge cases
- [secureprivacy.ai: GDPR Cookie Consent 2025](https://secureprivacy.ai/blog/gdpr-cookie-consent-requirements-2025) — granular consent requirements
- [npmjs.com/@calcom/embed-react](https://www.npmjs.com/package/@calcom/embed-react) — React 19 peer dep issue #20814
- addifico.com competitor analysis (`.brief/competitors.md`) — design reference and feature patterns

### Tertiary (LOW confidence — needs validation)

- GSAP SplitText licensing requirements — verify Club GSAP membership or use CSS/Framer Motion alternative
- Cal.com inline script embed pattern — fallback for npm package React 19 incompatibility; validate against Cal.com embed docs at implementation time

---

*Research completed: 2026-02-20*
*Ready for roadmap: yes*
