# Laboratorul de Conversii Design System — MASTER

> Complete visual language specification for aceagency.ro (Laboratorul de Conversii)
> Built and verified across Phases 1–4. This document reflects the actual codebase.

---

## 1. Design Philosophy

**Core principle:** The website IS the proof of capability. Every pixel, animation, and interaction demonstrates what Laboratorul de Conversii can deliver for clients.

**Aesthetic direction:** "Precision Elegance" — Clean, architectural layouts with bold typography, purposeful white space, and kinetic micro-interactions. Dark-dominant palette with restrained Violet accents that feel premium without feeling cold. Component-driven design (no stock photos in main sections), icon-based service representation, bento-grid compositions, and scroll-triggered choreography that rewards exploration.

**Anti-AI signals (distinctiveness):**
1. Custom font pairing: Glacial Indifference + Red Hat Display (not a common AI default)
2. Restrained monochrome palette with Violet accent — not the typical blue/purple/gradient AI look
3. Asymmetric bento layouts (not cookie-cutter grids)
4. Character-level and word-level kinetic typography on hero headlines (GSAP SplitText)
5. Dark/light section transitions with scroll-driven opacity and floating rounded panels
6. Brand logos (react-icons) for platform services instead of generic icons
7. Scroll-scrubbed text reveal (ScrubReveal) for transition sections

---

## 2. Color Palette

### Brand Colors

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| Violet | `#650CBE` | `oklch(0.30 0.10 25)` | Primary actions, CTAs, links, accent highlights, brand signature |
| Black | `#262523` | `oklch(0.19 0.005 80)` | Dark backgrounds, primary text on light |
| White | `#FFFFFF` | `oklch(1.0 0 0)` | Light backgrounds, primary text on dark |
| Grey | `#D9D9D9` | `oklch(0.88 0 0)` | Secondary text on dark, borders, muted elements, overlines |

### Extended Palette

| Token | Value | Usage |
|-------|-------|-------|
| `violet-light` | `oklch(0.38 0.10 25)` | Violet hover / lighter variant (`#7A1FD8`) |
| `violet-glow` | `oklch(0.30 0.10 25 / 0.15)` | Glow effects, box shadows |
| `violet-soft` | `oklch(0.30 0.10 25 / 0.10)` | Subtle violet background tint |
| `dark-elevated` | `#3a3836` with 50% opacity | Card surfaces on dark background |
| `dark-border` | `#4a4643` with 50% opacity | Borders on dark background |
| `light-muted` | `#EBEBEB` | Light section CTA cards (off-white) |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| `brand-primary` | `linear-gradient(135deg, #650CBE, #4A0A8F)` | Primary CTA buttons, hero accents |
| `brand-glow` | `radial-gradient(circle, oklch(0.30 0.10 25 / 0.20), transparent 70%)` | Background glow effects (hero, decorative) |
| `dark-fade` | `linear-gradient(180deg, #262523 0%, #1a1918 100%)` | Dark section depth |

### Section Color Schemes (data-theme)

Applied via `SectionWrapper` component's `data-theme` attribute. CSS custom properties auto-adapt text, accent, and border colors.

| Scheme | Background | Text | Muted Text | Border | Card Bg |
|--------|-----------|------|------------|--------|---------|
| `dark` | Black #262523 | White #FFFFFF | Grey #D9D9D9 | dark-border | #3a3836 |
| `light` | White #FFFFFF | Black #262523 | Grey #6b7280 | #e5e7eb | #FFFFFF |
| `light-warm` | Warm Off-white #FAF9F7 | Black #262523 | Greige #71706E | #E8E6E3 | #FFFFFF |
| `light-muted` | Light Grey #EBEBEB | Black #262523 | Grey #666666 | #c4c4c4 | #FFFFFF |
| `accent` (violet) | Violet #650CBE | White #FFFFFF | Grey #d4d4d4 | violet-soft | #4A0A8F |

---

## 3. Typography

### Font Stack

| Role | Font | Weights | CSS Variable | Fallback |
|------|------|---------|-------------|----------|
| Headings | Glacial Indifference | Bold (700), Regular (400) | `--font-heading` | Arial, sans-serif |
| Subheadings | Red Hat Display | Regular (400), Medium (500) | `--font-subheading` | Arial, sans-serif |
| Body | Inter | Regular (400), Medium (500), SemiBold (600) | `--font-body` | system-ui, sans-serif |

