# AceAgency Design System — MASTER

> Complete visual language specification for aceagency.ro
> Inspired by addifico.com design sensibility, applied with AceAgency brand identity.

---

## 1. Design Philosophy

**Core principle:** The website IS the proof of capability. Every pixel, animation, and interaction demonstrates what AceAgency can deliver for clients.

**Aesthetic direction:** "Precision Elegance" — Clean, architectural layouts with bold typography, purposeful white space, and kinetic micro-interactions. Dark-dominant palette with electric color accents that feel premium without feeling cold. Component-driven design (no stock photos in main sections), line-art iconography, bento-grid compositions, and scroll-triggered choreography that rewards exploration.

**Anti-AI signals (distinctiveness):**
1. Custom font pairing: Glacial Indifference + Red Hat Display (not a common AI default)
2. Non-standard color triad: Electric Violet + Cobalt Blue + Electric Mint
3. Asymmetric bento layouts (not cookie-cutter grids)
4. Character-level kinetic typography on hero headlines
5. Mix-blend-mode cursor interaction on desktop
6. Dark/light section transitions with scroll-driven opacity
7. Line-art icon system (custom, not generic icon sets)

---

## 2. Color Palette

### Brand Colors

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| Electric Violet | `#650CBE` | `oklch(0.44 0.21 292)` | Primary actions, CTAs, links, primary gradients |
| Cobalt Blue | `#4500D0` | `oklch(0.35 0.25 270)` | Secondary actions, hover states, gradient endpoints |
| Electric Mint | `#66F3A6` | `oklch(0.88 0.17 155)` | Accent highlights, success states, badge backgrounds |
| Black | `#262523` | `oklch(0.19 0.005 80)` | Dark backgrounds, primary text on light |
| White | `#FFFFFF` | `oklch(1.0 0 0)` | Light backgrounds, primary text on dark |
| Grey | `#D9D9D9` | `oklch(0.88 0 0)` | Secondary text on dark, borders, muted elements |
| Burgundy | `#56151A` | `oklch(0.30 0.10 25)` | Error states, destructive actions, highlight accents |

### Extended Palette

| Token | Value | Usage |
|-------|-------|-------|
| `violet-light` | `oklch(0.55 0.18 292)` | Violet hover / lighter variant |
| `violet-glow` | `oklch(0.44 0.21 292 / 0.15)` | Glow effects, box shadows |
| `mint-soft` | `oklch(0.88 0.17 155 / 0.10)` | Subtle mint background tint |
| `dark-elevated` | `oklch(0.22 0.005 80)` | Card surfaces on dark background |
| `dark-border` | `oklch(0.28 0.005 80)` | Borders on dark background |
| `light-muted` | `oklch(0.97 0 0)` | Light section backgrounds (off-white) |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| `brand-primary` | `linear-gradient(135deg, #650CBE, #4500D0)` | Primary CTA buttons, hero accents |
| `brand-glow` | `radial-gradient(circle, oklch(0.44 0.21 292 / 0.20), transparent 70%)` | Background glow effects |
| `dark-fade` | `linear-gradient(180deg, #262523 0%, #1a1918 100%)` | Dark section depth |
| `mint-highlight` | `linear-gradient(90deg, #66F3A6, oklch(0.80 0.15 170))` | Accent underlines, progress bars |

### Section Color Schemes

| Scheme | Background | Text | Accent | Border |
|--------|-----------|------|--------|--------|
| `dark` | Black #262523 | White #FFFFFF | Electric Mint | dark-border |
| `light` | White #FFFFFF | Black #262523 | Electric Violet | Grey #D9D9D9 |
| `light-muted` | light-muted | Black #262523 | Electric Violet | Grey #D9D9D9 |
| `violet` | Electric Violet | White #FFFFFF | Electric Mint | violet-light |

---

## 3. Typography

### Font Stack

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| Headings | Glacial Indifference | Bold (700), Regular (400) | Arial, sans-serif |
| Subheadings | Red Hat Display | Regular (400), Medium (500) | Arial, sans-serif |
| Body | Inter | Regular (400), Medium (500), SemiBold (600) | system-ui, sans-serif |

### Type Scale

Based on a 1.250 (major third) scale with 16px base.

