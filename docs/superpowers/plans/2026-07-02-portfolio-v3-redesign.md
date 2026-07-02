# Portfolio v3 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `src/` of the portfolio into the approved minimal-editorial design (spec: `docs/superpowers/specs/2026-07-02-portfolio-v3-redesign-design.md`) — light/dark themed, Playfair + Inter, 4 sections, motion system.

**Architecture:** Full in-place rewrite of all React components on the existing Vite + React 18 + TypeScript + Tailwind 3 stack. Semantic color tokens as CSS variables consumed by Tailwind; content isolated in `src/data/`; shared motion variants in `src/lib/motion.ts`; theme + nav-highlight logic in hooks. Old v2 components, data, and unused deps are deleted.

**Tech Stack:** Vite 5, React 18, TypeScript 5 (strict), Tailwind CSS 3.4, framer-motion 11, react-icons 5, vitest (new, dev-only), pnpm.

## Global Constraints

- Package manager is **pnpm** (repo has `pnpm-lock.yaml`). Never touch `package-lock.json` (its deletion is an uncommitted user change — leave it as-is).
- `vite.config.ts` keeps `base: "/jb-portfolio/"` and the `@` → `src` alias. Dev server URL is `http://localhost:5173/jb-portfolio/`.
- Final dependency set: `react`, `react-dom`, `framer-motion`, `react-icons` (+ dev: existing template deps + `vitest`). The deps `@heroicons/react`, `@ionic/react`, `ionicons`, `react-ionicons`, `react-anchor-link-smooth-scroll`, `@types/react-anchor-link-smooth-scroll` must be removed.
- Color tokens (exact values, defined once in `src/index.css`, consumed only via Tailwind classes `bg-bg`, `text-ink`, `text-muted`, `border-line`, `text-accent`, `bg-card` — never hardcode hex in components):
  | token | light | dark |
  |---|---|---|
  | `--bg` | `#faf9f6` | `#161613` |
  | `--ink` | `#1a1a18` | `#eceae4` |
  | `--muted` | `#6b6b64` | `#9b9a92` |
  | `--line` | `#e3e1da` | `#2b2b27` |
  | `--accent` | `#4e6b59` | `#8fbc9b` |
  | `--card` | `#f1f0ea` | `#1e1e1a` |
