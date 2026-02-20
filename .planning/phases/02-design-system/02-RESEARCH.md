# Phase 2: Design System - Research

**Researched:** 2026-02-20
**Domain:** Design system generation via `/design` skill, shared layout components (Header, Footer), custom cursor, animation wrappers, SplitText character animations
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Header Navigation:** Minimal header: logo left, hamburger menu + CTA right — even on desktop (addifico style). Full navigation lives in a fullscreen overlay panel, not inline nav links. Menu overlay uses staggered character-level text reveal animation on nav links (SplitType + GSAP stagger). CTA button text: "Contacteaza-ne" (RO) / "Contact us" (EN). Header hides smoothly on scroll down, reappears on scroll up. Locale switcher (RO/EN) accessible within the menu overlay.
- **Footer Structure:** Full content in addifico-style layout: logo, tagline, office address, phone, email, social links (LinkedIn, Instagram, Facebook), quick nav links, newsletter signup form. Division badges displayed as horizontal pill/badge row under the logo (AceWeb, AceAds, AceAI, AceMedia). Newsletter signup form included in footer across all pages. Footer elements use staggered scroll-triggered reveal animation when scrolling into view. Copyright and legal links at bottom.
- **Custom Cursor:** Subtle, refined custom cursor — noticed subconsciously, never distracting. Neutral color (white/semi-transparent) — not brand-colored, to work across dark and light sections. Desktop only — completely disabled on touch devices. Hidden when mouse leaves the viewport.
- **Animation Personality:** Match addifico's smooth, refined, restrained feel — 0.3-0.5s transitions, subtle staggers. Scroll-triggered reveals: fade up direction (elements move up from below, like addifico's 100px shift). Headings use character-level split text animations (SplitType/GSAP stagger) — premium typographic reveals. Overall principle: let content speak, not effects. Animations enhance, don't distract. All animations respect `prefers-reduced-motion` — disable or simplify for accessibility.

### Claude's Discretion
- Custom cursor type (morphing circle, blend-mode, or magnetic dot — pick what matches the refined addifico feel)
- Cursor hover behavior on interactive elements (grow, show text label, or simple state change)
- Header scroll treatment (transparent-to-solid, glass morphism, or always solid — pick what looks best)
- Section transition style (hard cut vs gradient blend between dark/light sections)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FNDN-04 | Design system generated via `/design` skill — 6-phase orchestrator producing `design-system/MASTER.md`, `tokens.css`, `components.md`, `moodboard.md`, and page specs in `design-system/pages/*.md` | `/design` skill is an interactive orchestrator; Plan 02-01 runs it as a user-facing session; output files are consumed by `/frontend-design` in Phases 3-5 |
| DSGN-01 | Component-driven design inspired by addifico.com — bento-grid layouts, large typography as design element, zero stock photos in main sections, line-art icon system | Design system MASTER.md will define component patterns, typography scales, and layout grids; addifico reference locked in CONTEXT.md |
| DSGN-05 | Custom cursor effect on desktop (morphing/blend-mode, disabled on touch devices) | `gsap.quickTo()` for smooth 60fps tracking, `mix-blend-mode: difference` for blend effect, `pointer-events: none`, touch detection via `window.matchMedia('(hover: hover)')` and `'ontouchstart' in window` |
| DSGN-10 | Sticky header with smooth hide/show on scroll direction | `ScrollTrigger.create()` with `onUpdate: (self) => self.direction` to detect scroll direction; `gsap.to()` with `y` transform for smooth show/hide |
| FUNC-04 | Locale switcher (RO/EN) in navigation header | Existing `LocaleSwitcher` component uses `useRouter().replace(pathname, { locale })` from `@/i18n/navigation`; needs integration into menu overlay |
| FUNC-05 | Social media links in footer (LinkedIn, Instagram, Facebook) | Static link list with Lucide icons (`<Linkedin />`, `<Instagram />`, `<Facebook />`), `target="_blank"` + `rel="noopener noreferrer"`, translation keys for aria-labels |
</phase_requirements>

---

## Summary

