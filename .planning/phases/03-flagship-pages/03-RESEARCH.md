# Phase 3: Flagship Pages - Research

**Researched:** 2026-02-20
**Domain:** Page implementation with GSAP animations (kinetic typography, scroll reveals, parallax, count-up, bento grids)
**Confidence:** HIGH

## Summary

Phase 3 builds the Homepage and About page as flagship showcases of AceAgency's design capability. The current codebase has solid foundations from Phases 1-2: GSAP 3.14.2 with SplitText and ScrollTrigger registered in `src/lib/gsap.ts`, working `ScrollReveal` and `TextReveal` animation wrappers, a complete design system with page specs (`design-system/pages/home.md` and `design-system/pages/despre-noi.md`), and layout components (Header, Footer, MenuOverlay) already wired into the locale layout.

The existing homepage (`src/app/[locale]/page.tsx`) is a Phase 1 placeholder with color swatches and typography demos -- it must be completely replaced. The About page route (`src/app/[locale]/despre-noi/`) does not exist yet and must be created. Key technical challenges are: (1) building a `SectionWrapper` component with `data-theme` for dark/light/burgundy section theming, (2) extending `TextReveal` to support word-level stagger (currently only char-level), (3) building `CountUp`, `BentoGrid`, and `SectionHeader` reusable components, (4) implementing parallax depth effects via GSAP ScrollTrigger scrub, and (5) adding all i18n content under `home.*` and `about.*` namespaces in both `ro.json` and `en.json`.

**Primary recommendation:** Build section components bottom-up (SectionWrapper, SectionHeader, BentoGrid, CountUp first), then compose pages from those components. Extend TextReveal with a `variant="word"` mode. Use `data-theme` attribute with CSS scoped custom properties for dark/light/burgundy transitions -- hard cuts per user decision, no gradient bleeds.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Homepage "About Preview" right column:** Stylized Ace symbol -- use the actual AceAgency logo (`public/ace-agency-logo.webp`) as the basis. Claude has discretion on whether to use the logo directly (animated) or create a logo-inspired abstract motif.
- **About page "Story" right column:** Combination of abstract geometry (floating brand-colored shapes) and timeline milestones. Claude has discretion on the balance -- timeline primary with geometric accents or geometry primary with subtle timeline labels.
- **Logo replacement:** Use the actual AceAgency logo file (`public/ace-agency-logo.webp`) everywhere across the site, replacing any placeholder logo references.
- **Section transitions:** Hard cuts between all sections -- clean, sharp boundaries, no gradient bleeds or diagonal clips. Sections flow edge-to-edge with no gaps or separator lines between them.
- **Animation intensity -- Overall feel:** Professional base with bold hero moments -- hero sections are cinematic, inner sections are subtler and quicker.
- **Hero kinetic typography:** Word-level stagger (each word animates as a block), not character-level.
- **Scroll animations:** Fire once only -- play on first scroll into view and stay revealed, no replay on re-enter.

### Claude's Discretion

