# AceAgency Moodboard

> Visual direction and mood references for the AceAgency website redesign.
> Aesthetic: "Precision Elegance" — dark-dominant, component-driven, kinetic typography.

---

## 1. Primary Reference: addifico.com

The primary visual inspiration for AceAgency's website. Key patterns to adapt:

### Layout Patterns
- **Bento grid compositions:** Asymmetric card layouts for service showcases, testimonials, and feature highlights. Not uniform grids — deliberate size variation creates visual hierarchy.
- **Full-width sections with alternating dark/light themes:** Sections flow between dark (#262523) and light (#FFFFFF) backgrounds, creating rhythm and visual separation without hard dividers.
- **Large whitespace:** Generous padding (96px+ vertical) between sections. Content breathes. Premium feel comes from what you leave out, not what you add.
- **Horizontal scrolling accents:** Subtle horizontal scroll sections for logos, partner badges, or secondary content (used sparingly).

### Typography Treatment
- **Oversized headlines:** Hero text at 64-80px on desktop, commanding attention. Bold weight, tight letter-spacing (-0.03em).
- **Overline + Heading + Description pattern:** Every section follows the same typographic hierarchy — small uppercase label, large heading, muted description.
- **Kinetic text:** Headline characters or words animate in on scroll with subtle stagger effects.

### Animation Language
- **Scroll-triggered reveals:** Elements fade up from below as they enter the viewport. Consistent 500ms duration, subtle stagger between siblings.
- **Smooth section transitions:** Dark-to-light and light-to-dark section transitions feel seamless, not jarring.
- **Card hover lifts:** Cards rise 4px on hover with a color-shifting border. Feedback without distraction.
- **No bounce, no overshoot:** Animations are controlled and professional. Ease-out curves, never spring physics.

### Component Design
- **Service cards with icons:** Each service represented by a card with a line-art icon (not filled), heading, short description, and optional CTA link.
- **Stats as visual anchors:** Large numbers (150+, 8%, 24/7) in accent colors act as section focal points.
- **Testimonial mosaic:** Client quotes in varied-size cards, not a carousel. Bento layout lets multiple testimonials be visible simultaneously.

---

## 2. Color Mood

### Dark Sections (Primary)
The site is dark-dominant. Most content sections use the dark scheme:
- Background: Rich near-black (#262523) — warm, not cold
- Text: Clean white with grey (#D9D9D9) for secondary content
- Accents: Grey (#D9D9D9) for overlines, Burgundy (#56151A) for interactive elements
- Cards: Slightly elevated dark (#2D2C2A approximate) with subtle borders

### Light Sections (Contrast)
Select sections (usually About, some CTAs) use light for visual rhythm:
- Background: Pure white or off-white
- Text: Near-black for contrast
- Accents: Burgundy (#56151A) for links, buttons, overlines
- Cards: White with light grey borders and subtle shadows

### Burgundy Accent Sections
Used sparingly (1-2 per page, typically CTA sections):
- Background: Burgundy gradient (#56151A → #3D0F13)
- Text: White
- Accent: Grey for buttons, highlights
- Creates urgency and focus for conversion moments

---

## 3. Icon Language

- **Style:** Line-art, single-color, consistent 1.5px stroke
- **Canvas:** 48px for feature icons, 24px for inline icons
- **Personality:** Geometric, precise, modern — matching the "precision" in "Precision Elegance"
- **Source:** Lucide React as base library, custom SVGs for service-specific icons
- **Never:** Filled/solid icons, emoji-style, skeuomorphic, or 3D icons

---

## 4. Motion Personality

The animation language communicates: **"We're precise, confident, and meticulous."**

### Entrance
Elements enter from below (fade-up), suggesting emergence and building upward. Never from left/right (feels slidey and cheap). Exception: alternating content blocks can use subtle slide-left/right.

### Timing
- Fast (200ms): Micro-interactions, hover states, toggles
- Normal (300ms): Card animations, color transitions
- Smooth (500ms): Section reveals, content entrances
- Slow (800ms): Hero headline animation, page transitions

### Character
- **Confident:** Elements move with purpose, no hesitation
- **Controlled:** No bounce, no overshoot, no wobble
- **Choreographed:** Staggered reveals create reading flow (top-to-bottom, left-to-right)
- **Restrained:** One animation per element. If it fades up, it doesn't also scale.

---

## 5. Interaction Feel

### Cursor
Custom cursor with `mix-blend-mode: difference` creates a unique browsing feel on desktop. The inverted circle following the pointer makes the site feel interactive and alive without being gimmicky. Scales up on interactive elements as feedback.

### Hover States
- Cards lift up (translateY -4px) — physical metaphor of "picking up" a card
- Buttons brighten and slightly scale — energy and responsiveness
- Links get an underline that slides in from left — directional, clean
- Icons rotate slightly (5deg) and scale — playful without being childish

### Scroll Experience
- Content reveals itself as you scroll — rewards exploration
- Parallax on background elements adds depth (subtle, 0.3x factor)
- Stats count up when visible — engagement and proof
- Header hides on scroll down, returns on scroll up — maximizes content space

---

## 6. What This Is NOT

To maintain distinctiveness and avoid generic "AI-generated website" feel:

- **NOT:** Template-looking with generic hero images and "Welcome to our website"
- **NOT:** Using Poppins, Montserrat, or other overused web fonts
- **NOT:** Blue-and-white or purple SaaS aesthetic with rounded everything
- **NOT:** Carousel-heavy (bento grids replace carousels)
- **NOT:** Stock photo dependent (component-driven design)
- **NOT:** Flat and lifeless (purposeful animations add character)
- **NOT:** Overly animated (no parallax overload, no scroll-jacking)
- **NOT:** Generic gradient backgrounds (gradients used only for CTA buttons and subtle glows)

---

## 7. Emotional Response

When a potential client visits aceagency.ro, they should feel:

1. **"These people are serious professionals"** — The dark palette, precise typography, and controlled animations communicate discipline and expertise.
2. **"This design is impressive"** — The bento layouts, kinetic text, and micro-interactions demonstrate design capability that a client would want for their own project.
3. **"I can trust them with my brand"** — The polish, attention to detail, and consistent visual language build confidence.
4. **"I want to work with them"** — The CTAs are clear, the contact paths are obvious, and the overall experience makes reaching out feel like a natural next step.