Phase 2 has three distinct workstreams: (1) running the `/design` skill orchestrator to generate the visual language, (2) building shared layout components (Header with fullscreen overlay menu, Footer with full content), and (3) building animation infrastructure (custom cursor, enhanced animation wrappers with SplitText).

**Critical discovery: GSAP SplitText is now FREE.** As of GSAP 3.13 (April 2025), Webflow acquired GSAP and made all plugins free including SplitText, MorphSVG, ScrollSmoother, etc. The project already has `gsap@3.14.2` installed, which includes SplitText. This eliminates the blocker from STATE.md about needing a Club GSAP license. SplitText should be used directly instead of the third-party `split-type` package, since it has better accessibility features (automatic `aria-label` + `aria-hidden`), responsive `autoSplit`, and official GSAP support.

The Header is the most architecturally complex component: it combines a minimal persistent bar (logo + hamburger + CTA), a fullscreen overlay menu with character-level stagger animations via SplitText, scroll-direction-based show/hide via ScrollTrigger, and the locale switcher. The Footer is content-heavy but structurally simpler: a scroll-revealed grid with logo, divisions, contact info, nav links, newsletter form, and social links.

**Primary recommendation:** Use GSAP SplitText (free in gsap@3.14.2) for all character-level text animations. Use `gsap.quickTo()` with `mix-blend-mode: difference` for the custom cursor. Use `ScrollTrigger.create()` with `self.direction` for header hide/show. Wrap all GSAP animations in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` for accessibility.

---

## Standard Stack

### Core (already installed in Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Animation engine + SplitText + ScrollTrigger | Already installed; SplitText now free since 3.13; official GSAP source |
| @gsap/react | 2.1.2 | useGSAP hook for React lifecycle | Already installed; SSR-safe |
| next-intl | 4.8.3 | i18n routing, translations, locale switcher | Already installed; LocaleSwitcher exists |
| lucide-react | 0.575.0 | Icon library for social links and UI elements | Already installed; tree-shakeable |
| tailwindcss | 4.x | Utility CSS for layout, responsive, spacing | Already installed; brand tokens configured |

### New Dependencies Needed

| Library | Version | Purpose | Why Needed |
|---------|---------|---------|------------|
| (none) | - | - | SplitText is bundled in gsap@3.14.2; no new packages required |

**Installation:** No new packages needed. SplitText ships with `gsap@3.14.2`. Register it in `src/lib/gsap.ts`:

```typescript
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export { gsap, useGSAP, ScrollTrigger, SplitText };
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP SplitText | split-type (npm) | split-type was the go-to when SplitText required license; now SplitText is free, has better a11y (`aria-label`/`aria-hidden`), `autoSplit` for responsive, official support — USE SplitText |
| GSAP quickTo cursor | Framer Motion useSpring | Framer useSpring adds second animation runtime for cursor; GSAP quickTo is already loaded, 60fps optimized, and consistent with other animations |
| mix-blend-mode cursor | SVG mask cursor | SVG mask is more complex, heavier to implement; mix-blend-mode is CSS-only visual with GSAP tracking — simpler and refined |

---

## Architecture Patterns

### Recommended Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Minimal bar (logo, hamburger, CTA)
│   │   ├── MenuOverlay.tsx         # Fullscreen nav with SplitText animation
│   │   ├── Footer.tsx              # Full footer with all sections
│   │   ├── LocaleSwitcher.tsx      # Existing — will be embedded in MenuOverlay
│   │   └── Container.tsx           # Existing — responsive wrapper
│   ├── animations/
│   │   ├── ScrollReveal.tsx        # Existing — GSAP scroll-triggered fade-up
│   │   ├── TextReveal.tsx          # NEW — SplitText character stagger animation
│   │   └── CustomCursor.tsx        # NEW — mix-blend-mode cursor with quickTo
│   └── ui/                         # Existing shadcn components
├── lib/
│   └── gsap.ts                     # Existing — add SplitText registration
```

### Pattern 1: Header with Scroll-Direction Hide/Show

**What:** Sticky header that hides on scroll-down and shows on scroll-up using ScrollTrigger.
**When to use:** Global header across all pages.
**Source:** Context7 GSAP ScrollTrigger docs (self.direction)

```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/direction
'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power1.inOut',
    }).progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });
  }, { scope: headerRef });

  return <header ref={headerRef} className="fixed top-0 z-50 w-full">...</header>;
}
```

### Pattern 2: SplitText Character Reveal Animation

**What:** Split heading text into characters and animate with stagger.
**When to use:** Menu overlay nav links, hero headings, section headings.
**Source:** Context7 GSAP SplitText docs

```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText
'use client';