Fonts loaded via `next/font/local` (Glacial Indifference, Red Hat Display) and `next/font/google` (Inter) with `adjustFontFallback: 'Arial'` for CLS = 0.

### Type Scale (as built)

| Usage | Desktop | Mobile | Font | Weight |
|-------|---------|--------|------|--------|
| Hero headline | 4rem (64px) | 2.25rem (36px) | Glacial Indifference | Bold |
| Section heading (h2) | 3.5rem (56px) | 2rem (32px) | Glacial Indifference | Bold |
| Card heading (h3) | 1.25rem (20px) | 1.125rem (18px) | Glacial Indifference | Bold |
| Subheading / description | 1.25rem (20px) | 1.125rem (18px) | Red Hat Display | Regular |
| Body large | 1.125rem–1.5rem | 1rem–1.125rem | Inter | Regular |
| Body | 1rem (16px) | 1rem (16px) | Inter | Regular |
| Body small | 0.875rem (14px) | 0.875rem (14px) | Inter | Regular |
| Overline | 0.75rem (12px) | 0.75rem (12px) | Inter | SemiBold, uppercase, `letter-spacing: 0.12em` |
| Stat numbers | 3rem–4rem | 2rem–3rem | Glacial Indifference | Bold |

### Typography Rules

- **Single H1 per page** with primary keyword (SEO requirement)
- **Heading hierarchy:** H1 > H2 > H3 (no skipping levels)
- **Minimum body text:** 16px (WCAG compliance)
- **Overline text:** Always uppercase, used for section labels above headings
- **Hero headlines:** Use TextReveal with word or character stagger
- **`style={{ fontFamily: 'var(--font-heading)' }}`** used on headings, `var(--font-subheading)` on descriptions

---

## 4. Spacing & Layout

### Container

Implemented in `src/components/layout/Container.tsx`:
- Max width: 1280px (`max-w-7xl`)
- Padding: 16px mobile → 24px sm → 32px lg
- Centered with `mx-auto`

### Section Rhythm

Every section uses `SectionWrapper` which applies:
- **Standard:** `py-16 md:py-20 lg:py-24` (64px → 80px → 96px)
- **Hero sections:** `py-24 md:py-32` (96px → 128px)
- **Floating panels:** `rounded={true}` adds `rounded-[2rem]` with `mx-4 md:mx-8` margin for visual separation

### Grid Patterns

- **Bento grid:** `BentoGrid` component with `columns={2|3|4}`, CSS Grid with auto-row masonry feel
- **Service cards:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-6`
- **Stats:** 4-card bento with alternating dark/violet themes, first 2 cards span 2 rows on desktop
- **Testimonials:** Horizontal snap-scroll carousel

---

## 5. Icon System

### Libraries

| Library | Package | Usage |
|---------|---------|-------|
| Lucide React | `lucide-react` v0.575 | UI icons (arrows, navigation, generic service icons) |
| React Icons | `react-icons` v5.5 | Brand logos (Google, Facebook, TikTok) |

### Icon Registry

Centralized in `src/lib/service-icons.ts`. Maps string names to icon components with a `kind` field (`'lucide'` or `'react-icons'`) for rendering logic.

| Icon Name | Component | Kind | Service |
|-----------|-----------|------|---------|
| `FaGoogle` | FaGoogle | react-icons | Google Ads |
| `FaFacebookF` | FaFacebookF | react-icons | Facebook Ads |
| `FaTiktok` | FaTiktok | react-icons | TikTok Ads |
| `Search` | Search | lucide | SEO |
| `Mail` | Mail | lucide | Email Marketing |
| `Lightbulb` | Lightbulb | lucide | Consultanta Marketing |
| `Code` | Code | lucide | Web Development |
| `Target` | Target | lucide | Fallback |

### Rendering Pattern

```tsx
const { icon: Icon, kind: iconKind } = getServiceIcon(iconName);

