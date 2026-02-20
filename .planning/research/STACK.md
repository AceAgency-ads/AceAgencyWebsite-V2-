# Stack Research

**Domain:** Premium digital agency website (Next.js, bilingual, animation-heavy)
**Researched:** 2026-02-20
**Confidence:** HIGH (all core libraries verified via Context7 + official docs + npm)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6 | Full-stack React framework | App Router is now stable, Turbopack default, React 19.2 built-in, `use cache` directive stable. Latest stable branch as of Feb 2026. Verified via Context7 `/vercel/next.js`. |
| React | 19.2 | UI rendering | Required by Next.js 16. View Transitions, useEffectEvent, Activity component. React Compiler 1.0 stable. |
| TypeScript | 5.x (strict) | Type safety | Already decided. Enforce `strict: true`. No `any`. Explicit return types on all exports. |
| TailwindCSS | 4.x | Utility-first styling | CSS-first config (no tailwind.config.js). `@theme` directive. Faster builds. shadcn/ui fully supports v4 as of 2025. |
| shadcn/ui | latest (canary CLI) | UI component library | Not versioned independently — consumed via CLI. All components updated for Tailwind v4 + React 19. Default style is now `new-york`. |

### i18n

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| next-intl | 4.8.3 | Internationalization (RO/EN) | The de facto standard for App Router i18n. Supports Server Components + Client Components. ICU message syntax. Type-safe. `defineRouting` API centralizes config. Active maintenance (4 days between releases). |

### Animations

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| motion (formerly framer-motion) | 12.34.0 | Declarative React animations | All component-level animations: entry reveals, hover states, layout transitions, exit animations. Import from `motion/react` (not `framer-motion`). Hardware-accelerated. |
| gsap | 3.13.x | Advanced timeline / scroll animations | Complex scroll-driven sequences, SVG morphs, staggered timeline animations, pinned scroll effects. Use `@gsap/react` hook package for React integration. |
| @gsap/react | latest | GSAP React integration | `useGSAP()` hook — drop-in for `useLayoutEffect`, handles cleanup automatically. Required for all GSAP usage in Next.js. |

**Animation division of responsibility:**
- `motion/react` — component entrance/exit animations, hover micro-interactions, page transitions, layout animations
- `gsap + ScrollTrigger` — complex multi-step scroll timelines, pinned sections, SVG path animations, anything requiring fine-grained timeline control

### Forms

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-hook-form | 7.66.0 | Form state management | All forms (contact, newsletter). Uncontrolled components = minimal re-renders. 11KB bundle. |
| zod | 4.0.1 | Schema validation | Validation at form level and API boundary. Use Zod 4 for new code — significantly faster TS compilation. `error` param replaces deprecated `message` param in v4. |
| @hookform/resolvers | 5.x | Bridge RHF + Zod | `zodResolver` auto-detects Zod v3 vs v4. Requires Zod ≥3.25.0 for v4 detection to work. |

### Email

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| resend | 6.9.2 | Email delivery | Contact form submissions, newsletter signups. Works natively with Next.js Server Actions via `"use server"` directive. |
| react-email | 5.2.8 | Email template rendering | Build email templates as React components. Tailwind 4 support in v5. Resend renders them server-side. |

### Analytics & Tracking

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/analytics | latest | Vercel web analytics | Built-in Vercel analytics. Add `<Analytics />` to root layout. Zero config. |
| @vercel/speed-insights | latest | Core Web Vitals monitoring | LCP/INP/CLS tracking. Add `<SpeedInsights />` to root layout. |
| Google Analytics 4 | via GTM | Conversion tracking | Use via GTM script injection — do NOT load GA4 directly, run through GTM to respect GDPR consent. |