import { useRef } from 'react';
import { gsap, useGSAP, SplitText } from '@/lib/gsap';

interface TextRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly stagger?: number;
  readonly duration?: number;
}

export function TextReveal({
  children,
  className,
  stagger = 0.025,
  duration = 0.5,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      SplitText.create(containerRef.current!, {
        type: 'chars',
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.chars, {
            y: '130%',
            opacity: 0,
            duration,
            stagger,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        },
      });
    });
  }, { scope: containerRef });

  return <div ref={containerRef} className={className}>{children}</div>;
}
```

### Pattern 3: Custom Cursor with mix-blend-mode

**What:** Smooth-following cursor circle with blend-mode visual effect.
**When to use:** Desktop only, site-wide overlay.
**Source:** GSAP quickTo docs + Olivier Larose blend-mode tutorial

```typescript
// Source: https://gsap.com/resources/react-basics (quickTo section)
'use client';

import { useRef, useState, useCallback } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    if (!cursorRef.current) return;
    // Detect touch device — bail out entirely
    if (window.matchMedia('(hover: none)').matches) return;

    const xTo = gsap.quickTo(cursorRef.current, 'x', {
      duration: 0.2,
      ease: 'power3',
    });
    const yTo = gsap.quickTo(cursorRef.current, 'y', {
      duration: 0.2,
      ease: 'power3',
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  });

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{ opacity: 0 }}
    />
  );
}
```

### Pattern 4: Fullscreen Menu Overlay with SplitText Stagger

**What:** Overlay that slides in, then nav links appear with per-character stagger.
**When to use:** The hamburger menu opens this.

```typescript
// Conceptual pattern — combines gsap.timeline + SplitText
'use client';

