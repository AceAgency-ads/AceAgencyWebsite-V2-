# Phase 3: Flagship Pages - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build Homepage and About page to addifico.com visual quality with full animations. Kinetic typography, scroll-triggered reveals, parallax depth, dark/light section transitions, bento grids, and hover micro-interactions. Each page uses `/frontend-design` against `design-system/pages/{slug}.md`. No new pages or capabilities beyond what's in the roadmap.

</domain>

<decisions>
## Implementation Decisions

### Abstract visuals

- **Homepage "About Preview" right column:** Stylized Ace symbol — use the actual AceAgency logo (`public/ace-agency-logo.webp`) as the basis. Claude has discretion on whether to use the logo directly (animated) or create a logo-inspired abstract motif.
- **About page "Story" right column:** Combination of abstract geometry (floating brand-colored shapes) and timeline milestones. Claude has discretion on the balance — timeline primary with geometric accents or geometry primary with subtle timeline labels.
- **Logo replacement:** Use the actual AceAgency logo file (`public/ace-agency-logo.webp`) everywhere across the site, replacing any placeholder logo references.

### Section transitions

- Hard cuts between all sections — clean, sharp boundaries, no gradient bleeds or diagonal clips
- Sections flow edge-to-edge with no gaps or separator lines between them
- Burgundy CTA sections: Claude's discretion on whether to add a subtle glow bleed into adjacent dark sections or keep the same hard cut treatment

### Animation intensity

- **Overall feel:** Professional base with bold hero moments — hero sections are cinematic, inner sections are subtler and quicker
- **Hero kinetic typography:** Word-level stagger (each word animates as a block), not character-level
- **Scroll animations:** Fire once only — play on first scroll into view and stay revealed, no replay on re-enter
- **Reduced motion (prefers-reduced-motion):** Claude's discretion on accessible approach

### Claude's Discretion

- Reduced motion implementation (instant show vs simple fades)
- Burgundy CTA section edge treatment (hard cut vs subtle glow bleed)
- About page Story visual balance (timeline vs geometry emphasis)
- Homepage Ace symbol treatment (direct logo animation vs logo-inspired motif)
- Exact animation easing curves and micro-timing

</decisions>

<specifics>
## Specific Ideas

- User wants the actual AceAgency logo (attached as `public/ace-agency-logo.webp`) used throughout the site — not a placeholder or generic spade
- Homepage Ace symbol should feel branded and recognizable
- About page combines abstract geometry with timeline for a narrative feel
- Animation feel reference: "somewhere in between" Linear/Stripe (subtle) and Apple/Awwwards (cinematic) — professional but with hero moments that impress

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-flagship-pages*
*Context gathered: 2026-02-20*
