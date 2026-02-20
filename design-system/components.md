# AceAgency Component Patterns

> Detailed component specifications for implementation with `/frontend-design`.
> All components reference tokens from `MASTER.md` and `tokens.css`.

---

## 1. Button

### Variants

**Primary (CTA)**
- Background: `--ds-gradient-brand-primary`
- Text: White, Inter SemiBold, body size
- Padding: `12px 32px` (md), `8px 24px` (sm), `16px 40px` (lg)
- Border-radius: `--ds-radius-default`
- Hover: `brightness(1.1)`, `scale(1.02)`, `box-shadow: --ds-shadow-burgundy`
- Active: `scale(0.98)`
- Transition: `--ds-duration-fast` `--ds-ease-out`

**Secondary (Outline)**
- Background: transparent
- Text: Burgundy (dark theme: White)
- Border: 1px Burgundy (dark theme: White)
- Hover: Fill Burgundy, text White
- Active: `scale(0.98)`

**Ghost**
- Background: transparent
- Text: contextual (White on dark, Black on light)
- Hover: `bg-white/10` (dark) or `bg-black/5` (light)

**Accent**
- Background: Grey #D9D9D9
- Text: Black
- Hover: `brightness(0.95)`

### Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| `sm` | 36px | 8px 24px | 14px | 16px |
| `md` | 44px | 12px 32px | 16px | 20px |
| `lg` | 52px | 16px 40px | 16px | 20px |

### States

- **Disabled:** opacity 0.5, cursor not-allowed, no hover effects
- **Loading:** spinner icon replacing text/icon, same dimensions
- **Focus:** 2px ring Burgundy with 2px offset

### Icon Support

- Icon-only: square button (same width as height), centered icon
- Icon + text: icon before text with 8px gap
- Text + icon: icon after text with 8px gap (arrow-right pattern for CTAs)

---

## 2. Card

### Default Card

```
┌─────────────────────────────────┐
│  [Optional Icon/Badge]          │
│                                 │
│  Heading (h3/h4)               │
│  Description text (body-sm,     │
│  muted, 2-3 lines max)         │
│                                 │
│  [Optional CTA link →]         │
└─────────────────────────────────┘
```

- Background: `--ds-color-dark-elevated` (dark) / White (light)
- Border: 1px `--ds-color-dark-border` (dark) / 1px Grey (light)
- Border-radius: `--ds-radius-lg`
- Padding: `--ds-space-6`
- Hover: `translateY(-4px)`, border-color transitions to `--ds-color-burgundy-light`
- Transition: `--ds-duration-normal` `--ds-ease-smooth`

### Glass Card

- Background: `white/5`, `backdrop-blur-md`
- Border: 1px `white/10`
- Same hover as default but border transitions to `white/20`
- Used in hero sections, overlaid on gradient backgrounds

### Feature Card (Service Cards)

- Background: `--ds-color-dark-elevated`
- No border by default
- Shadow: `--ds-shadow-burgundy` on hover
- Hover: `scale(1.02)`, glow intensifies
- Icon at top: 48px, Burgundy
- Used for service previews on homepage

### Stat Card

```
┌─────────────────────┐
│  150+               │  ← display-lg, bold, Burgundy
│  Proiecte Livrate   │  ← body-sm, muted
└─────────────────────┘
```

- Background: transparent or dark-elevated
- Border: 1px dark-border (optional)
- Number: `display-lg` size, Glacial Indifference Bold, Burgundy or White
- Label: `body-sm`, muted text
- Animation: CountUp on scroll trigger (GSAP)

### Testimonial Card

```
┌─────────────────────────────────┐
│  "Quote text here, kept to      │
│   2-4 lines for visual balance" │
│                                 │
│  ── Author Name                │
│     Company / Role              │
│     ★★★★★                      │
└─────────────────────────────────┘
```

- Background: `--ds-color-dark-elevated`
- Border: 1px `--ds-color-dark-border`
- Border-radius: `--ds-radius-lg`
- Padding: `--ds-space-6` to `--ds-space-8`
- Quote: `body-lg`, White
- Author: `body-sm`, Inter SemiBold
- Role: `caption`, muted
- Stars: Burgundy
- Layout: Bento grid (varies sizes, not uniform)

---

## 3. Section

### SectionWrapper

Every page section uses this wrapper:

```tsx
<section data-theme="dark|light" className="section-wrapper">
  <Container>
    <SectionHeader overline="" title="" description="" />
    {children}
  </Container>
</section>
```

- Padding: `py-16 md:py-20 lg:py-24` (standard), `py-20 md:py-32` (hero)
- Background: set via `data-theme`
- All children wrapped in `<Container>`

### SectionHeader