- Fonts: Google Fonts `<link>` only — Playfair Display (400/500/600 + italic 400/500) as `font-serif`, Inter (400/500/600) as `font-sans`. No CSS `@import` of fonts.
- Copy is **verbatim from the spec** — do not rephrase the hero headline, About paragraphs, or contact copy.
- Accessibility invariants: exactly one `<h1>` (hero); semantic `<header>/<nav>/<main>/<section>/<footer>`; every external link has `target="_blank" rel="noopener noreferrer"`; icon-only buttons have `aria-label`; screenshots get `alt={project.name}`; no duplicate DOM ids.
- Every util/hook/component gets a one-line comment above it describing what it does (user's global preference).
- No `any`. Conditional classes via the `cn` helper — never manual string concatenation.
- **Spec deviation (approved rationale):** the spec's `Project` type listed a `year` field, but v2 data has no year information and inventing years risks publishing wrong facts. `year` is omitted from the type; the Work header's "09 Projects — 2022–2026" is static copy. Flag project years to Jess in the final report if he wants them added later.
- Commits: conventional format, no `Co-Authored-By` lines.

---

### Task 1: Foundation reset — deps, config, tokens, minimal shell

**Files:**
- Modify: `package.json` (deps via pnpm, add `test` script)
- Modify: `tailwind.config.js` (full rewrite)
- Modify: `vite.config.ts` (full rewrite)
- Modify: `index.html` (full rewrite)
- Modify: `src/index.css` (full rewrite)
- Modify: `src/main.tsx` (full rewrite)
- Modify: `src/App.tsx` (full rewrite, placeholder)
- Delete: `src/aboutMe/`, `src/contactMe/`, `src/footer/`, `src/home/`, `src/myProjects/`, `src/mySkills/`, `src/navBar/`, `src/shared/`, `src/hooks/`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: Tailwind classes `bg-bg text-ink text-muted border-line text-accent bg-card`, `font-serif`, `font-sans`; CSS classes `.kicker` and `.link-grow`; the `dark` class contract on `<html>` with localStorage key `"theme"` (values `"light" | "dark"`); `pnpm test` runs vitest.

- [ ] **Step 1: Update dependencies**

```bash
pnpm remove @heroicons/react @ionic/react ionicons react-anchor-link-smooth-scroll react-ionicons @types/react-anchor-link-smooth-scroll
pnpm add -D vitest
```

Expected: both commands succeed; `package.json` dependencies now list only `framer-motion`, `react`, `react-dom`, `react-icons`.

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Delete all v2 component code**

```bash
git rm -r src/aboutMe src/contactMe src/footer src/home src/myProjects src/mySkills src/navBar src/shared src/hooks
```

(Keep `src/assets/` — screenshots are reused. Old decorative assets are removed in Task 8.)

- [ ] **Step 4: Rewrite `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        card: "var(--card)",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

(Standard Tailwind breakpoints are restored by *not* defining `screens` — the v2 custom set, including the `lr` typo, is gone.)

- [ ] **Step 5: Rewrite `vite.config.ts`**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/jb-portfolio/",
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 6: Rewrite `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Jess Mark Baguio — front-end developer building calm, considered interfaces with React, Next.js and TypeScript."
    />
    <title>Jess Mark Baguio — Front-End Developer</title>
    <script>
      // Applies the saved (or OS-preferred) theme before first paint to avoid a flash.
      (function () {
        var stored = localStorage.getItem("theme");
        var dark = stored
          ? stored === "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (dark) document.documentElement.classList.add("dark");
      })();
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Rewrite `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #faf9f6;
    --ink: #1a1a18;
    --muted: #6b6b64;
    --line: #e3e1da;
    --accent: #4e6b59;
    --card: #f1f0ea;
  }

  .dark {
    --bg: #161613;
    --ink: #eceae4;
    --muted: #9b9a92;
    --line: #2b2b27;
    --accent: #8fbc9b;
    --card: #1e1e1a;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg font-sans text-ink antialiased transition-colors duration-300;
  }

  section[id] {
    scroll-margin-top: 4.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
}

@layer components {
  /* Small-caps editorial label used for section markers and meta lines. */
  .kicker {
    @apply text-[11px] uppercase tracking-[0.25em] text-muted;
  }

  /* Accent underline that grows from the left on hover/focus. */
  .link-grow {
    background: linear-gradient(currentColor, currentColor) no-repeat left bottom /
      0% 1px;
    padding-bottom: 2px;
    transition: background-size 0.35s ease;
  }

  .link-grow:hover,
  .link-grow:focus-visible {
    background-size: 100% 1px;
  }
}
```

- [ ] **Step 8: Rewrite `src/main.tsx`**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 9: Rewrite `src/App.tsx` as a placeholder shell**

```tsx
// Root component; sections are added as they are built.
function App() {
  return <main />;
}

export default App;
```

- [ ] **Step 10: Verify the build**

```bash
pnpm lint && pnpm build
```

Expected: both pass with no errors. Then `pnpm dev` → open `http://localhost:5173/jb-portfolio/` → blank warm-cream page (`#faf9f6`); in devtools console run `document.documentElement.classList.add("dark")` → page turns warm near-black (`#161613`).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: reset foundation for v3 redesign (tokens, fonts, config)"
```

---

### Task 2: Types, lib helpers, and data (TDD)

**Files:**
- Create: `src/types.ts`
- Create: `src/lib/cn.ts` + Test: `src/lib/cn.test.ts`
- Create: `src/lib/motion.ts`
- Create: `src/data/site.ts` + Test: `src/data/site.test.ts`
- Create: `src/data/projects.ts` + Test: `src/data/projects.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (used by every later task):
  - `types.ts`: `Project { name; tagline; description; image; technologies: string[]; ghLink?; demoLink? }`, `SectionId = "about" | "work" | "contact"`, `NavItem { label: string; id: SectionId }`
  - `lib/cn.ts`: `cn(...classes: Array<string | false | null | undefined>): string`
  - `lib/motion.ts`: `stagger`, `fadeUp`, `fadeIn`, `riseUp` (framer-motion `Variants`), `viewportOnce`
  - `data/site.ts`: `site` object (`name role location email phone phoneHref resumeUrl socials toolbox`), `navItems: NavItem[]`
  - `data/projects.ts`: `projects: Project[]` (9 entries, Cashierio last)

- [ ] **Step 1: Write the failing tests**

`src/lib/cn.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class strings with spaces", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("skips falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cn(false, undefined)).toBe("");
  });
});
```

`src/data/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { navItems, site } from "./site";

describe("site data", () => {
  it("has a valid email", () => {
    expect(site.email).toContain("@");
  });

  it("uses https for every social and resume link", () => {
    for (const social of site.socials) {
      expect(social.url).toMatch(/^https:\/\//);
      expect(social.label.length).toBeGreaterThan(0);
    }
    expect(site.resumeUrl).toMatch(/^https:\/\//);
  });

  it("navigates to the three page sections", () => {
    expect(navItems.map((item) => item.id)).toEqual(["work", "about", "contact"]);
  });
});
```

`src/data/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("contains all 9 projects with Cashierio as the closer", () => {
    expect(projects).toHaveLength(9);
    expect(projects[projects.length - 1].name).toBe("Cashierio");
  });

  it("has clean names with no stray whitespace", () => {
    for (const project of projects) {
      expect(project.name).toBe(project.name.trim());
      expect(project.name.length).toBeGreaterThan(0);
    }
  });

  it("uses display-cased technology labels", () => {
    for (const project of projects) {
      expect(project.technologies.length).toBeGreaterThan(0);
      for (const tech of project.technologies) {
        // Guards against v2's lowercase labels ("react", "vbnet") sneaking back in.
        expect(tech).toMatch(/^[A-Z0-9]/);
      }
    }
  });

  it("only uses https links", () => {
    for (const project of projects) {
      for (const link of [project.ghLink, project.demoLink]) {
        if (link) expect(link).toMatch(/^https:\/\//);
      }
    }
  });

  it("bundles an image for every project", () => {
    for (const project of projects) {
      expect(project.image).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test
```

Expected: FAIL — cannot resolve `./cn`, `./site`, `./projects`.

- [ ] **Step 3: Create `src/types.ts`**

```ts
// A portfolio project as displayed in the Work gallery.
export type Project = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  ghLink?: string;
  demoLink?: string;
};

// Anchor ids of the navigable page sections.
export type SectionId = "about" | "work" | "contact";

// A top-navigation entry pointing at a page section.
export type NavItem = {
  label: string;
  id: SectionId;
};
```

- [ ] **Step 4: Create `src/lib/cn.ts`**

```ts
// Joins class names into one string, skipping falsy values.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 5: Create `src/lib/motion.ts`**

```ts
import type { Variants } from "framer-motion";

// Parent container that staggers its children's entrance animations.
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Fade-up entrance used by section content revealed on scroll.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.6, 0.2, 1] },
  },
};