### Booking

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| @calcom/embed-react | 1.5.3 | Cal.com booking widget | MEDIUM confidence: Known React 19 peer dependency issue (issue #20814 open). Workaround: use inline embed via `<script>` tag as fallback if `@calcom/embed-react` fails on Next.js 16. |

### Cookie Consent / GDPR

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| shadcn-cookie-consent | latest | GDPR consent banner | Built on shadcn/ui + Tailwind + Lucide. Three design variants. Customizable accept/decline callbacks. MIT licensed. Integrates without extra dependencies via shadcn CLI registry. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | `eslint-config-next` built in. Enforce no-unused-vars, no-explicit-any. |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` for class sorting. |
| tw-animate-css | CSS animation utilities | Replaces deprecated `tailwindcss-animate`. Add via `@import "tw-animate-css"` in globals.css. |
| Turbopack | Dev server + build | Default in Next.js 16. No config needed — `next dev` uses it automatically. |

---

## Installation

```bash
# Core framework
npx create-next-app@latest aceagency-website \
  --typescript --tailwind --app --src-dir --turbopack

# i18n
npm install next-intl@4.8.3

# Animations
npm install motion gsap @gsap/react

# Forms + Validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend react-email

# Analytics
npm install @vercel/analytics @vercel/speed-insights

# Booking
npm install @calcom/embed-react

# Dev dependencies
npm install -D tw-animate-css prettier prettier-plugin-tailwindcss

# shadcn/ui init (interactive — choose new-york style, Tailwind v4)
npx shadcn@latest init
```

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| motion (v12) | framer-motion | Same library — `framer-motion` is the legacy package name. Rebrand to `motion` happened Nov 2024. Import from `motion/react` going forward. Old package still works but new projects should use `motion`. |
| next-intl 4.x | next-i18next | next-i18next targets Pages Router; does not support App Router natively. next-intl is the App Router standard. |
| next-intl 4.x | next-international | Smaller ecosystem, less active maintenance, fewer features. |
| zod 4.x | yup | Zod 4 has significantly faster TS compile times and better type inference. Yup has no equivalent performance advantage. |
| zod 4.x | valibot | Valibot is viable (smaller bundle) but community + tooling ecosystem is smaller. Zod is the standard in the RHF ecosystem. |
| resend + react-email | nodemailer | Nodemailer requires SMTP server management. Resend is a managed API with 3000 free emails/mo and native React templates. |
| shadcn/ui | Radix UI (bare) | shadcn/ui wraps Radix with prebuilt styled components that match the project's design system. Building on bare Radix is more work for the same result. |
| shadcn/ui | Material UI | MUI's design system conflicts with the custom brand design. shadcn/ui is unstyled-first, making it easy to apply brand tokens. |
| Cal.com embed | Calendly embed | PROJECT.md explicitly chooses Cal.com for open-source/customizability reasons. Calendly alternative kept for fallback only. |
| tw-animate-css | tailwindcss-animate | tailwindcss-animate deprecated by shadcn/ui in March 2025. New projects should use tw-animate-css. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` package | Legacy package name — same library, but imports from `motion/react` is the current standard. Avoid mixing the two import styles. | `motion` package, import from `motion/react` |
| `tailwindcss-animate` | Deprecated by shadcn/ui March 2025 in favor of tw-animate-css | `tw-animate-css` |
| Direct GA4 script injection | Loads before consent banner = GDPR violation in Romania/EU | Load GA4 via GTM, fire GTM conditionally after consent |
| `useEffect` for GSAP | Creates animation/cleanup timing bugs in React 18+ Strict Mode | `useGSAP()` from `@gsap/react` — handles cleanup automatically |
| Next.js Pages Router patterns | Project uses App Router. Pages Router conventions (e.g., `_app.tsx`, `getServerSideProps`) do not apply | App Router: `layout.tsx`, `page.tsx`, Server Components, Server Actions |
| Hardcoded locale strings | Content outside of next-intl message files won't get translated | All user-facing strings go in `messages/ro.json` and `messages/en.json` |
| `any` TypeScript type | TypeScript strict mode is required. `any` defeats the purpose. | Proper type definitions, `unknown` with narrowing when necessary |

---

## Stack Patterns by Variant

**Animation components (scroll-triggered reveals):**
- Use `motion/react` with `whileInView` + `viewport={{ once: true }}`
- Wrap sections in `<motion.div>` — zero GSAP needed for basic reveals
- Use GSAP ScrollTrigger only when timeline coordination across elements is needed

**Animation components (pinned scroll sequences like hero storytelling):**
- Use GSAP ScrollTrigger with `pin: true`
- Wrap the component in `"use client"` and use `useGSAP()` with a container ref
- Register plugins at module level: `gsap.registerPlugin(ScrollTrigger)`

**Server Actions + forms:**
```typescript
// Contact form pattern — Client Component for form, Server Action for submission
'use server'
async function submitContact(data: ContactFormData) {
  const result = await resend.emails.send({ ... })
  // ...
}
```

**next-intl routing (RO primary, EN secondary):**
```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  localePrefix: 'as-needed' // RO = no prefix, EN = /en/...
});
```

**Static rendering with next-intl (performance):**
- Add `generateStaticParams` to `app/[locale]/layout.tsx` to statically render all locale pages at build time
- Critical for PageSpeed 90+ target — avoids dynamic rendering for i18n pages

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@16.1.6 | react@19.2, react-dom@19.2 | React 19.2 is bundled. Do not pin older React. |
| next-intl@4.8.3 | next@15+, next@16 | v4 requires Next.js 15+. Works with Next.js 16. |
| motion@12.34.0 | react@19 | Full React 19 support confirmed. |
| gsap@3.13.x | next@16 | SSR-safe. All DOM-touching code must be in `useGSAP()` or `useEffect()` with `"use client"`. |
| zod@4.0.1 | @hookform/resolvers@5.x | Resolvers v5 adds auto-detection. Needs Zod ≥3.25.0 for detection bridge. |
| react-hook-form@7.66.0 | react@19 | Fully compatible. |
| @calcom/embed-react@1.5.3 | react@19 | CAUTION: React 19 peer dep not declared (issue #20814 open Feb 2026). Use `--legacy-peer-deps` or implement inline script fallback. |
| shadcn/ui (latest CLI) | tailwindcss@4.x, react@19 | All components updated for both. Use `new-york` style. `tw-animate-css` replaces `tailwindcss-animate`. |
| resend@6.9.2 | next@16, react@19 | Server-side only. Do not import on client. |
| react-email@5.2.8 | react@19, tailwindcss@4 | v5 added Tailwind 4 support. |

---

## Sources

- Context7 `/vercel/next.js/v16.1.6` — Next.js 16.1.6 App Router features, metadata API (HIGH confidence)
- Context7 `/amannn/next-intl` — `defineRouting`, middleware setup, `createMiddleware` patterns (HIGH confidence)
- Context7 `/websites/motion_dev` — `motion/react` vs GSAP comparison, hardware-accelerated scroll animations (HIGH confidence)
- Context7 `/react-hook-form/react-hook-form/v7.66.0` — `zodResolver` pattern, Server Actions integration (HIGH confidence)
- Context7 `/colinhacks/zod/v4.0.1` — Zod v4 breaking changes, `error` param, v3/v4 coexistence (HIGH confidence)
- Context7 `/llmstxt/gsap_llms_txt` — `useGSAP` hook, `@gsap/react` installation, ScrollTrigger registration (HIGH confidence)
- [nextjs.org/blog/next-16](https://nextjs.org/blog/next-16) — Next.js 16 release notes, React 19.2, Turbopack stable (HIGH confidence)
- [nextjs.org/blog/next-16-1](https://nextjs.org/blog/next-16-1) — Next.js 16.1 Turbopack filesystem caching (HIGH confidence)
- [ui.shadcn.com/docs/tailwind-v4](https://ui.shadcn.com/docs/tailwind-v4) — shadcn/ui Tailwind v4 compatibility, `tw-animate-css` migration (HIGH confidence)
- [next-intl.dev/blog/next-intl-4-0](https://next-intl.dev/blog/next-intl-4-0) — next-intl v4 release, current version 4.8.3 (HIGH confidence)
- [motion.dev/docs/react-upgrade-guide](https://motion.dev/docs/react-upgrade-guide) — Framer Motion → Motion rebrand, v12 no breaking changes (HIGH confidence)
- [npmjs.com/package/resend](https://www.npmjs.com/package/resend) — resend v6.9.2, react-email v5.2.8 (HIGH confidence)
- [npmjs.com/package/@calcom/embed-react](https://www.npmjs.com/package/@calcom/embed-react) — v1.5.3, React 19 peer dep issue #20814 (MEDIUM confidence — open issue)
- WebSearch: GSAP ScrollTrigger Next.js SSR patterns — `"use client"` required, `useGSAP` for cleanup (MEDIUM confidence — community articles)
- WebSearch: shadcn-cookie-consent GDPR — `r2hu1/shadcn-cookie-consent`, MIT, shadcn CLI installable (MEDIUM confidence — community library)
- WebSearch: `@hookform/resolvers` Zod v4 — v5.x supports Zod 4, auto-detection, known type issue in early v5.2 (MEDIUM confidence — GitHub issues)

---

*Stack research for: AceAgency premium agency website (Next.js 16, TailwindCSS 4, bilingual RO/EN)*
*Researched: 2026-02-20*
