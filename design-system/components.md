# Laboratorul de Conversii Component Patterns

> Detailed component specifications reflecting the actual built codebase (Phases 1–4).
> All components reference tokens from `MASTER.md`.

---

## 1. Button (`src/components/ui/button.tsx`)

shadcn/ui button built on Radix Slot. Polymorphic via `asChild`.

### Variants

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `default` | Primary (dark) | White | none | brightness change |
| `destructive` | Red | White | none | darker red |
| `outline` | transparent | contextual | 1px border | bg fill |
| `secondary` | secondary bg | secondary text | none | darker |
| `ghost` | transparent | contextual | none | bg-accent |
| `link` | transparent | primary | none | underline |

### Sizes

| Size | Height | Padding | Usage |
|------|--------|---------|-------|
| `sm` | 36px | `h-9 px-3` | Header CTA, inline actions |
| `default` | 40px | `h-10 px-4 py-2` | Standard buttons |
| `lg` | 52px | `h-13 px-8` | Section CTAs, hero actions |
| `icon` | 36px | `size-9` | Icon-only buttons |

### Common Patterns

- **CTA with arrow:** `<Button asChild><Link>Text <ArrowRight className="ml-2 size-4" /></Link></Button>`
- **Violet CTA:** `className="bg-[#650CBE] hover:bg-[#7A1FD8] text-white rounded-full"`
- **Ghost on dark:** `className="border border-[var(--section-border)] text-[var(--section-text-muted)]"`
- **Disabled:** `aria-disabled="true"` + `pointer-events-none opacity-50`

---

## 2. SpotlightCard (`src/components/ui/SpotlightCard.tsx`)

Card with cursor-tracking radial gradient spotlight effect.

- **Background:** Transparent (parent provides bg via wrapper)
- **Spotlight:** Radial gradient following mouse position, `spotlightColor` prop
- **Used in:** ServiceFeatures, ServicesGrid
- **Pattern:** Wrap content in SpotlightCard inside a themed container div

```tsx
<SpotlightCard className="h-full rounded-2xl border border-black/10 bg-white p-8">
  <Icon className="mb-4 size-10 text-[#650CBE]" strokeWidth={1.5} />
  <h3 className="mb-2 text-lg font-bold">{title}</h3>
  <p className="text-sm text-[var(--section-text-muted)]">{description}</p>
</SpotlightCard>
```

---

## 3. Accordion (`src/components/ui/accordion.tsx`)

Radix-based expandable accordion. Used for service FAQ sections.

- **Trigger:** Full-width clickable, `py-4`, `font-medium`
- **Icon:** ChevronDown with `rotate-180` on open (CSS transition)
- **Content:** Collapsible with height animation
- **Keyboard:** Enter/Space to toggle, full keyboard navigation

### FAQ Pattern

```tsx
<Accordion type="single" collapsible>
  {faqs.map((faq, index) => (
    <AccordionItem key={index} value={`faq-${index}`}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

---

## 4. SectionWrapper (`src/components/sections/SectionWrapper.tsx`)

Core layout component wrapping every page section.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'dark' \| 'light' \| 'light-warm' \| 'light-muted' \| 'accent' \| 'violet'` | `'dark'` | Sets `data-theme` for CSS variable scoping |
| `rounded` | boolean | `true` | Floating panel with `rounded-[2rem]` and horizontal margin |
| `hero` | boolean | `false` | Hero-specific padding |
| `id` | string | — | Section anchor ID |
| `className` | string | — | Additional classes |
| `ref` | Ref | — | ForwardRef support (for GSAP pinning) |

### Theming