// Simple fade-in used in the hero load sequence.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// A line of text rising from behind an overflow-hidden mask (hero headline).
export const riseUp: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.2, 0.65, 0.2, 1] },
  },
};

// Shared whileInView settings: reveal once, when 20% of the block is visible.
export const viewportOnce = { once: true, amount: 0.2 } as const;
```

- [ ] **Step 6: Create `src/data/site.ts`**

```ts
import type { NavItem } from "@/types";

// Single source of truth for personal info, external links, and site-wide copy.
export const site = {
  name: "Jess Mark Baguio",
  role: "Front-End Developer",
  location: "Tagum, Davao Region, Philippines",
  email: "jsmrkbaguio@gmail.com",
  phone: "0992 689 0336",
  phoneHref: "tel:+639926890336",
  resumeUrl:
    "https://drive.google.com/file/d/144y-M2C9fg5CksUhfzI_D2PqZU-IfM7b/view?usp=sharing",
  socials: [
    { label: "GitHub", url: "https://github.com/jsmrk" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jess-mark-baguio-980a102a7/",
    },
    { label: "Facebook", url: "https://www.facebook.com/jb.dev.freelancer/" },
    { label: "Upwork", url: "https://www.upwork.com/freelancers/~01026d904ced9e3b13" },
  ],
  toolbox: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Angular",
    "Flutter & Dart",
    "Firebase",
    "Supabase",
  ],
} as const;