- Reduced motion implementation (instant show vs simple fades)
- Burgundy CTA section edge treatment (hard cut vs subtle glow bleed)
- About page Story visual balance (timeline vs geometry emphasis)
- Homepage Ace symbol treatment (direct logo animation vs logo-inspired motif)
- Exact animation easing curves and micro-timing

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | Homepage with hero, services preview, stats, testimonials, CTA, newsletter -- implemented via `/frontend-design` against `design-system/pages/home.md` | Full page spec exists (331 lines). All 7 sections documented with content, layout, responsive specs. i18n keys defined under `home.*` namespace. Components needed: SectionWrapper, SectionHeader, BentoGrid, CountUp, FeatureCard, StatCard, TestimonialCard. |
| PAGE-02 | About page (Despre noi) with agency story, values, mission, vision -- implemented via `/frontend-design` against `design-system/pages/despre-noi.md` | Full page spec exists (313 lines). 7 sections documented. i18n keys under `about.*` namespace. Shares SectionWrapper, SectionHeader, ScrollReveal with homepage. Unique components: numbered differentiator list, abstract geometry visual. |
| DSGN-02 | Scroll-triggered reveal animations on all content sections | ScrollReveal component already exists (`src/components/animations/ScrollReveal.tsx`). Uses GSAP ScrollTrigger with `toggleActions: 'play none none none'` (fire once). Needs to be applied to every section. |
| DSGN-03 | Dark/light alternating section transitions | Requires `data-theme` attribute on each `<section>` with CSS scoped custom properties in globals.css. Page specs define which sections are dark/light/burgundy. Hard cuts per user decision. |
| DSGN-04 | Parallax depth effects on scroll (GSAP ScrollTrigger, scrub mode) | GSAP ScrollTrigger `scrub` mode verified in Context7 docs. Apply to background decorative elements (brand glow, geometric shapes). Disable on mobile via `gsap.matchMedia()`. |
| DSGN-06 | Hover micro-interactions on service cards, testimonial cards (scale, shadow, whileHover) | CSS transitions for card hover effects (translateY, border-color, box-shadow). Feature Card spec in components.md: `scale(1.02)` + burgundy glow shadow. Testimonial Card: `translateY(-4px)` + border-color change. |
| DSGN-07 | Animated stats counters (count-up on scroll entry) | New CountUp component needed. GSAP `gsap.to` with `snap` for integer rounding, ScrollTrigger for fire-on-entry. Duration 2000ms per spec. Reduced motion: show final number immediately. |
| DSGN-08 | Kinetic/animated typography on hero headlines (staggered text reveal) | TextReveal component exists but only supports char-level split. User locked word-level stagger. Must extend TextReveal with `variant="word"` using `SplitText.create(el, { type: "words" })` then `gsap.from(split.words, ...)`. |
| DSGN-09 | Bento-grid testimonial layout (5+ visible, no carousel) | New BentoGrid component needed. CSS Grid with `grid-template-rows` for varied heights. Pattern B (masonry 3-col) for services, Pattern A or B for testimonials. Collapses to single column on mobile. |

</phase_requirements>

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | All animations (ScrollTrigger, SplitText, parallax, count-up) | Already installed and registered in `src/lib/gsap.ts` |
| @gsap/react | 2.1.2 | useGSAP hook for React 19 compatible cleanup | Already installed, used in ScrollReveal and TextReveal |
| next | 16.1.6 | App Router, next/image, generateMetadata | Project framework |
| next-intl | 4.8.3 | i18n with useTranslations, [locale] routing | All content bilingual RO/EN |
| lucide-react | 0.575.0 | Icon library for service/value card icons | Specified in design system |
| tailwindcss | 4.x | Utility-first CSS, responsive design | Project styling approach |

### Supporting (No New Installs Needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| motion | 12.34.3 | LazyMotion for whileHover on cards (optional) | Only if CSS hover transitions prove insufficient |
| class-variance-authority | 0.7.1 | Variant-based component styling | Card variant switching (default, feature, glass, stat, testimonial) |
| clsx + tailwind-merge | installed | Conditional className merging | All component className props |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP for count-up | react-countup library | Extra dependency; GSAP already installed and handles ScrollTrigger integration natively |
| CSS Grid bento | Masonry CSS (experimental) | CSS masonry not supported in Safari/Firefox yet; CSS Grid with explicit row spans is safer |
| GSAP for parallax | Intersection Observer + CSS transform | GSAP ScrollTrigger scrub is smoother and already imported |

