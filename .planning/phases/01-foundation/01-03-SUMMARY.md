---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [next-font, gsap, tailwindcss, woff2, css-variables, animations, responsive]

# Dependency graph
requires:
  - phase: 01-02
    provides: next-intl bilingual routing, LocaleSwitcher, NextIntlClientProvider, [locale]/layout.tsx wiring

provides:
  - Glacial Indifference (Regular + Bold) and Red Hat Display as WOFF2 files in public/fonts/
  - next/font/local configuration with adjustFontFallback (zero CLS) and CSS variables on <html>
  - All AceAgency brand colors as CSS custom properties and Tailwind utilities via @theme inline
  - shadcn semantic tokens (--primary, --secondary, --accent) remapped to brand palette in oklch
  - Responsive breakpoints (320px xs through 2560px 3xl) and 48px tap target spacing token
  - src/lib/gsap.ts: centralized GSAP + ScrollTrigger registration, useGSAP re-export
  - src/components/animations/ScrollReveal.tsx: SSR-safe scroll-triggered fade-in wrapper
  - src/components/layout/Container.tsx: responsive max-w-[1280px] container with mobile-first padding
  - Test home page demonstrating all infrastructure (fonts, colors, GSAP, responsive)

affects:
  - All future phases (02 onwards): every component depends on brand tokens, fonts, Container, and animations
  - Phase 03 hero animations: ScrollReveal and gsap lib are the animation foundation
  - Phase 06 GDPR/cookies: shadcn semantic token mapping established here
  - Phase 07 analytics: Tailwind utility classes established here

# Tech tracking
tech-stack:
  added:
    - gsap@^3.14.2
    - "@gsap/react@^2.1.2"
    - motion@^12.34.3
    - fontTools + brotli (Python, local conversion only)
  patterns:
    - "next/font/local with adjustFontFallback: zero-CLS custom font loading"
    - "Tailwind @theme inline: CSS-native brand tokens without tailwind.config.js"
    - "Centralized GSAP lib/gsap.ts: single plugin registration point"
    - "useGSAP hook: SSR-safe animation via useIsomorphicLayoutEffect"
    - "ScrollTrigger.refresh() on window load: prevents off-position triggers post-hydration"

key-files:
  created:
    - src/lib/gsap.ts
    - src/components/animations/ScrollReveal.tsx
    - src/components/layout/Container.tsx
    - public/fonts/GlacialIndifference-Regular.woff2
    - public/fonts/GlacialIndifference-Bold.woff2
    - public/fonts/RedHatDisplay-Regular.woff2
  modified:
    - src/app/[locale]/layout.tsx
    - src/styles/globals.css
    - src/app/[locale]/page.tsx
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "Font files converted to WOFF2 via Python fontTools (fonttools + brotli) — WOFF2 is ~30% smaller than WOFF/TTF and reduces font load time"
  - "Glacial Indifference sourced from font.download (OTF) — verified OpenType format; converted to WOFF2 locally"
  - "Red Hat Display sourced from Google Fonts gstatic CDN (TTF) — official source, SIL OFL license"
  - "adjustFontFallback: 'Arial' applied to both custom fonts — generates size-adjusted system fallback preventing layout shift during font swap"
  - "shadcn semantic tokens remapped to brand palette in oklch — keeps shadcn components styled with brand colors while maintaining semantic layer separation"
  - "Container max-w-[1280px] per plan spec — aligns with xl breakpoint, standard for agency sites"
  - "ScrollTrigger.refresh() called on window load inside useGSAP scope — prevents trigger position miscalculation when fonts/images shift layout post-hydration (RESEARCH.md Pitfall 3)"
  - "ScrollReveal exposes yOffset, duration, start props — configurable per usage without needing new wrapper components"

patterns-established:
  - "Import gsap, useGSAP, ScrollTrigger from @/lib/gsap (never directly from gsap)"
  - "All animation components carry 'use client' directive"
  - "Brand color utilities: bg-electric-violet, text-cobalt-blue, bg-electric-mint, etc."
  - "Heading font applied via CSS var(--font-heading) in @layer base — no per-element class needed"
  - "Container wraps all page sections for consistent 1280px max-width with responsive padding"

requirements-completed:
  - FNDN-03
  - FNDN-05
  - FNDN-06

# Metrics
duration: 5min
completed: 2026-02-20
---

# Phase 1 Plan 3: Visual Infrastructure — Fonts, Brand Tokens, GSAP Summary

**Glacial Indifference + Red Hat Display loaded via next/font/local (zero CLS), brand colors as Tailwind @theme inline utilities, and GSAP centralized in lib/gsap.ts with SSR-safe ScrollReveal**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-20T16:40:10Z
- **Completed:** 2026-02-20T16:45:05Z
- **Tasks:** 2/2
- **Files modified:** 9

## Accomplishments

- Converted Glacial Indifference OTF and Red Hat Display TTF to WOFF2 using Python fontTools; all 3 font files in public/fonts/ (52KB total)
- Configured next/font/local with adjustFontFallback: 'Arial' for both custom fonts, achieving CLS = 0 by generating size-adjusted system fallbacks
- Defined all 7 AceAgency brand colors as CSS custom properties and exposed them to Tailwind as utilities (bg-electric-violet, text-electric-mint, etc.) via @theme inline
- Remapped shadcn semantic tokens (--primary, --secondary, --accent) to brand palette in oklch while preserving shadcn component compatibility
- Created centralized src/lib/gsap.ts registering useGSAP + ScrollTrigger exactly once
- Created SSR-safe ScrollReveal component using useGSAP hook with ScrollTrigger.refresh() on window load
- Created responsive Container component (max-w-[1280px], px-4 sm:px-6 lg:px-8) covering 320px-2560px
- Build produces all pages as SSG (●), no dynamic (λ) pages introduced