// Top-navigation entries, in display order.
export const navItems: NavItem[] = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];
```

- [ ] **Step 7: Create `src/data/projects.ts`**

(Copy cleaned from v2 `projectsData.ts`: trimmed names, "Managment"→"Management", "quicly"→"quickly", display-cased technologies, grammar touch-ups. Content otherwise preserved.)

```ts
import type { Project } from "@/types";
import fitingym from "@/assets/projects/fitingym.png";
import todayILearn from "@/assets/projects/today-i-learn.png";
import enver from "@/assets/projects/enver.png";
import swipe from "@/assets/projects/swipe.png";
import icareAdmin from "@/assets/projects/icare-web.png";
import icareTagum from "@/assets/projects/icare.png";
import quizler from "@/assets/projects/quizler.png";
import restura from "@/assets/projects/francos.png";
import cashierio from "@/assets/projects/cashierio.png";

// All portfolio projects in display order; the last entry renders full-width.
export const projects: Project[] = [
  {
    image: fitingym,
    name: "Fitin Gym",
    tagline: "Landing page for a gym business",
    description:
      "A high-converting landing page for Fitin Gym, a fitness business, built to attract new members and showcase their offerings.",
    technologies: ["React", "TypeScript", "Tailwind"],
    ghLink: "https://github.com/jsmrk/fitin_gym",
    demoLink: "https://jsmrk.github.io/fitin_gym/",
  },
  {
    image: todayILearn,
    name: "Today I Learn",
    tagline: "Discover interesting facts or post your own",
    description:
      "A platform for discovering and curating interesting facts through a user-driven approval system.",
    technologies: ["React", "CSS", "Supabase"],
    ghLink: "https://github.com/jsmrk/today-i-learn",
    demoLink: "https://jsmrk.github.io/today-i-learn/",
  },
  {
    image: enver,
    name: "Enver",
    tagline: "Landing page for a digital studio",
    description:
      "A converting landing page for Enver Studio, a digital agency specializing in UI/UX design solutions for developers.",
    technologies: ["HTML", "CSS", "JavaScript"],
    ghLink: "https://github.com/jsmrk/enver",
    demoLink: "https://jsmrk.github.io/enver/",
  },
  {
    image: swipe,
    name: "Swipe",
    tagline: "Landing page for Swipe",
    description:
      "A compelling landing page for Swipe, a platform empowering businesses to streamline their online financial transactions globally.",
    technologies: ["HTML", "CSS", "JavaScript"],
    ghLink: "https://github.com/jsmrk/swipe",
    demoLink: "https://jsmrk.github.io/swipe/",
  },
  {
    image: icareAdmin,
    name: "iCare Admin",
    tagline: "A report management system",
    description:
      "Admin side of the iCare mobile app, where the local government can review citizens' concerns and act quickly to resolve them.",
    technologies: ["Dart", "Flutter", "Firebase"],
    ghLink: "https://github.com/jsmrk/icare_tagum_admin",
  },
  {
    image: icareTagum,
    name: "iCare Tagum",
    tagline: "A report management system",
    description:
      "A mobile app for submitting citizens' concerns to the government office of Tagum City — built to make sure citizens are heard.",
    technologies: ["Dart", "Flutter", "Firebase"],
    ghLink: "https://github.com/jsmrk/icare_tagum_app",
  },
  {
    image: quizler,
    name: "Quizler",
    tagline: "A quiz game",
    description:
      "A mobile quiz game with random questions pulled from a constantly updated API across a wide range of categories — fresh challenges every round.",
    technologies: ["Dart", "Flutter", "Firebase"],
    ghLink: "https://github.com/jsmrk/Quizler-main-project",
  },
  {
    image: restura,
    name: "Restura",
    tagline: "A restaurant management system",
    description:
      "Software built for Franco's Restaurant covering the needs of the food service sector: cashiering, inventory, and sales tracking.",
    technologies: ["VB.NET", "SQL"],
  },
  {
    image: cashierio,
    name: "Cashierio",
    tagline: "A store management system",
    description:
      "A store management system that keeps everything organized — inventory, sales, and sales tracking in one place.",
    technologies: ["VB.NET", "SQL"],
  },
];
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
pnpm test
```

Expected: PASS — 3 test files, 11 tests.

- [ ] **Step 9: Verify lint + typecheck still pass**

```bash
pnpm lint && pnpm build
```

Expected: clean.

- [ ] **Step 10: Commit**

```bash
git add src/types.ts src/lib src/data
git commit -m "feat: add v3 types, cn/motion helpers, and cleaned site/project data"
```

---

### Task 3: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `fadeIn`, `riseUp` from `@/lib/motion`; `.kicker`, `.link-grow` CSS classes.
- Produces: `Hero` (default export, no props); the `id="top"` anchor used by the Nav wordmark (Task 7); the page's single `<h1>`.

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeIn, riseUp } from "@/lib/motion";

// Slightly slower stagger than sections — this is the page-load moment.
const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Landing hero: masked headline lines rise in sequence on page load.
function Hero() {
  return (
    <section id="top" className="pt-28 md:pt-36">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStagger}
        className="mx-auto w-5/6 max-w-5xl pb-20 md:pb-28"
      >
        <motion.p variants={fadeIn} className="kicker">
          Front-End Developer — Tagum, Philippines
        </motion.p>
        <h1 className="mt-6 font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span variants={riseUp} className="block">
              Building calm, considered
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={riseUp} className="block">
              <em className="text-accent">interfaces</em> for the web.
            </motion.span>
          </span>
        </h1>
        <motion.p
          variants={fadeIn}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted"
        >
          I'm Jess — I build production web apps with React, Next.js and
          TypeScript, and the occasional mobile app in Flutter.
        </motion.p>
        <motion.div variants={fadeIn} className="mt-9 flex items-center gap-7 text-sm">
          <a href="#work" className="link-grow text-accent">
            See selected work ↓
          </a>
          <span className="text-muted">Open to Web Developer roles</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
```

