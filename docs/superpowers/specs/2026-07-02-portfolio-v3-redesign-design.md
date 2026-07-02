# Portfolio v3 Redesign — Design Spec

**Date:** 2026-07-02
**Status:** Approved by Jess (brainstorm session with visual mockups; reference mockup: `.superpowers/brainstorm/5980-1782980427/content/v3-final-motion.html`)

## Overview

Full visual rebuild of the portfolio (jsmrk.github.io/jb-portfolio) from the current dark/green v2 into a **minimal editorial** design — light-first, typography-driven, with a dark-mode toggle and a refined motion system. Content (projects, contact details) carries over; About copy is rewritten. All v2 component code is replaced; only data and screenshots survive.

## Design decisions (locked)

| Decision | Choice |
|---|---|
| Direction | Minimal Editorial — light, whitespace-heavy, typography-first |
| Typography | Playfair Display (headings, 400/500/600 + italic) + Inter (everything else, 400/500/600) |
| Color mode | Light default, dark variant, toggle in nav; persisted, falls back to OS preference |
| Accent | Green continuity: `#4E6B59` on light, `#8FBC9B` on dark |
| Structure | 4 sections: Hero → About (skills woven in) → Work → Contact, plus nav + footer |
| Projects | All 9 carried over; gallery grid |
| Portrait photo | **None** — About is pure typography (explicit user preference) |
| Motion | "Very nice" but tasteful — staggered hero entrance, scroll reveals, hover choreography (see Motion) |

### Color tokens

Semantic tokens as CSS variables consumed by Tailwind (single source of truth; no hardcoded hex in components):

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#FAF9F6` | `#161613` | page background |
| `ink` | `#1A1A18` | `#ECEAE4` | primary text |
| `muted` | `#6B6B64` | `#9B9A92` | secondary text, meta |
| `line` | `#E3E1DA` | `#2B2B27` | borders, dividers |
| `accent` | `#4E6B59` | `#8FBC9B` | links, highlights, arrows |
| `card` | `#F1F0EA` | `#1E1E1A` | image frames, surfaces |

## Page design

**Nav** — top bar: italic Playfair wordmark "Jess Mark Baguio" left; right: Work / About / Contact anchor links, "Resume ↗" external link (URL carried from v2 navbar), theme toggle button. Scrolled state gets a subtle `bg`/`line` treatment. Mobile: hamburger opens a panel that **closes on link click** (fixes v2 bug).

**Hero** — kicker "Front-End Developer — Tagum, Philippines" (small caps); `<h1>` in Playfair ~clamp(2.5rem, 7vw, 4.5rem): "Building calm, considered *interfaces* for the web." with *interfaces* italic in accent; subline paragraph; row: "See selected work ↓" (anchor) + "Open to Web Developer roles" (muted text).

**About** — editorial two-column: small-caps label "About" left (stacks on mobile), content right:

> For the past two years I've been building production web apps at Born Digital, a remote-first team — working mainly in React and Next.js. *(lead, Playfair, larger)*
>
> Along the way I spent a year teaching computer science at the University of Mindanao — explaining code to students taught me to write it more clearly. I care about interfaces that feel effortless: fast, legible, and honest about what they do. Outside client work I build my own things — web apps, mobile apps in Flutter, and the occasional experiment that never leaves localhost. *(body, Inter, muted)*

Toolbox as inline dot-separated text list (no icons, no pills): React · Next.js · TypeScript · Tailwind CSS · Angular · Flutter & Dart · Firebase · Supabase. (Skios employment intentionally omitted.)

**Work** — header row: "Selected *work*" (Playfair h2) + "09 projects — 2022–2026" kicker. Grid: 2 columns desktop, 1 column mobile; first 8 projects as cards (screenshot in 16/10 clipped frame, Playfair name, small-caps tech meta); Cashierio as a full-width 32/10 closing row. Card links: demo URL if present, else GitHub URL, else non-clickable (no ↗ arrow shown). Existing screenshots from `src/assets/projects/` reused.

**Contact** — label "Contact"; Playfair h2 "Let's build *something.*"; short pitch line; email as large Playfair `mailto:` link; phone as `tel:` link; social row (GitHub, LinkedIn, Facebook, Upwork) as text links with ↗. All contact values and URLs carried over from v2 `contactMe.tsx`.

**Footer** — semantic `<footer>`: "© {currentYear} Jess Mark Baguio" + "Tagum, Davao Region, PH — Built with React & Tailwind". Year computed, never hardcoded.

## Motion design