CSS custom properties auto-set via `[data-theme]` selectors in `tokens.css`:
- `--section-bg` — Section background color
- `--section-text` — Primary text color
- `--section-text-muted` — Secondary/muted text color
- `--section-border` — Border color
- `--section-card-bg` — Card background (typically white on light themes)
- `--section-accent` — Accent/action color (violet #650CBE)

Components use these variables: `text-[var(--section-text-muted)]`, `border-[var(--section-border)]`, `bg-[var(--section-card-bg)]`

**New in Phase 3:** `'light-warm'` theme introduces warm off-white background (#FAF9F7) with warm greige text for premium customer-facing sections.

---

## 5. SectionHeader (`src/components/sections/SectionHeader.tsx`)

Reusable section header pattern.

### Layout

```
OVERLINE TEXT              ← uppercase, 12px, letter-spacing 0.12em, muted (ScrollReveal)
Heading Text Here          ← h2, bold, Glacial Indifference (TextReveal word variant)

Optional description       ← body-lg, muted, max-width (ScrollReveal)
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `overline` | string | — | Uppercase label text |
| `heading` | string | — | Section heading |
| `description` | string | — | Optional body text below heading |
| `align` | `'left' \| 'center'` | `'left'` | Text alignment |
| `headingAs` | `'h2' \| 'h3'` | `'h2'` | Heading element |

---

## 6. HeroTransition (`src/components/sections/HeroTransition.tsx`)

Split section placed between hero and first content section. Creates visual continuity.

### Layout

```
┌─────────────────────┬─────────────────────┐
│ Label (overline)    │                     │
│ Large Heading       │ ScrubReveal         │
│                     │ paragraph text      │
└─────────────────────┴─────────────────────┘
```

### Behavior

- **Left column:** Label + heading with GSAP scroll-triggered entrance (fade-up + slide)
- **Separator line:** Animates `scaleX` 0→1 from left
- **Right column:** ScrubReveal word-by-word opacity tied to scroll position
- **i18n:** Takes `namespace` and `i18nPrefix` props for flexible content sourcing

---

## 7. TextReveal (`src/components/animations/TextReveal.tsx`)

GSAP SplitText animation wrapper for kinetic typography.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | string | `'div'` | HTML element to render |
| `variant` | `'word' \| 'char'` | `'word'` | Split method |
| `trigger` | `'scroll' \| 'load'` | `'scroll'` | When to trigger |
| `stagger` | number | 0.04 | Delay between items (seconds) |
| `duration` | number | 0.6 | Animation duration (seconds) |
| `triggerStart` | string | `'top 85%'` | ScrollTrigger start position |

### Usage Patterns

- **Hero headline (load):** `<TextReveal as="h1" variant="word" trigger="load">` — fires on mount
- **Section heading (scroll):** `<TextReveal as="h2" variant="word">` — fires on scroll
- **CTA heading:** `<TextReveal as="h2" variant="word" className="text-3xl font-bold">`

---

## 8. ScrollReveal (`src/components/animations/ScrollReveal.tsx`)

Fade-up entrance animation triggered by scroll.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `yOffset` | number | 60 | Vertical offset in pixels |
| `duration` | number | 0.5 | Animation duration (seconds) |
| `start` | string | `'top 85%'` | ScrollTrigger start |
| `className` | string | — | Wrapper classes |

### Usage

Wrap any content for scroll-triggered entrance:
```tsx
<ScrollReveal>
  <p>This fades up when scrolled into view</p>
</ScrollReveal>
```

---

## 9. ScrubReveal (`src/components/animations/ScrubReveal.tsx`)

Scroll-scrubbed text opacity reveal. Text starts dim, becomes fully opaque as user scrolls through.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'word' \| 'char'` | `'word'` | Split method |
| `startOpacity` | number | 0.15 | Initial opacity of unrevealed text |
| `as` | string | `'p'` | HTML element |

### Behavior

- Uses GSAP SplitText to split into words/chars
- Each unit scrubs from `startOpacity` to `1` as scroll progresses
- Fully bidirectional — reverses on scroll up
- Trigger: `top bottom` → `bottom center`

---

## 10. CountUp (`src/components/animations/CountUp.tsx`)

Animated number counter triggered on scroll.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `end` | number | — | Target number |
| `suffix` | string | `''` | After number (e.g., "+", "%") |
| `duration` | number | 2 | Duration in seconds |

### Behavior

- Counts from 0 to `end` using `gsap.to` with `snap`
- Trigger: `top 80%`, fires once
- Reduced motion: shows final number immediately

---

## 11. Header (`src/components/layout/Header.tsx`)

Fixed header with scroll-aware visibility.

### Behavior

- **Initial:** Visible, transparent background
- **After scroll (50px+):** Translucent background + `backdrop-blur-md` (`.header-scrolled` class)
- **Scroll down (60px threshold):** Hides with `translateY(-100%)`
- **Scroll up:** Reveals with `translateY(0)`
- **Implementation:** GSAP ScrollTrigger direction detection

### Layout

```
[Logo]                    [Hamburger ☰] [Contacteaza-ne CTA]
```

- Logo: Left-aligned, links to homepage
- Hamburger: Right-aligned, toggles MenuOverlay
- CTA: Primary button, rightmost (desktop)
- z-index: 50

---

## 12. MenuOverlay (`src/components/layout/MenuOverlay.tsx`)

Fullscreen mobile menu with SplitText character stagger.

### Layout

```
[Logo]                              [X Close]

              Acasa
              Despre Noi
              Servicii
              Contact

          [RO | EN]

── Social Links ──
LinkedIn  Instagram  Facebook
```

### Animation

- **Enter:** Nav links stagger from right with SplitText character reveal (80ms per link)
- **Exit:** Reverse timeline (play/reverse pattern via useRef timeline)
- **Implementation:** GSAP timeline stored in `useRef`, controlled by React `isOpen` state
- Body scroll locked while open

---

## 13. Footer (`src/components/layout/Footer.tsx`)

Full-width dark footer with 4-column layout.

### Structure

1. **Logo + description** — Top row
2. **4-column grid:**
   - Contact info (address, phone, email, hours)
   - Navigation links (pages)
   - Services links
   - Newsletter form (email + GDPR checkbox)
3. **Bottom bar:** Social icons (LinkedIn, Instagram, Facebook) + copyright + legal links
4. **Brand signature** (single brand, no divisions)

---

## 14. Breadcrumb (`src/components/sections/Breadcrumb.tsx`)

Navigation breadcrumb with JSON-LD schema.

- Server component (no `'use client'`)
- Renders `BreadcrumbList` JSON-LD for SEO
- ChevronRight separator between items
- Last item is current page (no link)
- Used on: Service sub-pages, About page

---

## 15. Service Page Components

All accept `serviceKey` prop, read from `services.{serviceKey}.*` i18n keys.

### ServiceHero (`services/ServiceHero.tsx`)

- h1 with primary keyword + TextReveal
- Breadcrumb navigation
- Decorative brand icon (top-right, 20% opacity)
- Brand glow gradient (top-right decorative)
- Overline + description with GSAP fade-up entrance

### ServiceFeatures (`services/ServiceFeatures.tsx`)

- SpotlightCard grid (1/2/3 columns responsive)
- 4-6 feature items from i18n
- Default Lucide icon fallback array (modulo index)
- GSAP stagger entrance on scroll

### ServiceProcess (`services/ServiceProcess.tsx`)

- Vertical timeline with left border line
- Large decorative step numbers (01, 02, 03...)
- Timeline dots on the border
- GSAP slide-from-left stagger entrance

### ServiceStats (`services/ServiceStats.tsx`)

- Bento-style stat cards with CountUp numbers
- Alternating dark/violet card themes

### ServiceFAQ (`services/ServiceFAQ.tsx`)

- Radix Accordion with FAQ schema JSON-LD
- 5-7 questions per service
- Full keyboard navigation

### ServiceCTA (`services/ServiceCTA.tsx`)

- Light grey (`#EBEBEB`) rounded card
- TextReveal heading + ScrollReveal description
- Dual CTAs: Primary (violet) + Secondary (outline)
- Links to `/contact`

---

## 16. BentoGrid (`src/components/sections/BentoGrid.tsx`)

Asymmetric CSS Grid wrapper.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | 2 \| 3 \| 4 | 3 | Number of columns on desktop |
| `className` | string | — | Additional classes |

### Behavior

- CSS Grid with `auto-rows-fr`
- Collapses to 1 column on mobile, 2 on tablet
- Children animate with fade-up stagger on scroll (GSAP)

---

## 17. LocaleSwitcher (`src/components/layout/LocaleSwitcher.tsx`)

Language toggle between RO and EN.

- Two buttons: active locale has Violet text + SemiBold
- Inactive locale: muted text, Regular weight
- Separator: `|` character
- Used in: Header, MenuOverlay

---

## 18. SmoothScroll (`src/components/layout/SmoothScroll.tsx`)

Lenis smooth scroll wrapper.

- Wraps page content for smooth scroll behavior
- Integrates with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Provides consistent scroll experience across browsers

---

## 19. VideoTestimonialCard (`src/components/sections/home/VideoTestimonialCard.tsx`)

Click-to-play video testimonial card (NEW Phase 3).

### Props

| Prop | Type | Description |
|------|------|-------------|
| `quote` | string | Customer testimonial text |
| `author` | string | Customer name |
| `company` | string | Customer company |
| `rating` | number | Star rating (1-5) |
| `thumbnailSrc` | string | Video thumbnail image URL |
| `videoSrc` | string | Video file URL (empty placeholder in Phase 3) |

### Layout

- **Top 60%:** 16:9 aspect ratio video area with thumbnail image + play button overlay
- **Bottom 40%:** Star rating + quote + author info + company name
- **Interactive:** Click to swap thumbnail for `<video autoplay controls>` element
- **Styling:** Rounded-3xl card, uses section theme CSS variables for border/bg/text
- **Hover effect:** Play button scales up, overlay opacity increases

### Usage

Used in Testimonials carousel (mixed with text cards). Pulled into carousel via i18n with `type: 'video'` flag.

---

## 20. ClientLogoBar (`src/components/sections/home/ClientLogoBar.tsx`)

Infinite CSS marquee of client logos (NEW Phase 3).

### Structure

- **Dark section** with small uppercase heading
- **Marquee track:** Duplicated logo array for seamless infinite loop
- **Logo styling:** Grayscale by default, full color on hover
- **Responsive:** Gap scales (12px mobile → 16px tablet/desktop)
- **Accessibility:** Duplicated logos marked `aria-hidden="true"`

### Reduced Motion Fallback

- Users with `prefers-reduced-motion: reduce` see static grid instead of marquee
- Grid: 2 columns mobile → 4 columns desktop
- Logos still respond to hover (grayscale-0)

### Marquee Animation

Uses `animate-marquee` CSS keyframe defined in `globals.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * var(--marquee-width))); }
}
```

Duration: 20s linear, infinite, respect prefers-reduced-motion.

### Data Structure

Currently uses placeholder SVG paths in `CLIENT_LOGOS` array. Replace with:
- Real company logo SVGs in `/public/images/clients/`
- Update `logo.src` paths and `logo.name` for alt text
- Maintain consistent aspect ratio (logo height ~40px max)

---

## 21. TeamSection (`src/components/sections/about/TeamSection.tsx`)

Team member photo card grid (NEW Phase 3).

### Props

Reads team members from i18n (`useTranslations('about')`) via `team.members` array with shape:

```ts
interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly image: string;
}
```

### Layout

- **Grid:** 1 column mobile → 2 columns tablet → 4 columns desktop
- **Card:** Rounded-2xl with 3:4 aspect ratio photo + name/role text
- **Photo:** Responsive image with lazy loading, object-cover crop
- **Info area:** Name (font-bold) + role (muted text)

### Animation

- **Scroll entrance:** GSAP from y:40 opacity:0 with 0.1s stagger
- **Hover:** -translate-y-1 (slight lift) + shadow increase + image scale-105
- **Reduced motion:** Instant entrance, no hover transforms

### Data

Currently uses placeholder Unsplash photos in i18n (`team.members[].image`). Replace with:
- Real team member photos in `/public/images/team/`
- Maintain 3:4 aspect ratio (e.g., 300x400px)
- Update i18n translation keys