- [ ] **Step 2: Update `src/App.tsx`**

```tsx
import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
      </main>
    </MotionConfig>
  );
}

export default App;
```

- [ ] **Step 3: Verify**

```bash
pnpm lint && pnpm build
```

Expected: clean. Then `pnpm dev` → `http://localhost:5173/jb-portfolio/`:
- Kicker fades in, the two headline lines rise from behind their masks (staggered), then paragraph and CTA row fade in — total ~1s.
- Headline is Playfair; "interfaces" is italic green.
- Hovering "See selected work ↓" grows an underline from the left.
- Devtools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" → reload → content appears without translation animations.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add editorial hero with masked headline entrance"
```

---

### Task 4: Section shell + About section

**Files:**
- Create: `src/components/Section.tsx`
- Create: `src/components/About.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SectionId` from `@/types`; `cn`; `stagger`, `fadeUp`, `viewportOnce` from `@/lib/motion`; `site.toolbox`.
- Produces: `Section` (default export) with props `{ id: SectionId; className?: string; children: ReactNode }` — reused by Work (Task 5) and Contact (Task 6). Children must be `motion.*` elements with `variants={fadeUp}` to participate in the stagger. `About` (default export, no props).

- [ ] **Step 1: Create `src/components/Section.tsx`**

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SectionId } from "@/types";
import { cn } from "@/lib/cn";
import { stagger, viewportOnce } from "@/lib/motion";

type Props = {
  id: SectionId;
  className?: string;
  children: ReactNode;
};

// Section shell: anchor target, top divider, page gutter, scroll-staggered reveal.
function Section({ id, className, children }: Props) {
  return (
    <section id={id} className="border-t border-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger}
        className={cn("mx-auto w-5/6 max-w-5xl py-20 md:py-24", className)}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default Section;
```

- [ ] **Step 2: Create `src/components/About.tsx`**