**Installation:** No new packages needed. All dependencies are already in `package.json`.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/[locale]/
│   ├── page.tsx                    # Homepage (REPLACE existing placeholder)
│   └── despre-noi/
│       └── page.tsx                # About page (NEW)
├── components/
│   ├── ui/                         # Existing shadcn components
│   ├── layout/                     # Existing Header, Footer, Container
│   ├── animations/
│   │   ├── ScrollReveal.tsx        # Existing — no changes needed
│   │   ├── TextReveal.tsx          # MODIFY — add variant="word" support
│   │   ├── CountUp.tsx             # NEW — number count-up animation
│   │   └── ParallaxLayer.tsx       # NEW — parallax wrapper with scrub
│   └── sections/
│       ├── SectionWrapper.tsx      # NEW — data-theme + padding rhythm
│       ├── SectionHeader.tsx       # NEW — overline + heading + description
│       ├── BentoGrid.tsx           # NEW — asymmetric grid patterns A/B/C
│       ├── home/
│       │   ├── HeroSection.tsx     # NEW
│       │   ├── ServicesPreview.tsx  # NEW
│       │   ├── StatsSection.tsx    # NEW
│       │   ├── AboutPreview.tsx    # NEW
│       │   ├── Testimonials.tsx    # NEW
│       │   ├── CTASection.tsx      # NEW (reusable for About page too)
│       │   └── Newsletter.tsx      # NEW
│       └── about/
│           ├── AboutHero.tsx       # NEW
│           ├── StorySection.tsx    # NEW
│           ├── ValuesSection.tsx   # NEW
│           ├── DivisionsSection.tsx # NEW
│           ├── MissionVision.tsx   # NEW
│           └── WhyChooseUs.tsx     # NEW
├── messages/
│   ├── ro.json                     # MODIFY — add home.* and about.* namespaces
│   └── en.json                     # MODIFY — add home.* and about.* namespaces
└── styles/
    └── globals.css                 # MODIFY — add data-theme scoped properties
```

### Pattern 1: SectionWrapper with data-theme

**What:** Every page section uses a wrapper that sets background, text color, and accent via a `data-theme` attribute. This enables dark/light/burgundy theming without prop drilling colors to every child.

**When to use:** Every `<section>` on both Homepage and About page.

**Example:**
```typescript
// Source: design-system/MASTER.md Section Color Schemes + components.md SectionWrapper spec
interface SectionWrapperProps {
  readonly children: React.ReactNode;
  readonly theme: 'dark' | 'light' | 'light-muted' | 'burgundy';
  readonly className?: string;
  readonly id?: string;
  readonly hero?: boolean; // larger padding for hero sections
}