{iconKind === 'lucide' ? (
  <Icon className="size-12" strokeWidth={1.5} />
) : (
  <Icon size={48} className="text-white" />
)}
```

### Sizing Conventions

- **Large decorative:** `size-16` to `size-24` (ServiceHero background)
- **Card icons:** `size-10` to `size-12` or `size={48}` for react-icons
- **Small UI:** `size-4` to `size-5` (breadcrumbs, buttons, arrows)
- **Lucide strokeWidth:** `1.5` default, `1` for large decorative

---

## 6. Animation System

### Stack

All animations use GSAP, imported exclusively from `src/lib/gsap.ts`:
- `gsap` — core tweening
- `useGSAP` — React hook (auto-cleanup)
- `ScrollTrigger` — scroll-driven animations
- `SplitText` — character/word splitting for kinetic typography

**Global defaults:** `ease: 'power2.out'`, `duration: 0.6`

### Animation Components

| Component | File | Behavior |
|-----------|------|----------|
| **ScrollReveal** | `animations/ScrollReveal.tsx` | Fade-up on scroll (opacity + y). Props: `yOffset` (default 60), `duration`, `start` |
| **TextReveal** | `animations/TextReveal.tsx` | SplitText stagger (char or word). Props: `variant`, `trigger` (scroll/load), `as` |
| **ScrubReveal** | `animations/ScrubReveal.tsx` | Scroll-scrubbed opacity reveal tied to scroll position. Bidirectional. Props: `variant` (word/char), `startOpacity` |
| **CountUp** | `animations/CountUp.tsx` | Number count-up on scroll. Props: `end`, `suffix`, `duration` |
| **ParallaxLayer** | `animations/ParallaxLayer.tsx` | ScrollTrigger scrub parallax (desktop only). Props: `speed` |

### Scroll-Triggered Patterns

| Pattern | Trigger Start | Duration | Easing | Used In |
|---------|--------------|----------|--------|---------|
| Fade-up | `top 85%` | 0.5s | power2.out | ScrollReveal, most sections |
| Stagger cards | `top 80%` | 0.6s, stagger 0.08s | power2.out | ServiceFeatures, ServicesGrid, BentoGrid |
| Word reveal | `top 85%` | 0.6s, stagger per word | power2.out | TextReveal (scroll variant) |
| Scrub opacity | `top bottom` to `bottom center` | scrub: true | none (linear) | ScrubReveal |
| CountUp | `top 80%` | 2s | power1.out | StatsSection |
| Hero exit | pinned, scrub | varies | none | HeroSection, AboutHero |
| Horizontal scroll | pinned, scrub | scrollWidth | none | ServicesPreview (desktop) |
| Entrance (label/heading) | `top 80%` | 0.6–0.7s | power2.out | HeroTransition |

### Hero Animations (Pinned Scroll)

Both `HeroSection` and `AboutHero` use a pinned scroll pattern:
1. Section pins at `top top`
2. Scroll drives exit animations (split text diverges left/right, opacity fades)
3. Unpins when scroll range ends
4. Uses `gsap.matchMedia()` for desktop-only pinning

### Reduced Motion

All animation components check `prefers-reduced-motion: reduce` via `gsap.matchMedia()`:
- Animations → set final state instantly (`gsap.set()`)
- Parallax → disabled
- CountUp → shows final number
- Hover transforms → CSS-only color changes remain

---

## 7. Section Theming System

### SectionWrapper

Every page section uses `SectionWrapper` (`src/components/sections/SectionWrapper.tsx`):

```tsx
<SectionWrapper theme="dark" id="section-id" rounded={true}>
  {children}
