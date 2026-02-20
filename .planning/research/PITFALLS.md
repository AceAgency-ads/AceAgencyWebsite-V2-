# Pitfalls Research

**Domain:** Premium digital agency website (Next.js 16 App Router + TailwindCSS 4 + GSAP + Framer Motion + next-intl)
**Researched:** 2026-02-20
**Confidence:** MEDIUM–HIGH (multiple sources verified; some GSAP + TailwindCSS 4 edge cases LOW confidence pending production verification)

---

## Critical Pitfalls

### Pitfall 1: GSAP ScrollTrigger Memory Leaks on Route Transitions

**What goes wrong:**
GSAP ScrollTrigger instances are not killed when navigating between pages in the App Router. After a few navigations the scroll position triggers misfire, animations play on top of each other, and memory consumption grows until the browser tab slows to a crawl. The problem is compounded by calling `gsap.registerPlugin(ScrollTrigger)` in multiple component files, creating duplicate plugin registrations.

**Why it happens:**
Next.js App Router does soft client-side navigation. Components unmount, but if `ScrollTrigger.kill()` is not called in the cleanup function of `useGSAP()`, GSAP's internal registry still holds references to DOM nodes that no longer exist. Developers copy-paste animation code into each component without centralizing plugin registration, leading to multiple independent GSAP contexts.

**How to avoid:**
1. Create a single `lib/gsap.ts` that imports and registers all plugins once: `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)`.
2. Use the official `useGSAP()` hook (from `@gsap/react`) in every component that animates. It wraps `gsap.context()` internally and automatically kills all child animations and ScrollTriggers on unmount.
3. Call `ScrollTrigger.refresh()` once after all page animations are initialized to reconcile scroll positions after React's render.
4. Never call `ScrollTrigger.killAll()` in cleanup — kill only the context created by `useGSAP()`.

**Warning signs:**
- Animations play twice on the second visit to a page.
- Console memory usage grows with each navigation in Chrome DevTools.
- ScrollTrigger start/end positions drift after the first page load.
- `ScrollTrigger.getAll().length` grows instead of resetting on navigation.

**Phase to address:** Phase 1 (Foundation / Design System Setup) — establish `lib/gsap.ts` and a `useGSAP` pattern before writing any animation code.

---

### Pitfall 2: Framer Motion Forces Every Animated Section to be a Client Component

**What goes wrong:**
Every component that imports from `framer-motion` must be a Client Component (`"use client"`). On a design-first site like this one, developers annotate large page sections as `"use client"` just to add an entrance animation, eliminating the RSC (React Server Component) benefits — larger JS bundle, slower TTI, and potential LCP regression on mobile.

**Why it happens:**
The `motion.*` API requires browser APIs (`window`, `document`). Developers don't think about the RSC boundary until they see the lint error and add `"use client"` to the nearest parent, which is often the entire page section rather than a small animation wrapper.

**How to avoid:**
1. Use `LazyMotion` + the `m` component from `framer-motion/client` to reduce the initial motion bundle from ~34 KB gzipped to ~4.6 KB.
2. Create thin animation wrapper components (`AnimatedSection`, `FadeIn`, `SlideUp`) that are Client Components. Keep the actual content (text, images, cards) as Server Components and pass them as `children`.
3. Reserve Framer Motion for UI interactions and page transitions. Use GSAP for heavy scroll-triggered sequences — GSAP can be initialized inside `useGSAP()` in a small Client Component wrapper without polluting page-level RSCs.

**Warning signs:**
- More than 3–4 files have `"use client"` at the top of what should be content components.
- Bundle analyzer shows `framer-motion` in the initial JS chunk.
- PageSpeed Insights flags "Reduce unused JavaScript" with framer-motion listed.

**Phase to address:** Phase 1 (Foundation) — define the RSC/Client boundary strategy before animations are coded; Phase 2 (Homepage) — verify with bundle analyzer before merging.

---

### Pitfall 3: TailwindCSS 4 CSS-First Config Breaks shadcn/ui CLI and Third-Party Plugins

**What goes wrong:**
TailwindCSS v4 removes `tailwind.config.js` entirely. Configuration moves to `@theme {}` blocks inside the global CSS file. The standard `shadcn/ui` CLI (`npx shadcn-ui@latest add`) writes to `tailwind.config.js` — which no longer exists — causing silent failures where components install but their styles do not apply. Similarly, `tailwindcss-animate` was deprecated in March 2025 and must be replaced.