```
SERVICII NOASTRE           ← overline (uppercase, letter-spacing 0.12em, accent color)
Solutii Complete           ← heading (h2, bold)
pentru Afacerea Ta

Descriere text care        ← description (body-lg, muted, max-width 65ch)
explica sectiunea.
```

- Overline: `caption` size, uppercase, `letter-spacing: 0.12em`, Grey (dark) or Burgundy (light)
- Heading: `h2` size, `font-heading`, below overline with `space-2` gap
- Description: `body-lg`, muted text, `max-width: 65ch`, below heading with `space-4` gap
- Alignment: left (default), center (optional prop)
- Animation: overline fades in, heading reveals (word-level stagger), description fades up

---

## 4. Header

### Layout

```
┌──────────────────────────────────────────────┐
│  [Logo]                    [☰] [CTA Button]  │
└──────────────────────────────────────────────┘
```

- Position: `fixed top-0`, full width
- Height: 72px (desktop), 64px (mobile)
- Background: transparent initially, `--ds-color-black/80 backdrop-blur-md` after scroll
- Z-index: `--ds-z-header`
- Padding: horizontal matches Container padding per breakpoint

### Logo

- Left-aligned
- SVG format, height 32px
- Light version (for dark header backgrounds)

### Desktop Navigation (hidden on mobile <1024px)

- Horizontal links, `body-sm` Inter Medium
- Gap: `--ds-space-6`
- Hover: Burgundy color transition + dot indicator below
- Active page: Burgundy text + dot indicator visible

### Mobile Hamburger

- Right-aligned, before CTA
- Size: 48x48px tap target
- Three horizontal lines, animated to X on open
- Triggers MenuOverlay

### CTA Button

- `primary` button variant, `sm` size
- Text: "Contacteaza-ne" / "Contact Us"
- Right-most element

### Scroll Behavior

- **Show threshold:** User scrolls up by 10px+
- **Hide threshold:** User scrolls down past 60px from current position
- **Initial:** Visible (transparent background)
- **After scroll past 100px:** Background becomes translucent with backdrop-blur
- **Animation:** `translateY(-100%)` to hide, `translateY(0)` to show, `--ds-duration-normal`

### MenuOverlay (Fullscreen Mobile Menu)

```
┌──────────────────────────────────────────────┐
│  [Logo]                              [X]     │
│                                              │
│              Acasa                            │
│              Despre Noi                       │
│              Servicii                         │
│              Contact                          │
│                                              │
│          [RO | EN]                           │
│                                              │
│  ── Social Links ──                          │
│  LinkedIn  Instagram  Facebook               │
└──────────────────────────────────────────────┘
```

- Background: `--ds-color-black` solid
- Position: fixed, full viewport
- Z-index: `--ds-z-overlay`
- Nav links: `display-lg` size, Glacial Indifference Bold, centered
- Entrance: links stagger slide-in from right (80ms delay each)
- Exit: fade-out 200ms
- Body scroll locked while open
- SplitText animation on nav link hover (if licensed)

---

## 5. Footer

### Layout (addifico-style, content-rich)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [Logo]                                                  │
│  Agentie digitala full-service din Bucuresti             │
│                                                          │
│  ┌──────────┬──────────┬──────────┬───────────────────┐  │
│  │ Divizii  │ Pagini   │ Contact  │ Newsletter        │  │
│  │          │          │          │                   │  │
│  │ AceWeb   │ Acasa    │ Adresa   │ Primeste          │  │
│  │ AceAds   │ Despre   │ Telefon  │ noutati           │  │
│  │ AceAI    │ Servicii │ Email    │ saptamanale.      │  │
│  │ AceMedia │ Contact  │ Program  │                   │  │
│  │          │          │          │ [Email] [→]       │  │
│  └──────────┴──────────┴──────────┴───────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │  Social: [Li] [Ig] [Fb] [Tw]   © 2026 AceAgency    ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- Background: `--ds-color-black` (always dark)
- Padding: `py-16 lg:py-24`
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Links: `body-sm`, Grey, hover Burgundy
- Social icons: 24px, Grey, hover White with scale(1.1)
- Newsletter: inline form (email input + submit button)
- Bottom bar: border-top 1px dark-border, `py-6`, flex between social and copyright
- Copyright: `caption`, Grey

---

## 6. TextReveal

Animation wrapper for text that reveals on scroll.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | string | `"div"` | HTML element to render |
| `variant` | `"word" \| "char" \| "line"` | `"word"` | Split method |
| `staggerDelay` | number | 50 | Delay between items (ms) |
| `duration` | number | 500 | Total animation duration (ms) |
| `yOffset` | number | 30 | Vertical offset for entrance |
| `trigger` | `"scroll" \| "load"` | `"scroll"` | When to trigger |