Entrance/scroll animations via framer-motion shared variants in `src/lib/motion.ts`; hover effects in pure CSS. All gated on `prefers-reduced-motion` (framer's `useReducedMotion` + CSS media query) — reduced-motion users get content instantly.

1. **Hero entrance (on load):** headline lines rise from behind an overflow mask, staggered; kicker fades first, then headline lines, paragraph, CTA row (~1s total, `staggerChildren`).
2. **Scroll reveals:** each section's children fade-up 24px with ~0.1s stagger, triggered `whileInView`, `once: true`, ease `cubic-bezier(.2,.6,.2,1)`.
3. **Project cards:** stagger into view; on hover screenshot scales 1.045 over 0.7s inside clipped frame; ↗ arrow translates (3px, −3px).
4. **Links:** accent underline grows left-to-right on hover (`background-size` transition, 0.35s).
5. **Theme toggle:** background/text colors transition 300ms.

## Architecture

**Approach:** rebuild `src/` in place. Same repo, same stack (Vite 5 + React 18 + TypeScript + Tailwind 3), same GitHub Pages deployment (`base: "/jb-portfolio/"`, hand-committed `dist/`). No router, no state library, no backend.

```
src/
  main.tsx, App.tsx, index.css
  components/
    Nav.tsx, Hero.tsx, About.tsx, Work.tsx, ProjectCard.tsx,
    Contact.tsx, Footer.tsx, Section.tsx        // shared label+spacing wrapper
  data/
    projects.ts      // typed Project[], cleaned copy
    site.ts          // contact info, socials, resume URL, toolbox list, nav items
  hooks/
    useTheme.ts          // dark-mode state: localStorage ⭢ prefers-color-scheme
    useActiveSection.ts  // IntersectionObserver-based nav highlight
  lib/
    cn.ts            // clsx-style class combiner
    motion.ts        // shared framer-motion variants
  types.ts           // Project, SectionId, etc.
```

**Key implementation rules:**

- **Theme:** Tailwind `darkMode: 'class'`; tokens as CSS variables in `index.css` mapped through `theme.extend.colors`; `useTheme` toggles `dark` class on `<html>`; inline pre-hydration script in `index.html` prevents wrong-theme flash.
- **Tailwind config rebuilt:** standard breakpoints restored (v2's custom `screens` with the `lr` typo is dropped); fonts `font-serif` → Playfair, `font-sans` → Inter; no `useMediaQuery` hook — responsive styling via Tailwind prefixes only.
- **Fonts:** Google Fonts `<link>` in `index.html` (preconnect + `display=swap`), only the weights listed above — replaces v2's 18-variant CSS `@import`.
- **Scrolling:** native `scroll-behavior: smooth` + `scroll-margin-top` on sections; `react-anchor-link-smooth-scroll` removed. Nav highlight from `useActiveSection`, replacing v2's prop-drilled `setSelectedPage`.
- **Data:** explicit `Project` type (`{ name, tagline, description, image, technologies, year, ghLink?, demoLink? }`); v2 typos fixed ("Managment", "quicly", trailing-space names, "vbnet" labeled "VB.NET").
- **Dependencies removed:** `@ionic/react`, `ionicons`, `react-ionicons`, `@heroicons/react`, `react-anchor-link-smooth-scroll`. Kept: `react`, `react-dom`, `framer-motion`, `react-icons` (social + hamburger icons only).

## Accessibility & quality requirements

- Exactly one `<h1>` (hero headline — real text, not an image); semantic `<nav>`, `<main>`, `<section>`, `<footer>` landmarks.
- All external links: `rel="noopener noreferrer"`; icon-only controls get `aria-label`; meaningful `alt` on screenshots (`alt={project.name}` style), `alt=""` only for decorative images.
- No duplicate DOM ids; text contrast meets WCAG AA in both themes; keyboard-focusable interactive elements with visible focus states.
- Old assets that no longer fit (hero-text.png, sign.png, wave PNGs, about-image.png) are removed from the build.

## Out of scope

- `v1/` directory (archived old site) — untouched.
- Deployment workflow changes (CI/CD, gh-pages branch) — the hand-committed `dist/` flow stays as-is.
- Contact form backend, blog, CMS, multi-page routing, project detail pages.
- Restyling or updating the `dist/` folder before the new build ships.

## Verification checklist

- [ ] `pnpm lint`, `tsc`, and `pnpm build` all pass clean
- [ ] Visual pass at 375px / 768px / 1280px / 1920px in light **and** dark mode
- [ ] Theme toggle persists across reload; no wrong-theme flash on load
- [ ] All 9 projects render; card links open correct demo/GitHub URLs in new tabs; link-less projects show no arrow
- [ ] Mobile menu opens, navigates, and closes on link click
- [ ] Animations play once per section; page is fully readable with `prefers-reduced-motion: reduce`
- [ ] Lighthouse accessibility ≥ 95; no console errors
- [ ] `vite preview` sanity check under the `/jb-portfolio/` base path