export function SectionWrapper({
  children,
  theme,
  className,
  id,
  hero = false,
}: SectionWrapperProps): React.JSX.Element {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        hero ? 'py-20 md:py-32' : 'py-16 md:py-20 lg:py-24',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
```

CSS in globals.css:
```css
/* Section theme scoping — hard cuts, no gradient bleed */
[data-theme="dark"] {
  background-color: #262523;
  color: #FFFFFF;
}
[data-theme="light"] {
  background-color: #FFFFFF;
  color: #262523;
}
[data-theme="light-muted"] {
  background-color: oklch(0.97 0 0);
  color: #262523;
}
[data-theme="burgundy"] {
  background-color: #56151A;
  color: #FFFFFF;
}
```

### Pattern 2: TextReveal Word-Level Stagger

**What:** Extend existing TextReveal to support word-level animation (user locked this for hero headlines).

**When to use:** Hero headlines on Homepage and About page. SectionHeader headings.

**Example:**
```typescript
// Source: Context7 GSAP SplitText docs + existing TextReveal.tsx
// Add variant prop: 'char' | 'word'
// In useGSAP callback:
if (variant === 'word') {
  SplitText.create(containerRef.current!, {
    type: 'words',
    autoSplit: true,
    onSplit(self) {
      gsap.from(self.words, {
        y: '100%',
        opacity: 0,
        duration,
        stagger,  // 0.08 for word-level (vs 0.025 for char)
        ease: 'power2.out',
        scrollTrigger: trigger === 'scroll' ? {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: 'play none none none',
        } : undefined,
      });
    },
  });
}
```

### Pattern 3: CountUp with GSAP

**What:** Animate numbers from 0 to target value on scroll entry.

**When to use:** Stats section on Homepage.

**Example:**
```typescript
// Source: Context7 GSAP docs + components.md CountUp spec
interface CountUpProps {
  readonly end: number;
  readonly suffix?: string;
  readonly duration?: number;
  readonly className?: string;
}

export function CountUp({ end, suffix = '', duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(counterRef.current, {
        value: end,
        duration,
        ease: 'power2.out',
        snap: { value: 1 }, // integer snap
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = `${Math.round(counterRef.current.value)}${suffix}`;
          }
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (ref.current) {
        ref.current.textContent = `${end}${suffix}`;
      }
    });
  }, { scope: ref });

  return <span ref={ref} className={className}>0{suffix}</span>;
}
```

### Pattern 4: Parallax via ScrollTrigger Scrub

**What:** Background decorative elements move at different scroll speeds for depth.

**When to use:** Hero brand glow effects, About page geometric shapes. Desktop only.

**Example:**
```typescript
// Source: Context7 GSAP ScrollTrigger scrub docs
export function ParallaxLayer({
  children,
  speed = 0.3,  // 0.3 = 30% of scroll speed (subtle)
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();

    // Only on desktop, not reduced motion
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(ref.current!, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // smooth catch-up over 1 second
        },
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={cn('pointer-events-none', className)}>
      {children}
    </div>
  );
}
```

### Pattern 5: BentoGrid with CSS Grid

**What:** Asymmetric grid for services and testimonials.

**When to use:** Homepage services preview (Pattern B), testimonials (Pattern A/B).

**Example:**
```typescript
// Source: design-system/MASTER.md Bento Grid Patterns
// Pattern B — Masonry 3-col with CSS Grid
// Use grid-column and grid-row spans for varied sizes
// On mobile: single column stack
// On tablet: 2-column simplified
// On desktop: 3-column with row-span variations