**Why it happens:**
The official Tailwind v4 upgrade guide is thorough, but most third-party tutorials and copy-pasted snippets still reference the v3 config format. Developers follow shadcn/ui docs written for Tailwind v3 and wonder why component variants don't render correctly.

**How to avoid:**
1. Follow the official shadcn/ui Tailwind v4 guide at `ui.shadcn.com/docs/tailwind-v4`. Use the updated CLI flags.
2. Replace `@plugin "tailwindcss-animate"` with the new inline CSS animation approach or an equivalent v4-compatible library.
3. Define all brand tokens (`--color-ace-violet`, `--color-ace-mint`, etc.) in `@theme {}` blocks, not in a separate config file.
4. After installing any new shadcn component, verify the output CSS actually contains the component variant classes in the dev build.
5. Run `npx @tailwindcss/upgrade@next` after any major dependency update.

**Warning signs:**
- Component variants (e.g., `Button variant="outline"`) render with no background or border.
- Build succeeds but styles are missing in the browser.
- Any file in the project still imports from or references `tailwind.config.js`.
- Default border color appears as `currentColor` (black) where gray was expected.

**Phase to address:** Phase 1 (Foundation) — set up TailwindCSS 4 + shadcn/ui correctly before any component work begins.

---

### Pitfall 4: next-intl Opt-Out of Static Rendering

**What goes wrong:**
next-intl's `useTranslations()` in a Server Component causes the entire route to switch from static generation to dynamic rendering at request time. A marketing website that should be fully static (no database, no user-specific data) ends up as SSR on every request, losing Vercel Edge caching benefits and increasing LCP on all pages.

**Why it happens:**
next-intl's default behavior reads the locale from the request headers, which prevents static generation. The `setRequestLocale()` API was introduced to opt pages back into static rendering, but it is classified as a "temporary" unstable API and many developers skip it because the docs bury it under a warning.

**How to avoid:**
1. Call `setRequestLocale(locale)` at the top of every page component (`page.tsx`) and layout (`layout.tsx`) that uses translations. This must be the first thing called before any `useTranslations()` call.
2. Export `generateStaticParams()` from every `[locale]` page to generate static paths for both `ro` and `en` at build time.
3. Verify with `next build` output — pages should show the `○` (static) icon, not `λ` (dynamic).
4. Keep `generateStaticParams` in sync with the `locales` array defined in `i18n/routing.ts`.

**Warning signs:**
- `next build` output shows `λ` (server-side) for pages that have no dynamic data.
- Vercel dashboard shows high function invocation counts for marketing pages.
- Slow TTFB (>300ms) on pages that should be cached at the edge.

**Phase to address:** Phase 1 (Foundation / i18n Setup) — implement `setRequestLocale` pattern in the base layout from day one before any page is built.

---

### Pitfall 5: CLS from Unsized Custom Fonts (Glacial Indifference / Red Hat Display)

**What goes wrong:**
The brand fonts (Glacial Indifference, Red Hat Display) are not in Google Fonts — they must be self-hosted. If loaded naively with a `<link>` tag or without `next/font/local`, the browser renders a fallback font first, then swaps to the brand font. This font swap causes a layout shift (CLS) that can push the score above 0.1, failing the Core Web Vitals target. On large hero headings (H1 at 80px+), a font metric difference of even 5% can shift the entire page.

**Why it happens:**
Developers place `.woff2` files in `/public/fonts/` and reference them in CSS `@font-face` rules. This bypasses `next/font`'s automatic `size-adjust` fallback calculation, which precomputes a fallback font that matches the exact metrics of the custom font, preventing layout shift before the custom font loads.

**How to avoid:**
1. Use `next/font/local` for Glacial Indifference and Red Hat Display in `app/layout.tsx`. Specify `src`, `weight`, `style`, and `display: 'swap'` (or `'optional'` for critical headings).
2. Provide the font via `variable` and apply the CSS variable to `<html>` so all components can reference it without re-loading.
3. `preload: true` (default in `next/font`) ensures the font file is included in the `<head>` `<link rel="preload">`, eliminating the FOUT race condition.
4. After deployment, check PageSpeed Insights for "Ensure text remains visible during webfont load" and CLS contributions.

**Warning signs:**
- `@font-face` rules appear in global CSS files referencing `/fonts/Glacial*.woff2` directly.
- PageSpeed Insights reports CLS > 0.05 on the homepage.
- DevTools Performance tab shows a "Font" entry causing layout recalculation during page load.