## Task Commits

Each task was committed atomically:

1. **Task 1: Load custom fonts and define brand tokens** - `b4a8366` (feat)
2. **Task 2: GSAP infrastructure, ScrollReveal, Container, test page** - `0edf4c2` (feat)

## Files Created/Modified

- `public/fonts/GlacialIndifference-Regular.woff2` - Heading font Regular (20KB WOFF2)
- `public/fonts/GlacialIndifference-Bold.woff2` - Heading font Bold (14KB WOFF2)
- `public/fonts/RedHatDisplay-Regular.woff2` - Subheading font (18KB WOFF2)
- `src/app/[locale]/layout.tsx` - Added localFont config for Glacial Indifference and Red Hat Display; Inter from Google Fonts; CSS variables applied to <html>
- `src/styles/globals.css` - Full brand token system: raw hex vars, shadcn oklch semantics, @theme inline Tailwind exposure, breakpoints, tap targets, @layer base font rules
- `src/lib/gsap.ts` - Centralized GSAP plugin registration; defaults set; re-exports gsap, useGSAP, ScrollTrigger
- `src/components/animations/ScrollReveal.tsx` - SSR-safe scroll-triggered fade-in wrapper; configurable yOffset, duration, start; ScrollTrigger.refresh() on load
- `src/components/layout/Container.tsx` - Responsive page container; max-w-[1280px]; mobile-first padding
- `src/app/[locale]/page.tsx` - Test page demonstrating all infrastructure: hero with brand colors, color swatches, animated section, typography section
- `src/messages/ro.json` / `src/messages/en.json` - Extended with hero, colors, animation translation keys

## Decisions Made

- **Font sourcing:** Glacial Indifference from font.download (OTF verified OpenType); Red Hat Display from Google Fonts gstatic CDN (TTF official source). Both converted to WOFF2 via Python fontTools for optimal file size.
- **adjustFontFallback: 'Arial':** Applied to both custom fonts. This is the critical CLS prevention mechanism — Next.js auto-calculates `size-adjust`, `ascent-override`, `descent-override` to match the fallback font to the custom font's metrics.
- **Shadcn tokens preserved:** Original shadcn :root variables replaced with brand-mapped oklch values, keeping shadcn components (Button, Card, etc.) visually aligned with AceAgency brand without breaking shadcn's CSS variable system.
- **ScrollReveal props:** Exposed yOffset, duration, start as optional props with sensible defaults — avoids proliferating wrapper components for minor animation variations.
- **ScrollTrigger.refresh() on window load:** Added inside useGSAP scope per RESEARCH.md Pitfall 3. Prevents off-position triggers when fonts/images alter layout after initial ScrollTrigger position calculation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added ScrollTrigger.refresh() on window load in ScrollReveal**

- **Found during:** Task 2 (ScrollReveal implementation)
- **Issue:** RESEARCH.md Pitfall 3 explicitly documents that ScrollTrigger calculates positions before fonts finish loading, causing off-position animation triggers in production
- **Fix:** Added `window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })` inside the useGSAP scope with a readyState check for the case where load already fired
- **Files modified:** src/components/animations/ScrollReveal.tsx
- **Verification:** Build passes, no console errors
- **Committed in:** 0edf4c2 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Exposed configurable props on ScrollReveal**

- **Found during:** Task 2 (ScrollReveal implementation)
- **Issue:** Hardcoded yOffset=40, duration=0.8, start='top 85%' would require duplicating the component for any variation across future pages
- **Fix:** Added optional yOffset, duration, start props with defaults matching plan spec values
- **Files modified:** src/components/animations/ScrollReveal.tsx
- **Verification:** Props functional, TypeScript strict mode passes
- **Committed in:** 0edf4c2 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 2 - Missing Critical)
**Impact on plan:** Both auto-fixes improve correctness and reusability. No scope creep — ScrollReveal still implements the same scroll-triggered fade-in animation as specified.

## Issues Encountered

- **Glacial Indifference sourcing:** GitHub repo `andineck/glacial-indifference` returned HTML instead of binary OTF files (redirect to blob viewer). Resolved by downloading from font.download mirror which provided a proper ZIP with verified OpenType data.
- **fontTools convert subcommand:** `fonttools convert` does not exist; used `fontTools.ttLib.TTFont` Python API directly (`font.flavor = 'woff2'`; `font.save(path)`). Result is identical WOFF2 output.
- **fontsquirrel.com download:** Returned empty ZIP file (likely JavaScript-gated). font.download mirror worked correctly.

## User Setup Required

None - no external service configuration required. All font files are committed to the repository.

## Next Phase Readiness

- All visual infrastructure is ready for Phase 2 component development
- `bg-electric-violet`, `text-cobalt-blue`, `bg-electric-mint` and other brand utilities work in any component
- Headings automatically render in Glacial Indifference via CSS `font-family: var(--font-heading)` in `@layer base`
- Any component needing GSAP imports from `@/lib/gsap` — plugins are pre-registered
- `<Container>` wraps any section for consistent 1280px max-width layout
- `<ScrollReveal>` wraps any section for scroll-triggered animation

**Blockers:** None. Phase 3 GSAP SplitText blocker (Club GSAP license) remains deferred — confirmed that standard GSAP and `useGSAP` are available without license restrictions.

---
*Phase: 01-foundation*
*Completed: 2026-02-20*