| Token | Size (desktop) | Size (mobile) | Line Height | Letter Spacing | Font | Weight |
|-------|---------------|---------------|-------------|----------------|------|--------|
| `display-xl` | 80px / 5rem | 44px / 2.75rem | 1.05 | -0.03em | Glacial Indifference | Bold |
| `display-lg` | 64px / 4rem | 36px / 2.25rem | 1.1 | -0.02em | Glacial Indifference | Bold |
| `h1` | 52px / 3.25rem | 32px / 2rem | 1.15 | -0.02em | Glacial Indifference | Bold |
| `h2` | 40px / 2.5rem | 28px / 1.75rem | 1.2 | -0.015em | Glacial Indifference | Bold |
| `h3` | 32px / 2rem | 24px / 1.5rem | 1.25 | -0.01em | Glacial Indifference | Regular |
| `h4` | 24px / 1.5rem | 20px / 1.25rem | 1.3 | 0 | Red Hat Display | Medium |
| `h5` | 20px / 1.25rem | 18px / 1.125rem | 1.4 | 0 | Red Hat Display | Regular |
| `subtitle` | 20px / 1.25rem | 18px / 1.125rem | 1.5 | 0.02em | Red Hat Display | Regular |
| `body-lg` | 18px / 1.125rem | 17px / 1.0625rem | 1.6 | 0 | Inter | Regular |
| `body` | 16px / 1rem | 16px / 1rem | 1.6 | 0 | Inter | Regular |
| `body-sm` | 14px / 0.875rem | 14px / 0.875rem | 1.5 | 0 | Inter | Regular |
| `caption` | 12px / 0.75rem | 12px / 0.75rem | 1.4 | 0.03em | Inter | Medium |
| `overline` | 12px / 0.75rem | 12px / 0.75rem | 1.4 | 0.12em | Inter | SemiBold |

### Typography Rules

- **Single H1 per page** with primary keyword (SEO requirement)
- **Heading hierarchy:** H1 > H2 > H3 (no skipping levels)
- **Minimum body text:** 16px (project rule, WCAG compliance)
- **Overline text:** Always uppercase, used for section labels above headings
- **Hero headlines:** Use `display-xl` or `display-lg` with character-level animation
- **Paragraph max-width:** 65ch for optimal readability

---

## 4. Spacing System

8px base unit, exponential scale for larger values.

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | Reset |
| `space-1` | 4px | Tight inline gaps |
| `space-2` | 8px | Icon-to-text gaps, tight padding |
| `space-3` | 12px | Small card padding |
| `space-4` | 16px | Default element gap, input padding |
| `space-5` | 20px | Card content padding |
| `space-6` | 24px | Card padding, nav item gap |
| `space-8` | 32px | Section content gaps |
| `space-10` | 40px | Medium section padding |
| `space-12` | 48px | Tap target minimum (48px) |
| `space-16` | 64px | Section vertical padding (mobile) |
| `space-20` | 80px | Section vertical padding (tablet) |
| `space-24` | 96px | Section vertical padding (desktop) |
| `space-32` | 128px | Hero vertical padding |
| `space-40` | 160px | Extra-large section spacing |

### Container

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| `xs` (320px) | 100% | 16px |
| `sm` (640px) | 100% | 24px |
| `md` (768px) | 720px | 24px |
| `lg` (1024px) | 960px | 32px |
| `xl` (1280px) | 1200px | 32px |
| `2xl` (1536px) | 1400px | 32px |
| `3xl` (2560px) | 1600px | 32px |

### Section Rhythm

Every full-width section follows this vertical padding pattern:
- **Mobile:** `py-16` (64px top/bottom)
- **Tablet:** `py-20` (80px)
- **Desktop:** `py-24` (96px)
- **Hero sections:** `py-32` (128px) on desktop, `py-20` (80px) on mobile

---

## 5. Layout System

### Grid

- **Base grid:** 12-column CSS Grid
- **Gutter:** 24px (mobile), 32px (desktop)
- **Bento grid:** Asymmetric grid compositions for featured sections (services, testimonials)
- **Content grid:** max-width container with centered alignment

### Bento Grid Patterns

**Pattern A — 2+1 (featured left):**
```
┌────────────┬───────┐
│            │       │
│  Featured  │ Small │
│            │       │
│            ├───────┤
│            │       │
│            │ Small │
│            │       │
└────────────┴───────┘
```

**Pattern B — Masonry 3-col:**
```
┌──────┬──────┬──────┐
│      │      │      │
│  Md  │  Lg  │  Md  │
│      │      │      │
├──────┤      ├──────┤
│      │      │      │
│  Lg  ├──────┤  Sm  │
│      │      │      │
│      │  Md  ├──────┤
│      │      │      │
└──────┴──────┤  Lg  │
              │      │
              └──────┘
```