**Phase to address:** Phase 1 (Foundation) — configure `next/font/local` in the root layout before any typography or hero section is built.

---

### Pitfall 6: Heavy Animations Kill Mobile PageSpeed (LCP and INP regression)

**What goes wrong:**
The design target is addifico.com-level animations: parallax, scroll-triggered reveals, section transitions. On desktop these feel premium. On low-end Android devices (Moto G4, Samsung A-series — the majority of Romanian mobile traffic) the same animations cause LCP to miss 2.5s and INP to miss 200ms. PageSpeed drops from 90+ to 55–65 and the SEO target is never achieved.

**Why it happens:**
Animations are developed on high-end MacBook Pros using a simulated throttled CPU. The actual target device is a mid-range Android with a 6-core ARM processor at 800 MHz throttled speed. Framer Motion and GSAP both schedule animations on the main thread. ScrollTrigger's `scrub` option continuously recalculates on every scroll event. Parallax effects on images trigger paint and composite layers beyond the GPU budget.

**How to avoid:**
1. **Audit every animation for mobile on day one**: test on a real Android mid-range device or use DevTools 6x CPU throttle + Slow 3G before merging any animated section.
2. Use `will-change: transform` only on actively animating elements, not globally.
3. Prefer `transform` and `opacity` exclusively — never animate `height`, `width`, `top`, `left`, `margin`, or `padding` (triggers reflow).
4. Wrap all non-critical animations in `useReducedMotion()` (Framer Motion) or `window.matchMedia('(prefers-reduced-motion)')` (GSAP) — also required for WCAG 2.1 AA.
5. For parallax, use `transform: translateY()` on a `position: fixed` or `will-change: transform` layer, never `top` or `background-attachment: fixed`.
6. Defer GSAP + ScrollTrigger bundle loading: `dynamic(() => import('../animations/ScrollReveal'), { ssr: false })` to keep the initial JS bundle lean.
7. Set a PageSpeed budget: CI/CD pipeline should block merge if mobile score drops below 85.

**Warning signs:**
- PageSpeed mobile score below 80 after adding the first animated section.
- Chrome DevTools "Long tasks" bar shows >50ms tasks on scroll.
- INP measured > 150ms in field data (CrUX in Search Console).
- `will-change: transform` applied to more than 5 DOM elements simultaneously.

**Phase to address:** Phase 2 (Homepage) — establish performance budget before merging hero/animations; Phase 3 (Remaining Pages) — enforce via CI check.

---

### Pitfall 7: Duplicate or Missing hreflang Tags Cause International SEO Cannibalization

**What goes wrong:**
Google indexes both `/ro/` and `/en/` versions of every page. Without correct `hreflang` alternate tags, Google treats the RO and EN pages as duplicate content and may choose the wrong language version to rank for Romanian queries — or suppress both versions due to apparent duplication. The locale switcher also fails to signal to crawlers which URL is canonical for each language.

**Why it happens:**
next-intl generates hreflang tags automatically via `generateMetadata()` — but only if the `alternates.languages` object is correctly wired in every `generateMetadata` export. Developers often set up the homepage correctly but copy-paste partial metadata for service pages, omitting `alternates` or hard-coding the wrong locale prefix.

**How to avoid:**
1. Create a shared `lib/metadata.ts` utility that returns the full `alternates.languages` object given a pathname and locale. All `generateMetadata()` exports call this utility — never hand-write hreflang.
2. Include `x-default` pointing to the RO version (primary language).
3. Validate with Google Search Console after launch — "Internationalization" report surfaces hreflang errors within 1–2 weeks.
4. Confirm `localePrefix: 'always'` or `'as-needed'` is set consistently; mixing strategies across pages causes hreflang/canonical mismatches.