</SectionWrapper>
```

- `theme`: `'dark'` | `'light'` | `'light-warm'` | `'light-muted'` | `'accent'` | `'violet'` — sets `data-theme` attribute
- `rounded`: Creates floating panel effect with `rounded-[2rem]` and horizontal margin
- `hero`: Applies hero-specific padding
- Wraps children in `Container`
- CSS custom properties scope all text/border/accent colors via `[data-theme]` selectors in `tokens.css`

**Theme Guide:**
- **`dark`** — Deep black (#262523) with white text. Technical/feature sections, client logos. Strong premium feel.
- **`light-warm`** — NEW Phase 3. Warm off-white (#FAF9F7) with warm greige text (#71706E). Customer-facing sections (Services, Testimonials). Premium, inviting aesthetic.
- **`light`** — Pure white with dark text. Clean, minimal sections.
- **`accent` / `violet`** — Deep violet background (#650CBE) with white text. Sparingly used for premium CTAs.

### SectionHeader

Reusable header pattern (`src/components/sections/SectionHeader.tsx`):
- `overline`: Uppercase label (ScrollReveal)
- `heading`: h2 (TextReveal word variant)
- `description`: Optional body text (ScrollReveal)
- `align`: `'left'` (default) or `'center'`

---

## 8. Page Architecture Patterns

### Service Pages Template

All 6 service sub-pages follow this section sequence:
1. **ServiceHero** — h1 with primary keyword, breadcrumb, brand/decorative icon
2. **HeroTransition** — Label + heading (left) with ScrubReveal paragraph (right)
3. **ServiceFeatures** — SpotlightCard grid (4-6 items)
4. **ServiceProcess** — Vertical timeline with numbered steps
5. **ServiceStats** — Bento grid with CountUp numbers
6. **ServiceFAQ** — Accordion (Radix-based)
7. **ServiceCTA** — Light card with dual CTAs

Content comes from `messages/ro.json` and `messages/en.json` via `useTranslations('services')`.

### Homepage Sections

1. **HeroSection** — Pinned scroll exit, word-split headline (dark)
2. **HeroTransition** — Scroll-scrubbed transition text (dark)
3. **ServicesPreview** — Horizontal card carousel (GSAP pin desktop, CSS scroll mobile) - **light-warm** theme
4. **StatsSection** — Bento 4-card with CountUp (dark)
5. **ClientLogoBar** — Infinite CSS marquee of client logos - **dark** theme with grayscale hover-to-color transition
6. **AboutPreview** — Full-width ScrubReveal (dark)
7. **Testimonials** — Horizontal snap-scroll carousel with VideoTestimonialCard + text cards - **light-warm** theme
8. **CTASection** — Reusable CTA card (violet accent)
9. **Newsletter** — Split layout email form (dark)

### About Page Sections

1. **AboutHero** — Pinned scroll exit (same pattern as HeroSection) (dark)
2. **HeroTransition** — Scroll-scrubbed transition (dark)
3. **StorySection** — Company narrative with geometry decoration - **light-warm** theme
4. **ValuesSection** — 6-value card grid with icons - **light-warm** theme
5. **DivisionsSection** — REMOVED (single brand, no divisions)
6. **MissionVision** — Split layout mission/vision (dark)
7. **WhyChooseUs** — Differentiators list - **light-warm** theme
8. **TeamSection** — Team member photo cards (3:4 aspect, GSAP stagger) - **dark** theme
9. **CTASection** — Reused with about-specific content (violet)

---

## 9. Form Elements

### Current Patterns (as built)

- **Newsletter form** (Footer + Newsletter section): Email input with border-bottom style, submit button, GDPR checkbox. UI-only — server action wiring in Phase 5.
- **Input styling:** `bg-transparent border-b border-white/30 focus:border-[#650CBE]` (dark sections)
- **Button in forms:** `accent` variant or custom violet background

### Phase 5 Contact Form (planned)

- React Hook Form + Zod validation
- Resend for email delivery
- Server Actions for form submission
- Field-level error messages
- Honeypot spam protection

---

## 10. Responsive Strategy

- **Mobile-first:** Base styles target 320px+
- **Breakpoints:** `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
- **Touch targets:** Minimum 48x48px
- **Bento grids:** Collapse to single-column below 768px
- **Horizontal carousels:** CSS snap-scroll on mobile, GSAP pin on desktop (lg+)
- **Pinned hero animations:** Desktop only (via `gsap.matchMedia`)
- **Typography:** Scales per type scale table above

---

## 11. Accessibility

- **Standard:** WCAG 2.1 AA
- **Color contrast:** Violet on white passes 4.5:1 for body text
- **Focus indicators:** Ring on all interactive elements
- **Keyboard navigation:** Accordion, menu overlay, locale switcher all keyboard-accessible
- **ARIA:** `aria-hidden="true"` on decorative icons, `aria-label` on icon-only buttons
- **Heading hierarchy:** Strict H1 > H2 > H3, single H1 per page
- **Motion:** All animations respect `prefers-reduced-motion: reduce`
- **Semantic HTML:** Landmarks (`<main>`, `<nav>`, `<footer>`), proper heading levels

---

## 12. File Reference

| File | Purpose |
|------|---------|
| `design-system/MASTER.md` | This file — complete visual language spec |
| `design-system/components.md` | Detailed component pattern specifications |
| `design-system/moodboard.md` | Visual direction, mood references, inspiration |
| `design-system/pages/home.md` | Homepage page spec |
| `design-system/pages/despre-noi.md` | About page spec |
| `design-system/pages/servicii.md` | Services index page spec |
| `design-system/pages/contact.md` | Contact page spec |
| `src/styles/globals.css` | Global styles + token imports |
| `src/lib/gsap.ts` | Centralized GSAP with plugin registration |
| `src/lib/service-icons.ts` | Icon registry (Lucide + react-icons) |
| `src/lib/services.ts` | Service definitions (slug, i18n key, icon) |

All page specs reference patterns defined in this MASTER document.
