# Phase 8: Polish and Launch - Research

**Researched:** 2026-02-25
**Domain:** Performance optimization, accessibility (WCAG 2.1 AA), security headers, i18n completeness, error pages
**Confidence:** HIGH

## Summary

Phase 8 is the launch-readiness gate. The site is functionally complete (Phases 1-7 done) and now needs verification and hardening across five axes: (1) PageSpeed 90+ on mobile, (2) WCAG 2.1 AA automated compliance, (3) bilingual content completeness, (4) custom 404 page, and (5) security headers. No new libraries are needed -- all work uses existing Next.js configuration, GSAP matchMedia patterns already established in the codebase, and standard Vercel deployment features.

The codebase is in strong shape. Most animation components already respect `prefers-reduced-motion` via GSAP `matchMedia()`. The main gaps are: `ScrollReveal.tsx` (the most-used animation wrapper) lacks reduced-motion handling, 5 service section components (ServicesGrid, ServiceFeatures, ServiceProcess, WhyChooseSection, ProcessSteps) use GSAP directly without reduced-motion guards, `next.config.ts` has zero security headers, no `not-found.tsx` exists, and no `vercel.json` exists for redirect rules. The i18n key counts are already balanced (449 keys in both `ro.json` and `en.json`).

**Primary recommendation:** Work in three plans: (1) performance audit and fixes, (2) accessibility audit and reduced-motion retrofit, (3) security headers, 404 page, and redirect configuration.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-06 | Core Web Vitals compliance (LCP <2.5s, INP <200ms, CLS <0.1, PageSpeed 90+ mobile) | Performance audit plan using Lighthouse CI / PageSpeed Insights; GSAP memory leak check; image optimization verification; font loading already uses size-adjust fallbacks (01-03 decision) |
| CMPL-04 | WCAG 2.1 AA accessibility (semantic HTML, heading hierarchy, alt text, keyboard navigation) | axe-core automated audit; reduced-motion retrofit for ScrollReveal + 5 section components; Lenis smooth scroll reduced-motion bypass; existing aria-labels in Header/Footer confirmed |
| CMPL-05 | Security headers (HSTS, X-Content-Type-Options, X-Frame-Options) | Next.js `headers()` function in next.config.ts; Context7-verified patterns for all three headers plus Referrer-Policy |
| CMPL-06 | HTTPS with 301 redirects from HTTP, non-www redirect | Vercel handles HTTPS and HTTP->HTTPS redirects automatically; non-www redirect via Vercel domain settings (no code needed); vercel.json redirects for any custom rules |
| CMPL-07 | Custom 404 page | Next.js App Router `not-found.tsx` file convention at `src/app/[locale]/not-found.tsx` or `src/app/not-found.tsx` (global); must include navigation back to site |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | `headers()` in next.config.ts for security headers, `not-found.tsx` convention | Framework-native, verified via Context7 |
| GSAP | 3.14.2 | `gsap.matchMedia()` for reduced-motion handling | Already used in 4/5 animation components |
| Lenis | (installed) | Smooth scroll -- needs reduced-motion disable | Already integrated via SmoothScroll.tsx |

### Supporting (audit tools -- dev only, not installed in project)

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Lighthouse CLI | Performance audit (PageSpeed score, CWV) | Run locally: `npx lighthouse URL --only-categories=performance --output=json` |
| axe-core / @axe-core/cli | WCAG 2.1 AA automated checks | Run locally: `npx @axe-core/cli URL` |
| SecurityHeaders.com | Verify response headers post-deploy | Manual check after Vercel deploy |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Local Lighthouse CLI | PageSpeed Insights API | API gives field + lab data but requires internet; CLI works offline, same Lighthouse engine |
| axe-core CLI | pa11y | axe-core is industry standard with better WCAG 2.1 rule coverage; pa11y uses axe under the hood anyway |
| Manual header check | securityheaders.com | Both valid; securityheaders.com gives letter grade + detailed breakdown |

**Installation (audit tools only -- not bundled):**
```bash
# These are run via npx, no permanent install needed
npx lighthouse http://localhost:3000/ro --only-categories=performance --output=json
npx @axe-core/cli http://localhost:3000/ro
```

## Architecture Patterns

### Pattern 1: Security Headers via next.config.ts headers()

**What:** Define security headers as an async `headers()` function in Next.js config. Applied to all routes via `source: '/(.*)'`.
**When to use:** Always -- this is the Next.js-native approach.
**Example:**