function MenuOverlay({ isOpen }: { readonly isOpen: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!overlayRef.current) return;
    const links = overlayRef.current.querySelectorAll('.nav-link');
    const tl = gsap.timeline({ paused: true });

    // Step 1: Overlay slides in
    tl.to(overlayRef.current, { clipPath: 'inset(0%)', duration: 0.5, ease: 'power2.inOut' });

    // Step 2: Nav links appear with character stagger
    links.forEach((link) => {
      const split = SplitText.create(link, { type: 'chars' });
      tl.from(split.chars, {
        y: '130%',
        duration: 0.4,
        stagger: 0.025,
        ease: 'power1.inOut',
      }, '<+=0.1');
    });

    // Play/reverse based on state
    if (isOpen) tl.play();
    else tl.reverse();
  }, { dependencies: [isOpen], scope: overlayRef });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-background"
      style={{ clipPath: 'inset(100% 0 0 0)' }}
    >
      ...
    </div>
  );
}
```

### Pattern 5: Accessibility-First Animation Wrapper

**What:** All GSAP animations wrapped in `gsap.matchMedia` for prefers-reduced-motion.
**When to use:** Every animation component.
**Source:** Context7 GSAP a11y docs

```typescript
// Source: https://gsap.com/resources/a11y
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Animations here — auto-reverted when user enables reduced motion
    gsap.from(element, { y: 100, opacity: 0, duration: 0.5 });
  });
});
```

### Anti-Patterns to Avoid

- **Animating with useState for cursor position:** Causes re-renders on every mousemove (60fps). Use refs + `gsap.quickTo()` instead.
- **SplitText on Server Components:** SplitText manipulates DOM. Must be in `'use client'` components only.
- **Registering SplitText in component files:** Register once in `src/lib/gsap.ts`. Import from there.
- **Forgetting `autoSplit: true`:** Without it, SplitText breaks on font swap or resize. `autoSplit` re-splits automatically.
- **Not hiding default cursor:** When using custom cursor, add `cursor: none` to `body` on desktop only (via matchMedia or CSS media query).
- **Animating `left`/`top` for cursor:** Use `x`/`y` transforms (GPU-composited) instead of `left`/`top` (layout-triggering).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Text splitting into chars/words | Manual DOM splitting with `innerHTML` | GSAP `SplitText.create()` | Handles nested elements, preserves DOM, `autoSplit` for responsive, built-in a11y (`aria-label`/`aria-hidden`) |
| Smooth value interpolation for cursor | `requestAnimationFrame` lerp loop | `gsap.quickTo()` | Optimized, handles easing, auto-cleaned by useGSAP, integrated with GSAP tick engine |
| Scroll direction detection | `window.addEventListener('scroll')` with manual tracking | `ScrollTrigger.create({ onUpdate: self.direction })` | Debounced, performant, handles edge cases, integrates with other ScrollTrigger features |
| Reduced motion detection | Custom `window.matchMedia` listeners | `gsap.matchMedia()` | Auto-reverts animations when user changes preference, cleans up properly |
| Touch device detection | `navigator.userAgent` parsing | `window.matchMedia('(hover: none)')` + `'ontouchstart' in window` | Feature detection over UA sniffing; handles hybrid devices correctly |

**Key insight:** GSAP 3.14.2 already ships with everything needed for this phase — SplitText, ScrollTrigger, quickTo, matchMedia. No external packages needed beyond what Phase 1 installed. The single `src/lib/gsap.ts` registration point (established in Phase 1) makes adding SplitText a one-line change.

---

## Common Pitfalls

### Pitfall 1: SplitText and Font Loading Race

**What goes wrong:** SplitText splits text before custom fonts load, causing incorrect line breaks and character widths. When fonts load, text reflows but split elements don't.
**Why it happens:** `next/font/local` loads fonts asynchronously with `display: 'swap'`. SplitText may execute before the font swap completes.
**How to avoid:** Use `autoSplit: true` on `SplitText.create()`. This watches for element size changes (from font swap) and re-splits automatically. Additionally, the `onSplit` callback lets you re-create animations on each re-split.
**Warning signs:** Characters overlap or have gaps on first load but look correct on page refresh.

### Pitfall 2: Custom Cursor Blocks Click Events

**What goes wrong:** The cursor div captures pointer events, preventing clicks on buttons and links.
**Why it happens:** The cursor div is positioned above all content in the stacking order.
**How to avoid:** Always set `pointer-events: none` on the cursor element (both via CSS and as a Tailwind class). Verify with `pointer-events-none` class.
**Warning signs:** Buttons and links become unclickable when cursor overlay is active.

### Pitfall 3: Menu Overlay Animation Conflicts with React State

**What goes wrong:** GSAP timeline for menu open/close conflicts with React's rendering cycle, causing flickering or incomplete animations.
**Why it happens:** React re-renders the component when `isOpen` state changes, which can interrupt an in-progress GSAP animation.
**How to avoid:** Store the GSAP timeline in a ref (not state). Use `useGSAP` with `dependencies` array to respond to state changes. Call `tl.play()` or `tl.reverse()` instead of creating new timelines on each state change.
**Warning signs:** Menu animations play from the beginning instead of reversing, or flash briefly.

### Pitfall 4: ScrollTrigger Not Refreshing After Layout Change

**What goes wrong:** Header hide/show triggers fire at wrong scroll positions after menu overlay opens/closes (because overlay changes page layout).
**Why it happens:** ScrollTrigger caches element positions. Opening a fullscreen overlay that modifies scroll position invalidates these caches.
**How to avoid:** Call `ScrollTrigger.refresh()` after menu overlay close animation completes. Already have this pattern from Phase 1 ScrollReveal (font-loading refresh).
**Warning signs:** Header appears/disappears at wrong scroll positions after using the menu.

### Pitfall 5: Custom Cursor Visible on Touch Devices

**What goes wrong:** Custom cursor circle appears stationary on mobile/tablet where there's no mouse.
**Why it happens:** Touch devices still fire some pointer events, and the cursor div renders but never moves.
**How to avoid:** Check both `window.matchMedia('(hover: none)')` and `'ontouchstart' in window` on mount. If touch device, bail out of cursor initialization entirely (don't just hide — don't attach listeners). Also hide default cursor only on `(hover: hover)` devices.
**Warning signs:** Stationary white circle visible on mobile, or cursor appears briefly on tablet.

### Pitfall 6: Locale Switcher in Overlay Doesn't Close Menu

**What goes wrong:** User switches locale from inside the menu overlay, but the overlay stays open during/after navigation.
**Why it happens:** `router.replace()` triggers a client-side navigation that doesn't reset the menu `isOpen` state.
**How to avoid:** Listen for route changes (via `usePathname` from next-intl) and close the menu overlay when pathname or locale changes. Alternatively, close the menu before triggering locale switch.
**Warning signs:** Menu stays open after locale change, requiring manual close.

---

## Code Examples

### Registering SplitText in gsap.ts

```typescript
// src/lib/gsap.ts — Updated from Phase 1
// Source: https://gsap.com/docs/v3/Plugins/SplitText
'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

