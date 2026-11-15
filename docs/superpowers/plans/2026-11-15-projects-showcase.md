# Projects Showcase Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan. Independent navigation work may run alongside the showcase implementation. Steps use checkbox syntax for tracking.

**Goal:** Make projects the portfolio's main proof of work, with readable previews, useful context, and clear actions on desktop and mobile.

**Architecture:** Keep the existing React, Tailwind, theme tokens, fonts, and project records. Place Projects after Work Experience. Show four featured projects in a balanced two-column grid, followed by an expandable archive containing the other eleven. Render project content without waiting for a large section-wide intersection threshold.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, existing react-icons, Vitest, installed browser tooling.

**Spec:** The user authorized choosing the remaining design details, then requested Tally as a fourth featured project and restored the section below Work Experience. Featured projects are Code Box Studios, OAK Barrel Cafe, Motorpool System, and Tally.

## Global Constraints

- Work directly on `main`; preserve unrelated `.gitignore`, `.ignore`, and `pnpm-workspace.yaml` changes.
- Preserve the fourteen existing projects and add Tally, for fifteen projects total, current screenshots, descriptions, live links, and repository links.
- Preserve existing light/dark colors and Inter/Playfair Display typography.
- Add no dependencies, fabricated results, project dates, ownership claims, or live-demo claims for offline projects.
- Keep interaction understandable without hover; use visible keyboard focus and native controls.

## Review Focus

- A fresh mobile visit must show project content at 320px and 390px widths.
- Expanding and collapsing the archive must preserve predictable focus and scroll position.
- Projects with both demo and source links must expose both; projects without links must not show a fake action.
- Screenshots must remain readable, in color, and free of destructive cropping in both themes.
- Navigation order and the hero action must agree with actual document order.

## Task 1: Place projects after Work Experience

**Files:** `src/App.tsx`, `src/components/Hero.tsx`, `src/data/site.ts`, `src/data/site.test.ts`.

- [x] Update the existing navigation-order test and verify the expected failure.
- [x] Use Hero, About, Experience, Work, Contact order; match navigation to About, Experience, Projects, Contact.
- [x] Link a prominent “Explore my projects” hero action to `#work` and allow the hero actions to wrap on narrow screens.
- [x] Run the focused site test and review the scoped diff.

## Task 2: Build the featured showcase and archive

**Files:** `src/components/Work.tsx`, `src/components/ProjectCard.tsx`, `src/types.ts`, `src/data/projects.ts`, optional focused stylesheet.

- [x] Record the existing fresh-mobile invisible-gallery failure in a browser probe before implementation.
- [x] Add featured metadata to the four selected records without changing their display order.
- [x] Render the four featured projects in a balanced two-column grid with visible purpose, technology labels, full-color contained screenshots, and explicit external actions.
- [x] Group the remaining eleven records in an expandable, consistently sized archive using a native button with `aria-expanded` and `aria-controls`.
- [x] Remove cursor wobble, the shared hover halo, and section-wide hidden/reveal behavior from this gallery.
- [x] Verify fresh mobile visibility, archive expansion/collapse, keyboard operation, link availability, and reduced motion in the browser.

## Task 3: Verify and present the running result

**Files:** `.lavish/projects-ux/` review artifact and actual browser captures.

- [x] Run all Vitest tests, a production build outside tracked `dist`, and `git diff --check`.
- [x] Check 320, 390, 640, 768, and 1440px widths with fresh contexts, light/dark themes, real wheel/touch input, and decoded screenshots.
- [x] Request an independent review of the final scoped change and address material findings.
- [x] Open the running app and an annotatable before/after review using the portfolio's own theme.
- [x] Report the local preview and validation results. Do not publish this redesign without a deployment request.
