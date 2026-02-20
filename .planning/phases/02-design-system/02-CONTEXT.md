# Phase 2: Design System - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Run the `/design` skill (6-phase orchestrator) to generate the complete visual language, then build shared layout components (Header, Footer, animation wrappers, custom cursor) from the generated specs — so every page phase assembles sections without designing from scratch.

**Design reference:** addifico.com — smooth, refined, premium agency aesthetic. AceAgency brand colors/fonts applied to addifico's design sensibility.

</domain>

<decisions>
## Implementation Decisions

### Header Navigation
- Minimal header: logo left, hamburger menu + CTA right — even on desktop (addifico style)
- Full navigation lives in a fullscreen overlay panel, not inline nav links
- Menu overlay uses staggered character-level text reveal animation on nav links (SplitType + GSAP stagger)
- CTA button text: "Contactează-ne" (RO) / "Contact us" (EN)
- Header hides smoothly on scroll down, reappears on scroll up
- Locale switcher (RO/EN) accessible within the menu overlay

### Footer Structure
- Full content in addifico-style layout: logo, tagline, office address, phone, email, social links (LinkedIn, Instagram, Facebook), quick nav links, newsletter signup form
- Division badges displayed as horizontal pill/badge row under the logo (AceWeb, AceAds, AceAI, AceMedia)
- Newsletter signup form included in footer across all pages
- Footer elements use staggered scroll-triggered reveal animation when scrolling into view
- Copyright and legal links at bottom

### Custom Cursor
- Subtle, refined custom cursor — noticed subconsciously, never distracting
- Neutral color (white/semi-transparent) — not brand-colored, to work across dark and light sections
- Desktop only — completely disabled on touch devices
- Hidden when mouse leaves the viewport

### Claude's Discretion
- Custom cursor type (morphing circle, blend-mode, or magnetic dot — pick what matches the refined addifico feel)
- Cursor hover behavior on interactive elements (grow, show text label, or simple state change)
- Header scroll treatment (transparent-to-solid, glass morphism, or always solid — pick what looks best)
- Section transition style (hard cut vs gradient blend between dark/light sections)

### Animation Personality
- Match addifico's smooth, refined, restrained feel — 0.3-0.5s transitions, subtle staggers
- Scroll-triggered reveals: fade up direction (elements move up from below, like addifico's 100px shift)
- Headings use character-level split text animations (SplitType/GSAP stagger) — premium typographic reveals
- Overall principle: let content speak, not effects. Animations enhance, don't distract.
- All animations respect `prefers-reduced-motion` — disable or simplify for accessibility

</decisions>

<specifics>
## Specific Ideas

- "Adapt our brand but using the design of addifico.com" — AceAgency colors (Electric Violet, Cobalt Blue, Electric Mint) and fonts (Glacial Indifference, Red Hat Display) applied with addifico's smooth, minimal design language
- Addifico reference specifics: 0.3s fades with power1.inOut easing, SplitType character stagger at ~0.025s per character, scroll-triggered elements shifting 100px from below
- Menu overlay should feel like addifico's slide-out navigation — staggered letter animations on nav links with characters shifting down 130% on hover
- Footer should capture the same wide, structured feel as addifico's — social + sitemap + contact + brand story, but with AceAgency's full content (address, phone, newsletter, divisions)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-design-system*
*Context gathered: 2026-02-20*