export { gsap, useGSAP, ScrollTrigger, SplitText };
```

### Touch Device Detection Utility

```typescript
// src/lib/device.ts
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    window.matchMedia('(hover: none)').matches
  );
}
```

### Footer Social Links Pattern

```typescript
// Source: lucide-react icon components
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: 'https://linkedin.com/company/aceagency', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/aceagency', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/aceagency', icon: Facebook, label: 'Facebook' },
] as const;

function SocialLinks() {
  return (
    <nav aria-label="Social media">
      <ul className="flex gap-4">
        {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex min-h-12 min-w-12 items-center justify-center"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Hiding Default Cursor on Desktop Only

```css
/* In globals.css — only when custom cursor is active */
@media (hover: hover) {
  body.custom-cursor-active {
    cursor: none;
  }
  body.custom-cursor-active a,
  body.custom-cursor-active button {
    cursor: none;
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| split-type npm package for text splitting | GSAP SplitText (free since 3.13) | April 2025 (GSAP 3.13) | No need for third-party split-type; SplitText has better a11y, autoSplit, official support |
| Club GSAP license required for SplitText | All GSAP plugins free (Webflow acquisition) | April 30, 2025 | Eliminates STATE.md blocker about GSAP SplitText license |
| Manual `requestAnimationFrame` for cursor | `gsap.quickTo()` | GSAP 3.10+ | Built-in optimized interpolation, auto-cleanup with useGSAP |
| `ScrollTrigger.matchMedia()` for responsive | `gsap.matchMedia()` | GSAP 3.11+ | More powerful, handles non-ScrollTrigger animations too, auto-reverts |
| `window.addEventListener('scroll')` for header | `ScrollTrigger.create({ onUpdate })` | GSAP 3.x | Debounced, performant, consistent with animation ecosystem |

**Deprecated/outdated:**
- `split-type` npm package: Still functional but GSAP SplitText is now the better choice (free, better a11y, autoSplit)
- `ScrollTrigger.matchMedia()`: Replaced by `gsap.matchMedia()` which is more general-purpose
- Club GSAP membership: No longer needed for any plugin (all free since April 2025)

---

## Discretionary Recommendations

For items marked as "Claude's Discretion" in CONTEXT.md:

### Custom Cursor Type: mix-blend-mode difference

**Recommendation:** Use a simple circle with `mix-blend-mode: difference`.
**Rationale:** This is the most refined and subtle approach — it inverts colors under the cursor, making it work equally well on dark and light sections without explicit color management. It is the approach used by premium agency sites (including sites in the addifico aesthetic family). A morphing circle or magnetic dot would draw more attention, contradicting the "noticed subconsciously, never distracting" requirement.

### Cursor Hover Behavior: Simple scale-up

**Recommendation:** Scale the cursor circle from 32px to 64px on interactive elements (links, buttons).
**Rationale:** A subtle scale change signals interactivity without adding text labels or complex morphing. Clean, fast, and consistent with the restrained animation personality.

### Header Scroll Treatment: Glass morphism (backdrop-blur)

**Recommendation:** Transparent background initially, transitioning to `backdrop-blur-md bg-background/80` when scrolled.
**Rationale:** Glass morphism is the current standard for premium agency headers. It provides content readability without the heaviness of a solid background. The transition from transparent to glass should happen on first scroll (via ScrollTrigger), not on hide/show.

### Section Transition Style: Soft gradient blend

**Recommendation:** Use CSS gradient overlays at section boundaries for smooth dark-to-light transitions.
**Rationale:** Hard cuts between dark and light sections feel jarring on a site targeting addifico's smooth feel. A short gradient (64-128px) at the boundary softens the transition. This is CSS-only (no GSAP needed) and doesn't affect performance.

---

## Open Questions

1. **Logo SVG file availability**
   - What we know: The logo uses Glacial Indifference font with the "As" symbol. Brand guide says "to be provided by client."
   - What's unclear: Is the SVG logo file available yet? Header and Footer both need it.
   - Recommendation: Use a text-based placeholder "ACE" in Glacial Indifference Bold during development. Replace with SVG when provided. Create the component to accept either text or SVG.

2. **Newsletter signup form in Footer — email service**
   - What we know: Resend is the email service per CLAUDE.md. Form uses React Hook Form + Zod.
   - What's unclear: This is technically a FUNC-02 requirement (Phase 5). Should Footer include a working form now or a placeholder?
   - Recommendation: Build the Footer form UI now (visual only), wire the Server Action in Phase 5 when FUNC-02 is implemented. The Footer component can accept an `onSubmit` prop or render the form with a placeholder action.

3. **Exact social media URLs**
   - What we know: LinkedIn, Instagram, Facebook links needed.
   - What's unclear: Are the actual profile URLs available?
   - Recommendation: Use placeholder URLs (e.g., `https://linkedin.com/company/aceagency`) and define them as constants in a config file for easy replacement.

---

## Sources

### Primary (HIGH confidence)
- Context7 `/llmstxt/gsap_llms_txt` — ScrollTrigger direction, quickTo, matchMedia, SplitText API, accessibility patterns
- Context7 `/amannn/next-intl` — useRouter, usePathname, locale switching, Link component
- [GSAP 3.13 Release Blog](https://gsap.com/blog/3-13/) — SplitText free, autoSplit, aria-label/aria-hidden, Webflow acquisition
- [GSAP SplitText Docs](https://gsap.com/docs/v3/Plugins/SplitText/) — API, character/word/line splitting, onSplit callback
- [GSAP Accessibility Docs](https://gsap.com/resources/a11y) — gsap.matchMedia, prefers-reduced-motion

### Secondary (MEDIUM confidence)
- [Olivier Larose Blend Mode Cursor Tutorial](https://blog.olivierlarose.com/tutorials/blend-mode-cursor) — mix-blend-mode cursor with React + GSAP quickTo
- [GSAP Community: Menu Drawer with Next.js](https://gsap.com/community/forums/topic/38099-optimizing-gsap-animation-logic-for-menu-drawer-with-nextjs-react-and-tailwind/) — Menu overlay animation patterns
- [CSS-Tricks: GSAP Free](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) — Confirmation of free license change

### Tertiary (LOW confidence)
- [Medium: Custom Cursor GSAP React](https://medium.com/@amilmohd155/elevate-your-ux-build-a-smooth-custom-cursor-with-gsap-and-react-b2a1bb1c01e8) — Additional cursor implementation patterns (not verified against official docs)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries already installed; SplitText free status verified via GSAP official blog and Context7
- Architecture: HIGH — Patterns verified against Context7 GSAP docs and official React integration guide
- Pitfalls: HIGH — Common issues documented in GSAP community forums and official accessibility docs
- Discretionary choices: MEDIUM — Based on addifico reference aesthetic and general premium agency patterns

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (stable; GSAP 3.14.2 is current, next-intl 4.x is stable)