**Warning signs:**
- Google Search Console shows "Alternate page with proper canonical tag" for language alternates.
- Crawling with Screaming Frog shows mismatched hreflang pairs (EN page points to EN, but RO page doesn't point back).
- Both `/ro/servicii/seo` and `/en/servicii/seo` appear in the same SERP.

**Phase to address:** Phase 4 (SEO Layer) — implement the `lib/metadata.ts` utility at the start of the SEO phase, before writing metadata for individual pages.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hard-code translations inline instead of JSON files | Faster to write first page | Impossible to maintain bilingual content; no centralized string management | Never — always use `messages/ro.json` and `messages/en.json` |
| `"use client"` on full page files | Fixes Framer Motion lint errors instantly | Eliminates RSC benefits; increases bundle; slows LCP | Only during prototyping, must be refactored before merge |
| `any` in TypeScript for translation key inference | Silences TS errors quickly | Type safety lost across all translation consumers | Never — use `useTranslations<'namespace'>()` generic parameter |
| Skipping `setRequestLocale()` | Pages load without error | Every page becomes dynamic SSR, losing edge cache | Never on marketing pages |
| `!important` in CSS to override shadcn/ui Tailwind styles | Fixes styling conflict immediately | Unmaintainable as component library evolves | Never — fix the Tailwind v4 theme token instead |
| `gsap.registerPlugin` in every component file | No shared module needed | Multiple plugin registrations cause duplicate behavior | Never — centralize in `lib/gsap.ts` |
| Inline GSAP animation without `useGSAP()` | Familiar pattern from GSAP docs | Memory leaks on every route change | Never in Next.js App Router |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Resend contact form | No rate limiting on the API route; no honeypot | Add `upstash/ratelimit` (or middleware IP check) + hidden honeypot field with CSS visibility:hidden (not `display:none`) + Zod validation on server |
| Cal.com embed | Loading Cal.com script synchronously in `<head>` | Load via `next/script` with `strategy="lazyOnload"` to avoid blocking LCP |
| Google Maps | Loading Maps JS API on every page including non-contact pages | Lazy-load the Maps component with `dynamic(() => ..., { ssr: false })` on the Contact page only |
| Google Tag Manager | GTM script blocks rendering when placed in `<head>` | Use `next/script` with `strategy="afterInteractive"` for GTM; fire GA4 events only after cookie consent is granted |
| Vercel Analytics | `@vercel/analytics` imported in root layout but no consent check | Gate `<Analytics />` behind cookie consent state — inject it only after `analytics` consent is granted |
| Resend newsletter signup | No email deduplication | Store subscribers in a list and check before adding; Resend does not deduplicate automatically |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| `background-attachment: fixed` parallax | CLS, jank on iOS (not supported on iOS Safari) | Use `transform: translateY()` on a separate layer via GSAP | All iOS devices — use immediately |
| Unoptimized SVG icons as `<img>` tags | Icons are not theme-aware, load as separate HTTP requests | Use Lucide React icons as React components; export custom SVGs as React components | At first build |
| Large hero image not preloaded | LCP score fails — hero image loads after JS | Add `priority` prop to `<Image>` on the hero; set `fetchpriority="high"` | Every page with a hero image |
| `srcSet` not specified on `<Image>` | Images not responsive; serving 2560px images on 375px screens | Always set `sizes` prop on `next/image`; use `fill` layout for fluid containers | First mobile audit |
| Scroll-triggered animations on 50+ elements simultaneously | CPU spike on scroll, INP > 200ms | Batch animations into timelines; use `ScrollTrigger.batch()` for repeated card reveals | Pages with service cards grid or testimonial carousels |
| GTM + GA4 + cookie consent all loaded before consent | Compliance violation + performance hit | Queue GTM dataLayer pushes; initialize GA4 only after consent signal received from cookie banner | At launch — legal risk |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Contact form API route with no rate limiting | Automated spam floods Resend sending quota; potential account suspension | Implement IP-based rate limiting via Upstash Redis or `next-rate-limit`; max 3 submissions per IP per 10 minutes |
| Honeypot field visible to screen readers | Confuses blind users; screen reader announces hidden field | Use `aria-hidden="true"` + `tabIndex={-1}` + CSS `position:absolute; left:-9999px` on the honeypot input |
| JSON-LD contains unsanitized user data (future dynamic schema) | XSS via `<script type="application/ld+json">` | Always replace `<` with `\u003c` in JSON.stringify output before embedding in script tag |
| GA4 / GTM firing before cookie consent granted | GDPR violation — analytics cookies set without consent | GTM consent mode v2 required; initialize in `denied` state, upgrade to `granted` only after user accepts analytics cookies |
| Resend API key in client-side code | API key exposed in browser, attacker sends unlimited emails | API route must handle Resend calls server-side only; never import Resend in any file without `"use server"` or inside an API route |
| Missing security headers on Vercel | Clickjacking, MIME-sniffing, XSS attacks | Add `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` in `next.config.ts` headers |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Cookie consent banner blocks hero content on first visit | User cannot see the value proposition before being asked to consent | Position banner at bottom of viewport; keep it compact; never use full-screen overlay (also penalized by Google on mobile) |
| Locale switcher changes language but not URL | Browser back button breaks; Google can't crawl EN version | Use next-intl's `useRouter().replace()` with the new locale — always changes the URL |
| Animations play every time user scrolls back up | Feels broken / repetitive; irritating on long pages | Add `once: true` to scroll triggers so animations play only on first entry; use `ScrollTrigger.toggleClass()` for persistent state |
| Calendly / Cal.com embed adds 2–3 seconds to page load | Contact page LCP fails; user sees blank widget | Load embed widget after user clicks "Book a call" CTA; use a custom button that injects the iframe on demand |
| Mobile tap targets below 48×48px on nav links | Users misfire on links; accessibility failure (WCAG 2.1 AA) | Enforce `min-h-12 min-w-12` on all interactive elements in the header and mobile nav |
| Contact form submits but user sees no feedback | User submits twice; duplicate leads; confusion | Implement `isPending` state from React's `useFormStatus` or React Hook Form's `isSubmitting`; show success/error message with `aria-live="polite"` |

---

## "Looks Done But Isn't" Checklist

- [ ] **Bilingual content:** Translation JSON files exist for both `ro` and `en` — verify every key present in `ro.json` also exists in `en.json` with a real translation (not a copy of the Romanian string).
- [ ] **hreflang alternates:** Every page's `generateMetadata()` exports `alternates.languages` with both `ro` and `en` entries plus `x-default`. Verify with Screaming Frog crawl.
- [ ] **Schema markup:** JSON-LD `Organization` block present on every page. `LocalBusiness` on homepage. `Service` on each service page. `FAQ` on FAQ page. `BreadcrumbList` on all pages except homepage. Validate with Google Rich Results Test.
- [ ] **Cookie consent gating:** GTM, GA4, Vercel Analytics, Facebook Pixel (if added) — none fire until user grants consent. Verify with browser network inspector: no `_ga` cookie before consent.
- [ ] **GSAP context cleanup:** Open DevTools Memory tab, navigate between 5 pages rapidly, take a heap snapshot — `ScrollTrigger` instance count should not grow.
- [ ] **Custom fonts via next/font:** No raw `@font-face` in CSS files. All fonts loaded through `next/font/local`. Verify PageSpeed Insights shows no "font swap" warning.
- [ ] **Images have explicit width/height:** Every `<Image>` component has `width` + `height` or `fill` + a sized parent. CLS score from images must be 0.
- [ ] **Hero image prioritized:** Homepage hero `<Image>` has `priority` prop. PageSpeed Insights confirms LCP element is image, not text.
- [ ] **Reduced motion respected:** All Framer Motion animations wrapped with `useReducedMotion()`. All GSAP animations check `window.matchMedia('(prefers-reduced-motion: reduce)')` before registering ScrollTrigger.
- [ ] **Contact form rate limited:** POST `/api/contact` returns 429 after 3 requests from the same IP within 10 minutes. Test with `curl`.
- [ ] **Security headers set:** `next.config.ts` `headers()` includes `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`. Verify with securityheaders.com.
- [ ] **Canonical tags on every page:** Each page exports `alternates.canonical` in `generateMetadata()`. No duplicate content paths.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| GSAP memory leaks discovered after 5 pages built | MEDIUM | Audit all animation components; add `useGSAP()` hook; create `lib/gsap.ts`; test each page; ~1–2 days |
| TailwindCSS 4 / shadcn incompatibility discovered mid-build | HIGH | Re-scaffold shadcn components using Tailwind v4 CLI; migrate all `@apply` directives; re-test all component variants; ~2–3 days |
| All pages are dynamic SSR (forgot `setRequestLocale`) | LOW | Add `setRequestLocale(locale)` + `generateStaticParams()` to each page file; re-deploy; ~2–4 hours |
| Mobile PageSpeed at 55 after animations added | HIGH | Audit each animation for reflow triggers; remove non-transform animations; add `dynamic()` lazy loading; CPU-throttle test every section; ~3–5 days |
| GDPR non-compliance (analytics fires before consent) | CRITICAL | Emergency deploy — disable GTM, add consent mode v2, gate all analytics behind consent; ~4–8 hours but legal risk exists during outage |
| hreflang missing or wrong on service pages | MEDIUM | Add shared `lib/metadata.ts` utility; update all `generateMetadata()` exports; validate with Screaming Frog; ~1 day |
| Contact form exploited (no rate limiting) | HIGH | Deploy rate limiting middleware immediately; rotate Resend API key; ~2–4 hours downtime risk |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| GSAP memory leaks | Phase 1 — Foundation (create `lib/gsap.ts` + `useGSAP` pattern) | Navigate 10 pages in a loop; heap snapshot shows stable ScrollTrigger count |
| Framer Motion client boundary bloat | Phase 1 — Foundation (define RSC/Client wrapper strategy) | Bundle analyzer: `framer-motion` not in initial chunk |
| TailwindCSS 4 + shadcn incompatibility | Phase 1 — Foundation (install stack, verify shadcn v4 guide) | All shadcn Button/Card/Input variants render correctly |
| next-intl static rendering opt-out | Phase 1 — Foundation (i18n setup with `setRequestLocale`) | `next build` shows `○` (static) for all marketing pages |
| Custom font CLS | Phase 1 — Foundation (configure `next/font/local`) | PageSpeed CLS < 0.05 on homepage |
| Heavy animations killing mobile PageSpeed | Phase 2 — Homepage (set performance budget, test on 6x CPU throttle) | Mobile PageSpeed >= 88 after hero + animations merged |
| hreflang errors | Phase 4 — SEO Layer (implement `lib/metadata.ts` utility) | Screaming Frog shows valid bidirectional hreflang pairs on all pages |
| GTM / GA4 fires before consent | Phase 3 — Functionality (cookie consent implementation) | Browser network inspector: no analytics requests before banner interaction |
| Contact form no rate limiting | Phase 3 — Functionality (API route hardening) | `curl` loop returns HTTP 429 after 3 requests |
| JSON-LD XSS | Phase 4 — SEO Layer (schema markup implementation) | All JSON-LD output passes escaping check; no raw `<` characters |
| Cal.com / Calendly blocking LCP | Phase 3 — Functionality (booking widget implementation) | Contact page LCP < 2.5s measured in PageSpeed Insights |
| Cookie banner blocking content | Phase 3 — Functionality (GDPR / cookie consent) | Banner renders below hero on all breakpoints; no full-screen overlay |

---

## Sources

- [Optimizing GSAP Animations in Next.js 15: Best Practices for Initialization and Cleanup](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — MEDIUM confidence (WebSearch, Medium)
- [Using ScrollTriggers in Next.js with useGSAP()](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/) — HIGH confidence (official GSAP community docs)
- [Reduce bundle size of Framer Motion (LazyMotion)](https://motion.dev/docs/react-reduce-bundle-size) — HIGH confidence (official Motion docs)
- [GSAP vs Motion detailed comparison](https://motion.dev/docs/gsap-vs-motion) — HIGH confidence (official Motion docs)
- [TailwindCSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — HIGH confidence (official Tailwind docs)
- [shadcn/ui Tailwind v4 guide](https://ui.shadcn.com/docs/tailwind-v4) — HIGH confidence (official shadcn/ui docs)
- [next-intl App Router getting started](https://next-intl.dev/docs/getting-started/app-router) — HIGH confidence (official next-intl docs)
- [Next.js JSON-LD structured data guide](https://nextjs.org/docs/app/guides/json-ld) — HIGH confidence (official Next.js docs)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) — HIGH confidence (official Next.js docs)
- [GDPR Cookie Consent Requirements 2025](https://secureprivacy.ai/blog/gdpr-cookie-consent-requirements-2025) — MEDIUM confidence (WebSearch, industry source)
- [Optimize Cumulative Layout Shift — web.dev](https://web.dev/articles/optimize-cls) — HIGH confidence (official Google web.dev)
- [Next.js Hydration Errors 2026](https://medium.com/@blogs-world/next-js-hydration-errors-in-2026-the-real-causes-fixes-and-prevention-checklist-4a8304d53702) — MEDIUM confidence (WebSearch, Medium)
- [Developing Secure Contact Forms in Next.js](https://arnab-k.medium.com/developing-secure-contact-forms-in-next-js-450cbb437e68) — MEDIUM confidence (WebSearch, Medium)
- [Tailwind v4 Missing Defaults and Config Issues — GitHub Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — MEDIUM confidence (community, verified against official docs)

---
*Pitfalls research for: Premium digital agency website — AceAgency (aceagency.ro)*
*Researched: 2026-02-20*
