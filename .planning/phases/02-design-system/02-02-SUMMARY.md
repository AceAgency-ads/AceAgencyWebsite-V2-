---
phase: 02-design-system
plan: 02
subsystem: ui
tags: [header, footer, gsap, splittext, scroll-trigger, menu-overlay, newsletter, social-links, text-reveal]

# Dependency graph
requires:
  - phase: 02-01
    provides: Design system MASTER.md, tokens.css, components.md with Burgundy/Black/Grey palette
  - phase: 01-03
    provides: GSAP centralized module, ScrollReveal, brand tokens, custom fonts, Container
provides:
  - Header component with scroll hide/show and glass morphism
  - MenuOverlay with fullscreen SplitText character stagger animation
  - Footer with social links, divisions, newsletter form UI, legal links
  - TextReveal animation wrapper for character-level scroll reveals
  - SplitText registered in GSAP module
  - isTouchDevice utility
  - Header and Footer wired into layout.tsx
  - Translation keys for header, navigation, footer, social in RO/EN
affects:
  - 02-03 (CustomCursor uses isTouchDevice, renders in same layout)
  - 03-01 (Homepage hero uses TextReveal for kinetic typography)
  - 03-02 (Homepage sections rendered between Header and Footer)
  - 05-01 (Newsletter form needs backend wiring via Server Action)
  - 06-01 (Legal links in Footer need actual pages)

# Tech tracking
tech-stack:
  added: [gsap/SplitText, lucide-react icons (Linkedin, Instagram, Facebook)]
  patterns: [SplitText character stagger, ScrollTrigger scroll direction detection, clipPath overlay animation, gsap.matchMedia for reduced motion]

key-files:
  created:
    - src/components/layout/Header.tsx
    - src/components/layout/MenuOverlay.tsx
    - src/components/layout/Footer.tsx
    - src/components/animations/TextReveal.tsx
    - src/lib/device.ts
  modified:
    - src/lib/gsap.ts
    - src/app/[locale]/layout.tsx
    - src/styles/globals.css
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "SplitText is available in gsap@3.14.2 (no Club GSAP license needed) — registered alongside ScrollTrigger"
  - "Header uses ScrollTrigger.create with direction detection for hide/show (not IntersectionObserver)"
  - "MenuOverlay uses clipPath inset animation + SplitText character stagger timeline"
  - "Glass morphism via toggleClass on scroll past 50px — CSS class .header-scrolled in globals.css"
  - "Footer navigation column label uses locale detection to show 'Pagini' (RO) or 'Pages' (EN)"
  - "Newsletter form is UI-only — onSubmit prevents default, no server action wiring (Phase 5)"
  - "Legal links use placeholder hrefs — actual pages built in Phase 6"

patterns-established:
  - "Timeline-ref pattern: GSAP timeline stored in useRef, controlled by React state (play/reverse on isOpen)"
  - "Overlay body-scroll lock: document.body.style.overflow = hidden when overlay open"
  - "ScrollTrigger.refresh() after overlay close to recalculate trigger positions"
  - "gsap.matchMedia for prefers-reduced-motion wrapping in animation components"
  - "SplitText.create with autoSplit: true for font-swap resilience"

requirements-completed: [DSGN-10, FUNC-04, FUNC-05]

# Metrics
duration: 4min
completed: 2026-02-20
---

# Phase 2 Plan 2: Header, Footer, TextReveal Summary

**Fixed Header with scroll hide/show + fullscreen MenuOverlay using SplitText character stagger, content-rich Footer with social/newsletter/divisions, and TextReveal animation wrapper**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-20T17:40:34Z
- **Completed:** 2026-02-20T17:44:43Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Header with logo, animated hamburger, CTA, scroll hide/show, glass morphism backdrop
- Fullscreen MenuOverlay with clipPath + SplitText character stagger animation on nav links
- Content-rich Footer with divisions, contact, quick nav, newsletter form UI, social links, legal links
- TextReveal component for reusable character-level scroll animations
- All layout components wired into layout.tsx replacing the inline header

## Task Commits

Each task was committed atomically:

1. **Task 1: Register SplitText, create TextReveal wrapper, and device utility** - `864355c` (feat)
2. **Task 2: Build Header with scroll hide/show and fullscreen MenuOverlay** - `d7ee9c4` (feat)
3. **Task 3: Build Footer with social links, divisions, newsletter UI, and wire layout** - `c85aca0` (feat)

## Files Created/Modified
- `src/lib/gsap.ts` - Added SplitText registration alongside existing plugins
- `src/lib/device.ts` - Touch device detection utility (isTouchDevice)
- `src/components/animations/TextReveal.tsx` - Character-level SplitText stagger animation wrapper
- `src/components/layout/Header.tsx` - Fixed header with logo, hamburger, CTA, scroll behavior
- `src/components/layout/MenuOverlay.tsx` - Fullscreen overlay with SplitText nav link animation
- `src/components/layout/Footer.tsx` - Full footer with divisions, contact, social, newsletter, legal
- `src/app/[locale]/layout.tsx` - Replaced inline header with Header/Footer components, added main wrapper
- `src/styles/globals.css` - Added custom cursor CSS rules and header glass morphism class
- `src/messages/ro.json` - Added header, navigation, footer, social translation keys
- `src/messages/en.json` - Added header, navigation, footer, social translation keys

## Decisions Made
- SplitText confirmed available in standard gsap@3.14.2 package (no Club GSAP license required) — resolves the blocker noted in STATE.md
- Header scroll behavior uses ScrollTrigger direction detection (direction === 1 hide, -1 show) with 60px threshold
- MenuOverlay animation uses a GSAP timeline ref pattern: timeline created once, play/reverse controlled by React isOpen state
- Glass morphism applied via CSS class toggle (not inline style) for cleaner separation
- Newsletter form renders with GDPR checkbox but does not submit — wiring deferred to Phase 5

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Header and Footer visible on every page via layout.tsx
- TextReveal ready for hero headline kinetic typography in Phase 3
- SplitText registered and verified working
- Plan 02-03 (CustomCursor) can proceed — isTouchDevice utility available
- Newsletter form UI ready for Phase 5 server action wiring
- Legal link hrefs ready for Phase 6 page creation
- SplitText license blocker RESOLVED — no longer a concern

---
*Phase: 02-design-system*
*Completed: 2026-02-20*