**Pattern C — Stats row (4-col equal):**
```
┌──────┬──────┬──────┬──────┐
│ Stat │ Stat │ Stat │ Stat │
└──────┴──────┴──────┴──────┘
```

**Responsive:** All bento grids collapse to single-column stack on mobile (<768px).

---

## 6. Component Patterns

> Full component specifications in `components.md`. Summary here.

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | brand-primary gradient | White | none | brightness(1.1), scale(1.02) |
| `secondary` | transparent | Electric Violet | 1px Electric Violet | bg Electric Violet, text White |
| `ghost` | transparent | White/Black (contextual) | none | bg white/10 or black/5 |
| `accent` | Electric Mint | Black | none | brightness(1.05) |

- **Size:** `sm` (36px h), `md` (44px h), `lg` (52px h)
- **Border radius:** `--radius` (0.5rem) default, `full` for pill buttons
- **Min tap target:** 48x48px on mobile

### Cards

| Variant | Background | Border | Shadow | Hover |
|---------|-----------|--------|--------|-------|
| `default` | dark-elevated | 1px dark-border | none | border violet-light, translateY(-4px) |
| `glass` | white/5 backdrop-blur-md | 1px white/10 | none | border white/20 |
| `feature` | dark-elevated | none | violet-glow | scale(1.02), glow intensify |
| `light` | White | 1px Grey | sm shadow | translateY(-4px), shadow-md |

### Section Headers

Every section uses this pattern:
1. **Overline** — uppercase, caption size, Electric Mint or Electric Violet, letter-spacing 0.12em
2. **Heading** — h2 size, bold, below overline with space-2 gap
3. **Description** — body-lg, muted text, max-width 65ch, below heading with space-4 gap

### Navigation

- **Desktop:** Horizontal nav links, locale switcher (RO/EN), primary CTA button
- **Mobile:** Hamburger icon (right-aligned), fullscreen overlay menu
- **Scroll behavior:** Header hides on scroll down, reveals on scroll up (60px threshold)

### Form Elements

- **Input:** 48px height, dark-elevated background, dark-border, focus: ring Electric Violet
- **Textarea:** Same styling, min-height 120px
- **Select:** Same styling with custom chevron icon
- **Label:** caption size, Inter SemiBold, above input with space-1 gap
- **Error:** caption size, Burgundy color, below input with space-1 gap

---

## 7. Icon System

