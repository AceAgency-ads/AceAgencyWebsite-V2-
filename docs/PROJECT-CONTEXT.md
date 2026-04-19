# Project Context — Laboratorul de Conversii

> Read this first when returning to this repo after a break. It orients you on what this project is, where the branches are, and what the uncommitted world looked like when the 3-branch split was created on **2026-04-19**.

---

## What this project is

**Laboratorul de Conversii** (aceagency.ro) — a Romanian conversion-focused growth lab website. Single unified brand (no divisions). Bucharest-based agency specialized in conversion systems and measurable growth for clients.

- Primary language: **Romanian (ro)**. Secondary: English (en) via `next-intl`.
- Tech: **Next.js 16 (App Router)**, **TailwindCSS 4**, **shadcn/ui**, **TypeScript 5 (strict)**, **Framer Motion + GSAP**, **React Hook Form + Zod**, **Resend** (email), **Playwright** (E2E/QA).
- Hosting: **Vercel**.
- Design: component-driven, icon-based, large typography; style influence from addifico.com. Brand palette: Electric Violet `#650CBE`, Cobalt Blue `#4500D0`, Electric Mint `#66F3A6`.
- Full brand/design rules live in `CLAUDE.md` — read that file for colors, fonts, SEO/GEO rules, and coding conventions.

---

## Open branches and PRs (as of 2026-04-19)

Three parallel PRs were opened against `rebrand/laboratorul-de-conversii` to split ~100 uncommitted files into reviewable chunks. The base branch is still `rebrand/laboratorul-de-conversii` (the current working branch — `main` is the long-term trunk).