```typescript
// Source: Context7 - /vercel/next.js v16.1.6 headers.mdx
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

**Important:** X-Frame-Options should be `SAMEORIGIN` (not `DENY`) because the site embeds Cal.com via iframe and Google Maps via iframe -- `DENY` would block those. However, X-Frame-Options controls whether THIS site can be framed by others, not whether it can embed others. So `DENY` is actually fine and more secure. Use `SAMEORIGIN` only if the site needs to be iframed by itself.

**Correction:** X-Frame-Options controls whether the CURRENT page can be loaded in a frame on other sites. It does NOT affect iframes the page embeds. Cal.com and Google Maps iframes will work fine with `DENY`. Use `SAMEORIGIN` to be safe (allows same-origin framing if needed in future).

### Pattern 2: Custom 404 Page with next-intl

**What:** Create `not-found.tsx` in the `[locale]` segment to get i18n support, or at `src/app/not-found.tsx` for a global fallback.
**When to use:** CMPL-07 requires a branded 404 page with navigation back to the site.

```typescript
// src/app/[locale]/not-found.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href="/">{t('backHome')}</Link>
    </div>
  );
}
```

**Caveat:** Next.js 16 App Router `not-found.tsx` at the `[locale]` level only triggers when `notFound()` is called programmatically. For truly unknown URLs (e.g., `/ro/xyz123`), a root-level `src/app/not-found.tsx` is also needed. The root-level one renders a full HTML document (no layout wrapping). Consider having both: root-level for completely unknown paths, locale-level for programmatic 404s within the app.

### Pattern 3: GSAP matchMedia for Reduced Motion

**What:** Wrap GSAP animations in `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', ...)` so they only run when the user hasn't requested reduced motion.
**When to use:** Every GSAP animation. Already used in TextReveal, ScrubReveal, ParallaxLayer, CountUp. Missing from ScrollReveal and 5 section components.

```typescript
// Pattern already established in codebase (TextReveal.tsx, CountUp.tsx)
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Animation code here
  gsap.from(element, { opacity: 0, y: 40, duration: 0.8 });
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  // Instant reveal -- no animation
  gsap.set(element, { opacity: 1, y: 0 });
});
```

### Pattern 4: Lenis Smooth Scroll Reduced Motion

**What:** Disable Lenis smooth scrolling when `prefers-reduced-motion: reduce` is active.
**When to use:** WCAG 2.1 AA requires respecting user motion preferences. Lenis overrides native scrolling with JS-driven smooth scrolling, which can be disorienting.

```typescript
// In SmoothScroll.tsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Skip Lenis entirely

  const lenis = new Lenis({ ... });
  // ... rest of setup
}, []);
```

### Anti-Patterns to Avoid

- **Testing only homepage for PageSpeed:** Requirement says homepage, one service page, AND contact page. All three must hit 90+.
- **Using `DENY` for X-Frame-Options without checking embeds:** While it doesn't affect outbound iframes, `SAMEORIGIN` is safer if any future feature needs same-origin framing.
- **Adding CSP header in Phase 8:** CSP is complex and can break GTM, Cal.com, Google Maps, fonts. Out of scope for this phase -- add later as a separate hardening effort.
- **Running Lighthouse on dev server:** Dev mode includes React DevTools overhead, unminified code, no compression. Always test against `npm run build && npm start` (production build).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Security headers | Custom middleware | `next.config.ts headers()` | Framework-native, applies to all routes including static assets |
| 404 page | Custom error handler | `not-found.tsx` file convention | Next.js auto-detects and renders with proper 404 status code |
| HTTPS redirects | Custom redirect logic | Vercel automatic HTTPS | Vercel forces HTTPS on all custom domains by default |
| Non-www redirect | vercel.json redirect rules | Vercel domain settings | Set primary domain as `aceagency.ro` (non-www), Vercel auto-redirects www |
| Accessibility audit | Manual checklist | axe-core automated scan | Catches 57% of WCAG issues automatically; manual review for the rest |
| Performance audit | Manual Chrome DevTools | Lighthouse CLI with throttling | Reproducible, scriptable, generates actionable metrics |

**Key insight:** Phase 8 is verification and configuration, not feature development. Every gap has a framework-native or tool-based solution. No custom code beyond the 404 page component and reduced-motion retrofits.

## Common Pitfalls

### Pitfall 1: Lighthouse Score Variance
**What goes wrong:** PageSpeed scores vary 5-10 points between runs due to network conditions, server load, and Chrome garbage collection timing.
**Why it happens:** Lighthouse simulates a mid-tier mobile device with CPU throttling, but host machine activity affects results.
**How to avoid:** Run Lighthouse 3-5 times and take the median. Use `--preset=desktop` for desktop and default for mobile. Run against production build (`npm run build && npm start`), not dev server.
**Warning signs:** Score fluctuating between 85 and 95 across runs.