(Copy is verbatim from the spec — do not edit it.)

```tsx
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";

// About section: editorial side label, lead, bio, and inline toolbox list.
function About() {
  return (
    <Section id="about" className="grid gap-8 md:grid-cols-[160px_1fr]">
      <motion.p variants={fadeUp} className="kicker">
        About
      </motion.p>
      <div>
        <motion.p variants={fadeUp} className="font-serif text-2xl leading-snug md:text-[1.65rem]">
          For the past two years I've been building production web apps at Born
          Digital, a remote-first team — working mainly in React and Next.js.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-sm leading-loose text-muted">
          Along the way I spent a year teaching computer science at the
          University of Mindanao — explaining code to students taught me to
          write it more clearly. I care about interfaces that feel effortless:
          fast, legible, and honest about what they do. Outside client work I
          build my own things — web apps, mobile apps in Flutter, and the
          occasional experiment that never leaves localhost.
        </motion.p>
        <motion.div variants={fadeUp}>
          <p className="kicker mt-8">Toolbox</p>
          <p className="mt-2 text-sm leading-loose">{site.toolbox.join(" · ")}</p>
        </motion.div>
      </div>
    </Section>
  );
}

export default About;
```

- [ ] **Step 3: Update `src/App.tsx`** (add `About` after `Hero`)

```tsx
import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
      </main>
    </MotionConfig>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm build
```

Expected: clean. In `pnpm dev`:
- Scrolling down reveals About: label, lead (Playfair), bio, toolbox — fading up in sequence, once only.
- ≥768px: label sits in a left column; below: stacked.
- Console `document.documentElement.classList.add("dark")` → section colors flip correctly.

- [ ] **Step 5: Commit**

```bash
git add src/components/Section.tsx src/components/About.tsx src/App.tsx
git commit -m "feat: add section shell and about section"
```

---

### Task 5: Work section + project cards

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Work.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Project` type; `projects` from `@/data/projects`; `Section`; `cn`; `fadeUp`.
- Produces: `ProjectCard` (default export) with props `{ project: Project; wide?: boolean }`; `Work` (default export, no props) rendering anchor `id="work"`.

- [ ] **Step 1: Create `src/components/ProjectCard.tsx`**

```tsx
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

type Props = {
  project: Project;
  wide?: boolean;
};