- **Library:** Lucide React (primary), custom line-art SVGs for service icons
- **Sizes:** `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px), `2xl` (48px)
- **Stroke width:** 1.5px (default), 1px (large sizes)
- **Color:** Inherits current text color; accent icons use Electric Mint or Electric Violet
- **Service icons:** Custom line-art style, 48px canvas, 1.5px stroke, single-color (contextual)

### Service Icon Set

| Service | Icon Concept |
|---------|-------------|
| AceWeb | Browser window with code brackets |
| AceAds | Target/bullseye with arrow |
| AceAI | Neural network / brain circuit |
| AceMedia | Camera aperture / play button |
| Google Ads | Google "G" stylized |
| Facebook Ads | Social network nodes |
| TikTok Ads | Musical note with play |
| SEO | Magnifying glass with chart |
| Email Marketing | Envelope with send arrow |
| Consultanta | Lightbulb with strategy lines |

---

## 8. Animation System

### Core Principles

1. **Purposeful:** Every animation communicates something (entrance, feedback, hierarchy)
2. **Subtle:** No flashy or distracting effects; elegant and controlled
3. **Performant:** Use `transform` and `opacity` only (GPU-composited)
4. **Accessible:** All animations respect `prefers-reduced-motion: reduce`

### Timing

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `fast` | 200ms | `ease-out` | Button hover, toggle |
| `normal` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Card hover, fade |
| `smooth` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Section reveals, slides |
| `slow` | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrance, page transitions |
| `stagger-delay` | 50ms | — | Between staggered children |

### Scroll-Triggered Animations

**ScrollReveal (GSAP ScrollTrigger):**
- **Default:** Fade up from 60px below, 500ms, stagger 50ms
- **Trigger:** `start: "top 85%"` (fires when element top enters 85% of viewport)
- **Once:** `once: true` (no reverse on scroll back)
- **yOffset variants:** 60px (default), 100px (hero elements), 30px (small elements)

**Parallax:**
- **Background elements:** 0.3x scroll speed (subtle depth)
- **Foreground accents:** 1.2x scroll speed (slight lead)
- **Disabled on mobile** (performance)

### Entrance Animations

| Name | Transform | Opacity | Duration | Usage |
|------|----------|---------|----------|-------|
| `fade-up` | translateY(60px) -> 0 | 0 -> 1 | 500ms | Default section entrance |
| `fade-up-lg` | translateY(100px) -> 0 | 0 -> 1 | 600ms | Hero elements |
| `fade-in` | none | 0 -> 1 | 400ms | Overlays, modals |
| `scale-in` | scale(0.95) -> 1 | 0 -> 1 | 400ms | Cards on hover focus |
| `slide-left` | translateX(40px) -> 0 | 0 -> 1 | 500ms | Staggered list items |
| `slide-right` | translateX(-40px) -> 0 | 0 -> 1 | 500ms | Alternating content |

### Kinetic Typography (Hero Headlines)

- **Method:** GSAP SplitText (if licensed) or Framer Motion staggerChildren
- **Pattern:** Split headline into characters, stagger fade-up per character
- **Duration:** 800ms total, 30ms stagger per character
- **Trigger:** On page load (hero) or on scroll into view (section headers)
- **Fallback (no SplitText license):** Split by words, stagger 80ms per word

### Hover Micro-Interactions

| Element | Effect | Duration |
|---------|--------|----------|
| Card | translateY(-4px) + border-color change | 300ms |
| Button (primary) | brightness(1.1) + scale(1.02) | 200ms |
| Button (secondary) | fill background + text color swap | 200ms |
| Link | underline slide-in from left | 300ms |
| Icon | rotate(5deg) + scale(1.1) | 200ms |
| Nav link | color transition + dot indicator | 200ms |

### Section Transitions (Dark/Light)

Sections alternate between dark and light color schemes. The transition is achieved through:
1. Each `<section>` has a `data-theme="dark|light"` attribute
2. Background color transitions via CSS on scroll
3. Text and accent colors adapt automatically via CSS custom properties scoped to `[data-theme]`

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- All scroll-triggered animations → instant (no transform, opacity: 1)
- Hero text animation → no stagger, simple fade-in 300ms
- Hover effects → color changes only, no transforms
- Parallax → disabled
- Custom cursor → disabled

---

## 9. Image and Media

### Image Rules

- **Format:** WebP with JPEG/PNG fallback
- **Loading:** Lazy (except hero/above-fold images)
- **Responsive:** `srcSet` with 640w, 768w, 1024w, 1280w, 1920w
- **Dimensions:** Always specify `width` and `height` (CLS prevention)
- **Alt text:** Descriptive, max 125 characters, includes keyword naturally
- **Component:** Always use `next/image` (never raw `<img>`)

### Photography Style (when used)

- Minimal use — component-driven design preferred
- Natural lighting or high contrast
- Neutral palette (black, white, grey) with brand color accents
- No heavy filters, no saturated tones
- Stock photos only temporarily for blog/services, replaced with originals

---

## 10. Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `xs` | 320px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |
| `3xl` | 2560px | Ultra-wide |

### Mobile-First Approach

- Base styles target mobile (320px+)
- Progressive enhancement via `min-width` media queries
- Touch targets: minimum 48x48px
- No popup interstitials on mobile
- Bento grids collapse to single-column below 768px
- Typography scales down per type scale table

---

## 11. Accessibility

- **Standard:** WCAG 2.1 AA
- **Color contrast:** Minimum 4.5:1 for body text, 3:1 for large text (18px+ bold or 24px+)
- **Focus indicators:** 2px ring in Electric Violet on all interactive elements
- **Keyboard navigation:** Full support for all interactive elements
- **ARIA labels:** On icon-only buttons, decorative images marked `aria-hidden`
- **Skip navigation:** "Skip to main content" link as first focusable element
- **Heading hierarchy:** Strict H1 > H2 > H3, single H1 per page
- **Motion:** All animations respect `prefers-reduced-motion`

---

## 12. File Reference

| File | Purpose |
|------|---------|
| `design-system/MASTER.md` | This file — complete visual language spec |
| `design-system/tokens.css` | CSS custom properties for all design tokens |
| `design-system/components.md` | Detailed component pattern specifications |
| `design-system/moodboard.md` | Visual direction, mood references, inspiration |
| `design-system/pages/home.md` | Homepage page spec |
| `design-system/pages/despre-noi.md` | About page spec |
| `design-system/pages/servicii.md` | Services index page spec |
| `design-system/pages/contact.md` | Contact page spec |

All page specs reference patterns defined in this MASTER document. Implementation uses `/frontend-design` skill against each page spec.