### Pitfall 2: GSAP ScrollTrigger Memory Leaks
**What goes wrong:** ScrollTrigger instances accumulate on client-side navigation (Next.js Link), degrading performance over time.
**Why it happens:** ScrollTrigger instances aren't killed when components unmount if cleanup isn't properly handled.
**How to avoid:** GSAP `useGSAP` hook auto-cleans up within its scope. Verify with Chrome DevTools heap snapshot: navigate 10 pages, check ScrollTrigger instance count. The codebase already uses `useGSAP` consistently -- this is a verification step, not a fix.
**Warning signs:** Growing `ScrollTrigger.getAll().length` after navigations.

### Pitfall 3: HSTS Preload Commitment
**What goes wrong:** Adding `preload` to HSTS header means the domain gets submitted to browser preload lists. This is nearly impossible to undo.
**Why it happens:** HSTS preload is a permanent commitment to HTTPS. If the domain ever needs HTTP, it's stuck.
**How to avoid:** For aceagency.ro launching fresh, HSTS with preload is appropriate. Include `includeSubDomains` per requirement. Just be aware this is a one-way decision.
**Warning signs:** None -- this is intentional. Just document the decision.

### Pitfall 4: axe-core False Positives
**What goes wrong:** axe-core reports violations that aren't real issues (e.g., color contrast on animated/transitioning elements, missing labels on hidden elements).
**Why it happens:** Automated tools can't understand visual context or animation states.
**How to avoid:** Run axe on fully-loaded pages (wait for animations to complete). Review each "serious" violation manually. Focus on critical and serious -- minor/moderate can be deferred.
**Warning signs:** High violation count that doesn't match visual inspection.

### Pitfall 5: ScrollReveal Reduced-Motion Retrofit Breaking Layout
**What goes wrong:** Adding reduced-motion handling to ScrollReveal changes initial element state (opacity: 0, y: 40) which can cause layout shift if not handled correctly.
**Why it happens:** ScrollReveal uses `gsap.from()` which sets initial state programmatically. In reduced-motion mode, elements should start visible.
**How to avoid:** In reduced-motion branch, use `gsap.set(element, { opacity: 1, y: 0 })` to ensure immediate visibility. Don't just skip the animation -- explicitly set the final state.
**Warning signs:** Invisible content when reduced-motion is enabled.

### Pitfall 6: next-intl not-found.tsx Locale Detection
**What goes wrong:** The root-level `not-found.tsx` (for completely unknown URLs) doesn't have access to the locale context from `[locale]` segment.
**Why it happens:** Root not-found renders outside the `[locale]` layout, so `useTranslations` won't work.
**How to avoid:** Root `not-found.tsx` should use hardcoded Romanian text (primary locale) or detect locale from the URL path manually. The `[locale]/not-found.tsx` gets full i18n support.
**Warning signs:** "Missing translations" error on 404 page.

## Code Examples

### Security Headers in next.config.ts

```typescript
// Source: Context7 - /vercel/next.js v16.1.6 headers.mdx + PWA guide
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

### ScrollReveal Reduced-Motion Retrofit

```typescript
// Current ScrollReveal.tsx uses gsap.from() without matchMedia.
// Retrofit pattern (matches CountUp.tsx, TextReveal.tsx established patterns):
useGSAP(
  () => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(containerRef.current!, {
        opacity: 0,
        y: yOffset,
        duration,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      });

      const onLoad = (): void => { ScrollTrigger.refresh(); };
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', onLoad, { once: true });
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(containerRef.current!, { opacity: 1, y: 0 });
    });
  },
  { scope: containerRef }
);
```

### Lenis Reduced-Motion Bypass

```typescript
// In SmoothScroll.tsx -- skip Lenis when user prefers reduced motion
useEffect(() => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mql.matches) return; // Native scroll only

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    autoRaf: false,
  });
  // ... rest unchanged
}, []);
```

### Custom 404 Page (locale-aware)

```typescript
// src/app/[locale]/not-found.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-glacial text-6xl font-bold text-[var(--color-accent)]">404</h1>
      <p className="mt-4 text-xl text-[var(--color-grey)]">{t('description')}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[var(--color-accent)] px-6 py-3 text-white transition-colors hover:bg-[var(--color-accent-light)]"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| X-Frame-Options | CSP frame-ancestors | Ongoing transition | X-Frame-Options still needed for older browsers; use both if adding CSP |
| Lighthouse v10 | Lighthouse v12 | 2025 | INP replaced FID as Core Web Vital; scoring weights changed |
| Manual a11y checklist | axe-core + manual review | Standard practice | Automated catches ~57% of WCAG issues; manual for rest |
| CSS `scroll-behavior: smooth` | Lenis (JS-driven) | Project choice | More control but requires reduced-motion handling |