// Gallery card: clipped screenshot with hover zoom, serif title, tech meta line.
function ProjectCard({ project, wide = false }: Props) {
  const href = project.demoLink ?? project.ghLink;

  const body = (
    <>
      <div
        className={cn(
          "overflow-hidden rounded border border-line bg-card",
          wide ? "aspect-[32/10]" : "aspect-[16/10]"
        )}
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-3 font-serif text-xl">
        {project.name}
        {href && (
          <span
            aria-hidden
            className="ml-1 inline-block text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        )}
      </p>
      <p className="kicker mt-1 tracking-[0.2em]">{project.technologies.join(" · ")}</p>
    </>
  );

  if (href) {
    return (
      <motion.a
        variants={fadeUp}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} (opens in a new tab)`}
        className="group block"
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.article variants={fadeUp} className="group">
      {body}
    </motion.article>
  );
}

export default ProjectCard;
```

- [ ] **Step 2: Create `src/components/Work.tsx`**

```tsx
import { motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";

const featured = projects.slice(0, -1);
const closer = projects[projects.length - 1];

// Work section: two-column gallery of projects with a full-width closing row.
function Work() {
  return (
    <Section id="work">
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-baseline justify-between gap-2"
      >
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Selected <em>work</em>
        </h2>
        <p className="kicker">09 Projects — 2022–2026</p>
      </motion.div>
      <div className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div className="mt-12">
        <ProjectCard project={closer} wide />
      </div>
    </Section>
  );
}

export default Work;
```

- [ ] **Step 3: Update `src/App.tsx`** (add `Work` after `About`)

```tsx
import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
        <Work />
      </main>
    </MotionConfig>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm build
```

Expected: clean. In `pnpm dev`:
- 8 cards in 2 columns (desktop) / 1 column (mobile); Cashierio full-width 32/10 at the bottom.
- Cards with links: whole card is an `<a>`, opens demo (or GitHub when no demo) in a new tab; ↗ arrow next to name nudges on hover.
- Restura and Cashierio: no arrow, not clickable.
- Hovering any card slowly zooms the screenshot inside its frame.
- Tech lines read display-cased: "React · TypeScript · Tailwind", "VB.NET · SQL".

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/Work.tsx src/App.tsx
git commit -m "feat: add work gallery with project cards"
```

---

### Task 6: Contact section + footer

**Files:**
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Section`; `fadeUp`; `site` (email, phone, phoneHref, socials, name).
- Produces: `Contact` (default export) rendering anchor `id="contact"`; `Footer` (default export, semantic `<footer>`, computed year).

- [ ] **Step 1: Create `src/components/Contact.tsx`**

```tsx
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";

// Contact section: big mailto link, phone, and social links.
function Contact() {
  return (
    <Section id="contact">
      <motion.p variants={fadeUp} className="kicker">
        Contact
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-medium md:text-5xl">
        Let's build <em className="text-accent">something.</em>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        I'm open to web developer roles and freelance projects. The fastest way
        to reach me:
      </motion.p>
      <motion.p variants={fadeUp} className="mt-6 font-serif text-2xl">
        <a href={`mailto:${site.email}`} className="link-grow text-accent">
          {site.email}
        </a>
      </motion.p>
      <motion.p variants={fadeUp} className="mt-2 text-sm text-muted">
        <a href={site.phoneHref} className="link-grow">
          {site.phone}
        </a>
      </motion.p>
      <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-6 text-xs text-muted">
        {site.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className="link-grow"
            >
              {social.label} ↗
            </a>
          </li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Contact;
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
import { site } from "@/data/site";

// Site footer with a computed copyright year.
function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-5/6 max-w-5xl flex-col gap-1 py-6 text-[11px] text-muted md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Tagum, Davao Region, PH — Built with React &amp; Tailwind</p>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 3: Update `src/App.tsx`** (add `Contact` inside main, `Footer` after)

```tsx
import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm build
```

Expected: clean. In `pnpm dev`:
- Email link opens the mail client (`mailto:jsmrkbaguio@gmail.com`); phone link is `tel:+639926890336`.
- All four socials open in new tabs; each has the grow-underline hover.
- Footer shows the current year (2026), rendered inside a semantic `<footer>` (check element in devtools).

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: add contact section and footer"
```

---

### Task 7: Theme + active-section hooks, and the Nav

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/components/Nav.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `navItems`, `site`; `cn`; `.link-grow`; localStorage key `"theme"` + `dark` class contract from Task 1's `index.html` script; section anchors `about`/`work`/`contact` from Tasks 4–6 and `top` from Task 3.
- Produces: `useTheme(): { theme: "light" | "dark"; toggleTheme: () => void }`; `useActiveSection(sectionIds: readonly string[]): string | null`; `Nav` (default export, no props).

- [ ] **Step 1: Create `src/hooks/useTheme.ts`**

```ts
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

// Reads the theme already applied by the pre-hydration script in index.html.
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Dark-mode state synced to the <html> class and persisted to localStorage.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Create `src/hooks/useActiveSection.ts`**

```ts
import { useEffect, useState } from "react";

// Tracks which section id is currently in view, for nav link highlighting.
// Pass a stable (module-level) array to avoid re-subscribing every render.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // The middle band of the viewport decides the "current" section.
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

- [ ] **Step 3: Create `src/components/Nav.tsx`**

```tsx
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { navItems, site } from "@/data/site";

const SECTION_IDS = navItems.map((item) => item.id);

// Fixed top bar: wordmark, section links, resume, theme toggle, mobile menu.
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  const themeIcon = theme === "light" ? <FiMoon size={14} /> : <FiSun size={14} />;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b bg-bg transition-colors duration-300",
        isScrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="mx-auto flex w-5/6 max-w-5xl items-center justify-between py-4">
        <a href="#top" className="font-serif text-lg italic">
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "text-sm transition-colors hover:text-accent",
                activeSection === item.id ? "text-accent" : "text-muted"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-grow text-sm text-accent"
          >
            Resume ↗
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {themeIcon}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          className="p-2 text-ink md:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg md:hidden">
          <div className="mx-auto flex w-5/6 items-center justify-between py-4">
            <span className="font-serif text-lg italic">{site.name}</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-ink"
            >
              <FiX size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mx-auto mt-14 flex w-5/6 flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-3xl"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-6 border-t border-line pt-8">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted"
              >
                Resume ↗
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={themeLabel}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink"
              >
                {themeIcon}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Nav;
```

- [ ] **Step 4: Update `src/App.tsx`** (final form — add `Nav` before `main`)

```tsx
import { MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
```

- [ ] **Step 5: Verify**

```bash
pnpm lint && pnpm build
```

Expected: clean. In `pnpm dev`:
- Theme toggle flips light/dark with a 300ms crossfade; reload keeps the choice (localStorage `theme`); clearing localStorage + OS dark mode → loads dark with **no flash of light**.
- Nav links smooth-scroll to sections; section headings are not hidden under the fixed bar (scroll-margin).
- Scrolling: the link matching the section in view turns accent (Work / About / Contact).
- At top of page: no border under nav; after scrolling: hairline border appears.
- Narrow window (<768px): hamburger opens the full-screen menu; **tapping a link closes it** and scrolls; Escape-free close via the X button works.
- Wordmark click returns to top.

- [ ] **Step 6: Commit**

```bash
git add src/hooks src/components/Nav.tsx src/App.tsx
git commit -m "feat: add nav with theme toggle, active-section highlight, mobile menu"
```

---

### Task 8: Asset cleanup + full verification pass

**Files:**
- Delete: unused v2 assets in `src/assets/`
- Possibly create: `public/logo.png` (favicon safety, see Step 2)

**Interfaces:**
- Consumes: everything built in Tasks 1–7.
- Produces: the shippable v3 site.

- [ ] **Step 1: Delete unused v2 assets**

```bash
git rm src/assets/hero-image.png src/assets/hero-text.png src/assets/about-image.png src/assets/sign.png src/assets/topwave.png src/assets/hero-bottom-wave.png src/assets/about-bottom-wave.png src/assets/contact-top-wave.png src/assets/skill-bottom-wave.png src/assets/gradient.png src/assets/css.svg src/assets/html.svg src/assets/projects/easytask.png
```

(Keeps: the 9 project screenshots incl. `francos.png`, and `logo.png` pending Step 2.)

- [ ] **Step 2: Favicon safety check**

`index.html` references `href="logo.png"`, which must exist in `public/`:

```bash
ls public
```

- If `public/logo.png` exists → delete the src copy: `git rm src/assets/logo.png`
- If it does NOT exist → move it: `cp src/assets/logo.png public/logo.png && git add public/logo.png && git rm src/assets/logo.png`

- [ ] **Step 3: Full check suite**

```bash
pnpm lint && pnpm test && pnpm build
```

Expected: all clean; build emits to `dist/` (do NOT commit `dist/` — deploy is a separate user-run step).

- [ ] **Step 4: Preview under the production base path**

```bash
pnpm preview
```

Open `http://localhost:4173/jb-portfolio/` and run the spec's checklist:
- Visual pass at 375px, 768px, 1280px, 1920px — light AND dark.
- Theme toggle persists across reload; no wrong-theme flash.
- All 9 projects render with images; linked cards open correct URLs in new tabs; Restura/Cashierio not clickable, no arrow.
- Mobile menu opens, navigates, closes on link click.
- Animations play once per section; with devtools "Emulate prefers-reduced-motion: reduce" the page is fully readable instantly.
- Devtools Lighthouse (Navigation, Desktop): Accessibility score ≥ 95; zero console errors.
- Favicon loads.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused v2 assets and verify v3 build"
```

---

## Post-plan notes (for the final report to Jess)

- Project years were not added (no source data) — ask if he wants per-project years later.
- `dist/` was intentionally not rebuilt/committed; deploying to GitHub Pages (his manual dist-commit flow) is his call after reviewing the site.
- The old `v1/` folder and `public/` were untouched per spec.