// Key CSS approach:
// grid-template-columns: repeat(3, 1fr)
// Children get: grid-row: span 2 (for tall cards), grid-row: span 1 (for short)
// Gap: 24px (space-6)
```

### Anti-Patterns to Avoid

- **Importing from 'gsap' directly:** Always import from `@/lib/gsap` -- team convention from Phase 1 (01-03 decision).
- **Using `toggleActions: 'play reverse play reverse'`:** User locked fire-once animations. Always use `'play none none none'`.
- **Gradient section transitions:** User locked hard cuts. Never use gradient bleeds or diagonal clips between sections.
- **Character-level hero animation:** User locked word-level for hero headlines. Use `type: "words"` not `type: "chars"`.
- **Carousel for testimonials:** Explicitly out of scope. All testimonials visible simultaneously in bento grid.
- **Stock photos:** Zero stock photos in main sections per design philosophy.
- **Animating layout properties:** Only use `transform` and `opacity` for GPU-composited animation. Never animate `width`, `height`, `margin`, `padding`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Number count-up animation | Manual requestAnimationFrame loop | GSAP `gsap.to` with `snap: { value: 1 }` + ScrollTrigger | GSAP handles easing, scroll integration, cleanup, and reduced motion via matchMedia |
| Text splitting for animation | Manual `text.split('')` + span wrapping | GSAP SplitText plugin (`SplitText.create`) | SplitText handles line wrapping, responsive reflow (`autoSplit`), and cleanup via `onSplit` return |
| Scroll-triggered visibility | Intersection Observer + useState | GSAP ScrollTrigger (already used everywhere) | Consistent API, automatic cleanup via useGSAP, battle-tested `start`/`end` position system |
| Responsive animation switching | Manual `window.matchMedia` listeners | `gsap.matchMedia()` | Automatic cleanup, scoped animations, works with useGSAP lifecycle |
| Smooth parallax | CSS `transform: translateZ()` + perspective | GSAP ScrollTrigger `scrub` mode | Smooth interpolation, configurable catch-up speed, automatic cleanup |

**Key insight:** GSAP is already the animation backbone of this project. Every animation primitive (count-up, parallax, text split, scroll trigger) should use GSAP rather than introducing alternative approaches. This keeps the animation system unified and the bundle size minimal.

## Common Pitfalls

### Pitfall 1: ScrollTrigger Position Drift from Font Loading

**What goes wrong:** ScrollTrigger calculates element positions on mount, but custom fonts (Glacial Indifference, Red Hat Display) load asynchronously and shift layout, causing triggers to fire at wrong scroll positions.
**Why it happens:** Font swap changes line heights and element heights after ScrollTrigger has measured.
**How to avoid:** Call `ScrollTrigger.refresh()` on window load event. The existing `ScrollReveal.tsx` already does this (lines 42-52). New components must also refresh, OR use a single top-level refresh in the page component.
**Warning signs:** Animations firing before elements are visible, or not firing until user scrolls past them.

### Pitfall 2: SplitText Cleanup in React Strict Mode

**What goes wrong:** React Strict Mode double-mounts components, causing SplitText to split already-split text, creating nested span garbage.
**Why it happens:** SplitText mutates the DOM. Without proper cleanup, the second mount operates on already-mutated DOM.
**How to avoid:** Return the animation from `onSplit` callback -- SplitText will automatically revert it. Also scope with `useGSAP({ scope: containerRef })` for automatic GSAP cleanup. The existing `TextReveal.tsx` handles this correctly via matchMedia cleanup.
**Warning signs:** Garbled text, missing characters, doubled spans in DevTools.

### Pitfall 3: Hydration Mismatch with CountUp Initial Text

**What goes wrong:** Server renders `0+` but client immediately runs GSAP to update to the final number, causing a React hydration warning.
**Why it happens:** Server-rendered HTML shows initial state, but GSAP runs before React reconciliation.
**How to avoid:** Use `suppressHydrationWarning` on the counter span, or render initial text as "0" on both server and client and let GSAP animate only after ScrollTrigger fires. Since CountUp is scroll-triggered (not on load), the initial "0" will be consistent between server and client.
**Warning signs:** Console hydration warnings, numbers flashing from final value to 0 then counting up.

### Pitfall 4: Bento Grid Layout Shift (CLS)

**What goes wrong:** Bento grid items have dynamic content lengths, causing layout to shift as content loads or fonts render.
**Why it happens:** CSS Grid with `auto` rows adjusts height based on content. Font loading changes text height.
**How to avoid:** Use explicit `min-height` on grid items, or use `grid-template-rows` with fixed row heights. Set `aspect-ratio` on cards where appropriate. Always specify `width` and `height` on images.
**Warning signs:** CLS score above 0.1 in PageSpeed, visible content jumping on page load.

### Pitfall 5: Too Many ScrollTrigger Instances

**What goes wrong:** Each ScrollReveal, TextReveal, CountUp, and ParallaxLayer creates its own ScrollTrigger. With 14+ sections across 2 pages, this can become 30+ ScrollTrigger instances, causing scroll jank.
**Why it happens:** Each component independently creates triggers without coordination.
**How to avoid:** (1) Use `once: true` equivalent (`toggleActions: 'play none none none'`) so triggers are killed after firing. (2) Batch-create triggers where possible (stagger children within a single useGSAP scope rather than per-child). (3) Call `ScrollTrigger.refresh()` once at page level after all triggers are created, not in each component.
**Warning signs:** Scroll performance drops below 60fps, visible jank on mobile.

### Pitfall 6: i18n Namespace Collision

**What goes wrong:** Translation keys conflict between pages or don't match the namespace expected by `useTranslations`.
**Why it happens:** The page spec defines keys under `home.*` but the existing `page.tsx` uses `useTranslations('HomePage')` (different namespace).
**How to avoid:** Adopt the page spec's namespace convention: `home.*` for homepage, `about.*` for about page. Replace the existing `HomePage` namespace in `ro.json`/`en.json`. Ensure all keys from the spec's "Content Keys" section are present in both language files.
**Warning signs:** Missing translation warnings in console, raw key strings rendered on page.

### Pitfall 7: AceAgency Logo WebP Rendering

**What goes wrong:** The logo file `public/ace-agency-logo.webp` may have a transparent background or unexpected dimensions, causing layout issues.
**Why it happens:** WebP files with transparency need explicit sizing and may look wrong on both dark and light backgrounds.
**How to avoid:** Always wrap the logo in `next/image` with explicit `width` and `height`. Test on both dark and light section backgrounds. Verify the image loads correctly by checking it in the browser before building the visual component.
**Warning signs:** Logo invisible on dark backgrounds, logo stretching, CLS from unsized image.

## Code Examples

### Dark/Light Section Theming (CSS)

```css
/* Source: design-system/MASTER.md Section Color Schemes */
/* Add to globals.css — scoped section themes with hard cuts */