| # | Branch | PR | Scope |
|---|--------|----|-------|
| 1 | `feat/growth-funnel` | [#2](https://github.com/AceAgency-ads/AceAgencyWebsite-V2-/pull/2) | New `/growth` funnel + `/growth/multumesc` + 10 growth components + supporting infra tweaks (middleware, layout, globals.css, SectionWrapper) + `@playwright/test` devDep + QA artifacts + growth docs + `.gitignore` hygiene |
| 2 | `feat/case-studies-refresh` | [#3](https://github.com/AceAgency-ads/AceAgencyWebsite-V2-/pull/3) | Rewrites 6 existing case-study MDX files, adds `juni-acs-juniorul.mdx`, refreshes hero + screenshot imagery, adds before/after comparisons for 4 studies, minor `CaseStudyCard.tsx` tweaks |
| 3 | `feat/homepage-real-logos` | [#4](https://github.com/AceAgency-ads/AceAgencyWebsite-V2-/pull/4) | Deletes 5 placeholder certs + 8 placeholder client SVGs, adds 3 real cert badges + 6 real client logos, updates `CertificationBadges.tsx` + `ClientLogoBar.tsx` |
| 4 | `docs/project-context` | *(this PR)* | This document |

**Merge order (recommended):** #4 (docs) → #3 (case studies, content-only) → #4 (homepage logos, asset-only) → #2 (growth, largest + infra impact). None of the three feature branches conflict with each other on file paths.

**Important coupling:** PR #2 ships the new middleware + layout + globals.css + SectionWrapper + package.json changes. Those were initially triaged as "core infra" but turned out to exist *only* to support `/growth` (conditional Header/Footer hide on growth routes, compact padding variant, shine keyframe for CTA hover, Playwright for growth QA). They must ship together or the growth page breaks.

---

## Key routes

See `CLAUDE.md` for the full table. Highlights:

- `/` — Homepage (with certifications + client logo bar, updated in PR #4)
- `/studii-de-caz` + `/studii-de-caz/[slug]` — Case studies index + detail (updated in PR #3)
- `/growth` — ACE Growth Engine funnel landing (10 sections, NEW in PR #2)
- `/growth/checklist` — 12-point lead magnet (already in repo before this session)
- `/growth/multumesc` — Post-conversion thank-you (NEW in PR #2)

Growth routes are **chromeless** — global `Header` and `Footer` are suppressed via `x-pathname` header set in `src/middleware.ts` and read in `src/app/[locale]/layout.tsx`. The funnel provides its own `GrowthFooter`.

---

## File layout conventions

```
src/
  app/[locale]/          # next-intl locale routing; all pages live here
    growth/              # Funnel pages — chromeless via layout check
  components/
    ui/                  # shadcn base primitives
    layout/              # Header, Footer, SmoothScroll, CookieConsent
    sections/            # Page-level sections, grouped by page:
      home/              # Homepage sections
      case-studies/      # Case study sections
      growth/            # Funnel sections (10 components)
      legal/             # Legal pages
    animations/          # ScrollReveal, CountUp, etc.
  lib/                   # Helpers, server actions (including growth.ts), validations
  i18n/                  # next-intl routing config
  styles/                # globals.css + tokens
  messages/              # ro.json, en.json translations
content/
  studii-de-caz/         # Case study MDX source (7 files after PR #3)
public/
  images/
    clients/             # Real client logos (swapped in PR #4)
    certifications/      # Real cert badges (swapped in PR #4)
    studii-de-caz/<slug>/ # Per-case-study image folders (hero, screenshot-*, before/after)
    growth/              # Growth funnel assets (ebook cover, VSL thumb, OG, checklist poster)
docs/                    # Codemaps, phase docs, growth docs, this file
qa-reports/              # Playwright QA screenshots, per-date folders
```

---

## Things worth knowing

### Gotchas / non-obvious details

- **Header/Footer hide on /growth** works via `middleware.ts` → sets `x-pathname` → `layout.tsx` reads it via `headers()` → conditional render. If middleware config ever narrows, the whole chrome leaks back.
- **`SectionWrapper` has 3 padding modes**: `hero`, `compact`, default. `compact` was added for growth; use it when sections need tighter vertical rhythm.
- **URL slugs are ASCII only** — transliterate `ă→a`, `â→a`, `î→i`, `ș→s`, `ț→t`. Content is Romanian but slugs are not.
- **Images**: WebP only, always specify `width`/`height`, lazy-load except heroes. Use `next/image`, never raw `<img>`.
- **MDX case studies**: live in `content/studii-de-caz/*.mdx` — adding one means also dropping images into `public/images/studii-de-caz/<slug>/` and the site picks it up automatically.
- **GDPR**: cookie consent banner gates all analytics. No trackers before consent. Privacy/cookie/terms pages are required (`/politica-confidentialitate`, `/politica-cookies`, `/termeni-si-conditii`).

### Scratch files that should never be committed

All gitignored in PR #2. If you see them reappear after a hard reset:

- `.playwright-mcp/` — console logs + screenshots from playwright-mcp MCP server
- `test-results/`, `playwright-report/` — Playwright default output
- Root-level `cert-*.png`, `certifications*.png`, `client-logos*.png`, `logos-*.png` — manual screenshot scratch
- `public/images/poze screenshot website-uri/` and `public/images/logo clients/` — raw drop folders (note the spaces in names — these are the *source* screenshots/logos before processing into `public/images/clients/` or `public/images/studii-de-caz/`)

### Commands

```bash
npm run dev          # dev server
npm run build        # production build — always run before pushing
npm run lint         # ESLint
npm run test         # unit tests
npx playwright test  # E2E (after PR #2 merges — that's when @playwright/test lands)
```

---

## Related documentation

- `CLAUDE.md` — stack, routes, brand, SEO/GEO rules, coding rules (source of truth)
- `docs/CODEMAPS-INDEX.md` — index of all design-system and page codemaps
- `docs/GROWTH-FUNNEL-CODEMAP.md` — deep reference for the `/growth` funnel (ships in PR #2)
- `docs/DOCUMENTATION-INDEX.md` — master docs index
- `.brief/brand.md` — full brand guide