### Behavior

- **Word variant:** Splits text at spaces, each word fades up with stagger
- **Char variant:** Splits at characters (SplitText or manual split), each char fades up
- **Line variant:** Splits at line breaks, each line fades up
- **Scroll trigger:** Fires when element enters viewport at 85%
- **Load trigger:** Fires immediately on mount (hero headlines)
- **Reduced motion:** Single fade-in, no split animation

---

## 7. ScrollReveal

Already implemented in Phase 1. Configuration per MASTER.md:

- Default: `yOffset=60`, `duration=0.5s`, `start="top 85%"`
- Stagger children: `stagger=0.05s`
- Wraps any content for scroll-triggered entrance

---

## 8. CustomCursor

### Behavior

- **Desktop only:** Hidden on touch devices (use media query `pointer: fine`)
- **Default state:** 12px circle, White, `mix-blend-mode: difference`
- **Link/button hover:** Scale to 48px, opacity 0.5
- **Text hover:** Scale to 24px, vertical bar shape
- **Position:** Follows pointer with slight lerp (0.15 factor for smoothness)
- **Z-index:** `--ds-z-cursor`
- **Reduced motion:** Hidden entirely

### Implementation

- Single `<div>` positioned fixed
- GSAP or RAF for smooth position tracking
- CSS `mix-blend-mode: difference` creates the inversion effect
- Hide default cursor on body: `cursor: none` (desktop only)

---

## 9. LocaleSwitcher

### Layout

```
[RO | EN]
```

- Two buttons side by side
- Active locale: Burgundy text (or White on dark), SemiBold
- Inactive locale: muted text, Regular
- Separator: `|` character in muted color
- Size: `body-sm`
- In Header: right-aligned before CTA
- In MenuOverlay: centered below nav links

---

## 10. BentoGrid

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pattern` | `"a" \| "b" \| "c"` | `"b"` | Grid pattern (see MASTER.md) |
| `children` | ReactNode[] | — | Grid items |
| `gap` | number | 24 | Gap in pixels |

### Responsive

- **Desktop (1024px+):** Multi-column layout per pattern
- **Tablet (768px-1023px):** 2-column simplified grid
- **Mobile (<768px):** Single column stack
- **Animation:** Each cell fades up with stagger on scroll

---

## 11. CountUp

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `end` | number | — | Target number |
| `prefix` | string | `""` | Before number (e.g., "$") |
| `suffix` | string | `""` | After number (e.g., "+", "%") |
| `duration` | number | 2000 | Animation duration (ms) |
| `trigger` | `"scroll"` | `"scroll"` | When to animate |

### Behavior

- Animates from 0 to `end` when scrolled into view
- Uses GSAP or requestAnimationFrame
- Easing: `--ds-ease-smooth`
- Fires once (no reverse)
- Reduced motion: shows final number immediately

---

## 12. Accordion (FAQ)

### Layout

```
┌──────────────────────────────────────────────┐
│  Question text here?                    [+]  │
├──────────────────────────────────────────────┤
│  Answer text here, can be multiple lines     │
│  with rich formatting support.               │
└──────────────────────────────────────────────┘
```

- Based on shadcn/ui Accordion (Radix primitives)
- Trigger: full-width clickable area, 48px min height
- Question: `body-lg`, Inter SemiBold
- Icon: Plus/Minus rotation on toggle
- Answer: `body`, muted text, `max-width: 65ch`
- Border: bottom border on each item
- Animation: height transition `--ds-duration-normal`
- Keyboard: Enter/Space to toggle, arrow keys to navigate

---

## 13. NewsletterForm

### Layout

```
┌────────────────────────────────────────┐
│  [Email address          ]  [Trimite]  │
└────────────────────────────────────────┘
```

- Inline form: email input + submit button on same row
- Input: `--ds-radius-default` left, no right border-radius
- Button: `accent` variant, `--ds-radius-default` right, no left border-radius
- Validation: email format (Zod)
- Success state: input replaced with "Multumim!" message
- Error state: red border on input, error message below
- Width: max 480px

---

## 14. SocialLinks

### Layout

Horizontal row of social media icon buttons.

| Platform | Icon | URL |
|----------|------|-----|
| LinkedIn | Lucide `Linkedin` | TBD |
| Instagram | Lucide `Instagram` | TBD |
| Facebook | Lucide `Facebook` | TBD |

- Size: 24px icons in 40px touch targets
- Color: Grey default, White on hover (footer), Burgundy on hover (light sections)
- Gap: `--ds-space-4`
- Hover: `scale(1.1)` + color transition
- `target="_blank"` + `rel="noopener noreferrer"` on all links