[data-theme="dark"] {
  --section-bg: #262523;
  --section-text: #FFFFFF;
  --section-muted: #D9D9D9;
  --section-accent: #D9D9D9;
  --section-border: oklch(0.28 0.005 80);
  background-color: var(--section-bg);
  color: var(--section-text);
}

[data-theme="light"] {
  --section-bg: #FFFFFF;
  --section-text: #262523;
  --section-muted: oklch(0.45 0 0);
  --section-accent: #56151A;
  --section-border: #D9D9D9;
  background-color: var(--section-bg);
  color: var(--section-text);
}

[data-theme="burgundy"] {
  --section-bg: #56151A;
  --section-text: #FFFFFF;
  --section-muted: rgba(255, 255, 255, 0.9);
  --section-accent: #D9D9D9;
  --section-border: #7A2025;
  background-color: var(--section-bg);
  color: var(--section-text);
}
```

### Word-Level SplitText with Load Trigger (Hero)

```typescript
// Source: Context7 GSAP SplitText docs
// For hero headline: trigger on load, not scroll
useGSAP(() => {
  if (!containerRef.current) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    SplitText.create(containerRef.current!, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          y: '100%',
          opacity: 0,
          duration: 0.8,
          stagger: 0.08, // 80ms per word per spec
          ease: 'power2.out',
          // No scrollTrigger — fires on mount (hero load trigger)
        });
      },
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(containerRef.current!, { opacity: 1 });
  });
}, { scope: containerRef });
```

### Staggered Card Animation (Single useGSAP Scope)

```typescript
// Source: Existing ScrollReveal pattern + GSAP stagger docs
// Animate all children cards in one trigger (not per-card)
useGSAP(() => {
  if (!gridRef.current) return;

  const cards = gridRef.current.querySelectorAll('[data-animate="card"]');
  if (cards.length === 0) return;

  gsap.from(cards, {
    y: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08, // 80ms between cards per spec
    ease: 'power2.out',
    scrollTrigger: {
      trigger: gridRef.current,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}, { scope: gridRef });
```

### Newsletter Section (Reuse Footer Form Pattern)

```typescript
// Source: Existing Footer.tsx newsletter form (lines 117-148)
// The footer already has a newsletter form UI with GDPR checkbox.
// For the homepage Newsletter section, extract the form into a
// shared NewsletterForm component, then render it in both Footer and
// the homepage Newsletter section.
// Server action wiring is Phase 5 -- form UI only for now.
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GSAP SplitText requires Club license | SplitText included in gsap@3.14.2 standard package | 2024 | No license blocker; already verified in Phase 02-02 |
| `type: "chars, words"` string syntax | Both string and individual `"words"` or `"chars"` work | Stable | Use `type: "words"` for word-only split |
| `gsap.context()` for React cleanup | `useGSAP` hook from @gsap/react | 2024 | Hook handles context internally; preferred for React 19 |
| `ScrollTrigger.create({ once: true })` | `toggleActions: 'play none none none'` | Stable | Both work; toggleActions is more explicit about replay behavior |
| Manual `prefers-reduced-motion` check | `gsap.matchMedia()` with media query string | Stable | Cleaner pattern; auto-reverts animations when preference changes |

**Deprecated/outdated:**
- `SplitText` via `new SplitText()` constructor: Still works but `SplitText.create()` is the preferred static factory method.
- `gsap.context()` manual usage in React: Replaced by `useGSAP` hook which manages context internally.

## Open Questions

1. **AceAgency Logo Dimensions and Transparency**
   - What we know: File exists at `public/ace-agency-logo.webp`.
   - What's unclear: Exact pixel dimensions, whether it has transparent background, whether it renders well on both dark and light sections.
   - Recommendation: Read the image file at implementation time to determine dimensions. Use `next/image` with explicit width/height. Test on both dark and light backgrounds before finalizing the About Preview visual.

2. **Newsletter Form: Shared Component or Duplicate**
   - What we know: Footer already has a newsletter form UI (lines 117-148 of Footer.tsx). Homepage spec also has a Newsletter section with nearly identical form.
   - What's unclear: Whether extracting a shared `NewsletterForm` component is worth the refactor complexity vs. duplicating the form markup.
   - Recommendation: Extract a shared `NewsletterForm` component to avoid duplication. This aligns with DRY and will simplify Phase 5 when server action wiring is added.

3. **tokens.css Integration Status**
   - What we know: Phase 2 verification found tokens.css was NOT imported into globals.css. The Header CTA gradient was fixed with an inline value (STATE.md: "Header CTA gradient inline").
   - What's unclear: Whether tokens.css should be imported for Phase 3 (many page-level styles reference `--ds-*` tokens in the design system specs).
   - Recommendation: Import tokens.css into globals.css at the start of Phase 3 Plan 01. Many components will reference design system tokens (gradients, shadows, elevation colors). Importing once avoids repeatedly inlining values.

## Sources

### Primary (HIGH confidence)
- `/llmstxt/gsap_llms_txt` via Context7 -- SplitText word/char split, ScrollTrigger toggleActions, scrub mode, matchMedia, snap
- `design-system/pages/home.md` (331 lines) -- Homepage section specs, animation timings, i18n keys
- `design-system/pages/despre-noi.md` (313 lines) -- About page section specs, animation timings, i18n keys
- `design-system/MASTER.md` (428 lines) -- Design tokens, animation system, bento grid patterns, typography scale
- `design-system/components.md` (470 lines) -- 14 component patterns with hover/animation specs
- `src/lib/gsap.ts` -- GSAP 3.14.2 with SplitText + ScrollTrigger registered
- `src/components/animations/ScrollReveal.tsx` -- Existing scroll-triggered fade-up pattern
- `src/components/animations/TextReveal.tsx` -- Existing SplitText char-level animation pattern

### Secondary (MEDIUM confidence)
- Phase 2 Verification Report (`02-VERIFICATION.md`) -- Confirmed all layout components working, tokens.css gap documented
- `src/styles/globals.css` -- Current CSS structure, no data-theme scoping yet
- `src/messages/ro.json` -- Current translation structure, `HomePage` namespace needs replacement

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and verified working in Phases 1-2
- Architecture: HIGH -- patterns derived from existing codebase conventions and design system specs
- Pitfalls: HIGH -- based on verified GSAP behavior from Context7 and known issues from Phase 1-2 implementation

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (stable -- GSAP 3.14.x and Next.js 16 are not fast-moving)