**Deprecated/outdated:**
- FID (First Input Delay): Replaced by INP (Interaction to Next Paint) as Core Web Vital in March 2024
- `next/head` for metadata: Replaced by `generateMetadata` in App Router (already using correct approach)

## Codebase Audit Summary

### Reduced-Motion Coverage

| Component | Has `prefers-reduced-motion`? | Action Needed |
|-----------|-------------------------------|---------------|
| TextReveal.tsx | YES | None |
| ScrubReveal.tsx | YES | None |
| ParallaxLayer.tsx | YES | None |
| CountUp.tsx | YES | None |
| ScrollReveal.tsx | **NO** | Add matchMedia wrapper |
| SmoothScroll.tsx (Lenis) | **NO** | Add reduced-motion bypass |
| HeroTransition.tsx | YES | None |
| ServicesPreview.tsx | YES | None |
| ServiceHero.tsx | YES | None |
| HeroSection.tsx | YES | None |
| ContactHero.tsx | YES | None |
| AboutHero.tsx | YES | None |
| ServicesHero.tsx | YES | None |
| StatsSection.tsx | YES | None |
| MissionVision.tsx | YES | None |
| BentoGrid.tsx | YES | None |
| WhyChooseUs.tsx | YES | None |
| StorySection.tsx | YES | None |
| ServicesGrid.tsx | **NO** | Add matchMedia wrapper |
| ServiceFeatures.tsx | **NO** | Add matchMedia wrapper |
| ServiceProcess.tsx | **NO** | Add matchMedia wrapper |
| WhyChooseSection.tsx | **NO** | Add matchMedia wrapper |
| ProcessSteps.tsx | **NO** | Add matchMedia wrapper |

### i18n Completeness

- RO keys: 449
- EN keys: 449
- Missing in EN: 0
- Missing in RO: 0
- Placeholder content in EN: Needs manual review for quality (no `TODO`/`lorem` markers found)
- **Action:** Add `notFound` namespace keys to both `ro.json` and `en.json` for the 404 page

### Security Headers

- Current `next.config.ts`: Zero headers configured
- No `vercel.json` exists
- **Action:** Add `headers()` function to `next.config.ts`

### 404 Page

- No `not-found.tsx` exists at any level
- **Action:** Create `src/app/[locale]/not-found.tsx` (locale-aware) and optionally `src/app/not-found.tsx` (global fallback)

### HTTPS/Redirects

- Vercel handles HTTPS automatically on custom domains
- HTTP to HTTPS redirect is automatic on Vercel
- Non-www redirect: Configure in Vercel dashboard (set `aceagency.ro` as primary domain, `www.aceagency.ro` as redirect)
- **Action:** Minimal code needed -- mostly Vercel configuration

## Open Questions

1. **CSP Header Scope**
   - What we know: The requirement (CMPL-05) lists HSTS, X-Content-Type-Options, X-Frame-Options. CSP is not listed.
   - What's unclear: Whether to add a basic CSP now or defer.
   - Recommendation: Defer CSP. It's complex with GTM, Cal.com, Google Maps, Analytics, and font sources. Out of scope for CMPL-05. Add as a post-launch hardening task.

2. **Vercel Domain Configuration**
   - What we know: Vercel auto-handles HTTPS and can redirect www to non-www.
   - What's unclear: Whether the domain is already configured on Vercel.
   - Recommendation: Document the Vercel dashboard steps in the plan. If domain isn't configured yet, this is a manual step outside Claude's scope.

3. **Performance Budget for GSAP**
   - What we know: GSAP + ScrollTrigger + SplitText are loaded client-side. Lenis adds to the JS bundle.
   - What's unclear: Whether the combined JS bundle hits mobile performance targets.
   - Recommendation: Run Lighthouse after build. If JS payload is too large, consider dynamic imports for below-fold animation components.

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js` v16.1.6 - `headers.mdx` (security headers pattern), `not-found.mdx` (404 page convention), `error-handling.mdx` (not-found component), `content-security-policy.mdx` (CSP reference), `progressive-web-apps.mdx` (security headers example)
- Codebase analysis - all animation components audited for reduced-motion support
- Codebase analysis - i18n key count comparison (449/449 balanced)

### Secondary (MEDIUM confidence)
- GSAP matchMedia pattern - verified in existing codebase (TextReveal.tsx, CountUp.tsx, ScrubReveal.tsx, ParallaxLayer.tsx)
- Vercel HTTPS handling - documented in Vercel docs (automatic for all custom domains)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, all patterns verified in Context7 and existing codebase
- Architecture: HIGH - patterns already established in codebase (matchMedia, headers config)
- Pitfalls: HIGH - based on real codebase gaps identified during audit
- Performance targets: MEDIUM - actual scores depend on runtime measurement, can't predict before testing

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable -- no fast-moving dependencies)
