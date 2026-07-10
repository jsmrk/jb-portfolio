import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiFlutter,
  SiFirebase,
  SiSupabase,
  SiMedusa,
  SiExpress,
  SiGit,
  SiStrapi,
  SiPayloadcms,
  SiDrupal,
  SiAnthropic,
  SiFigma,
  SiExpo,
  SiConvex,
  SiDocker,
  SiClaude,
  SiZoho,
  SiFramer,
} from "react-icons/si";
import { TbForms } from "react-icons/tb";
import { FaSlack } from "react-icons/fa";

// A toolbox item's brand icon, the color it reveals on hover, and a one-line
// blurb shown in the hover preview. `brand` is an official brand hex, or
// `var(--ink)` for monochrome brands so they stay visible in both themes.
export interface ToolIcon {
  Icon: IconType;
  brand: string;
  blurb: string;
}

// Maps a toolbox label (see site.toolbox) to its icon, hover color, and blurb.
// SurveyJS has no brand glyph, so it borrows a generic form icon.
export const toolboxIcons: Record<string, ToolIcon> = {
  React: { Icon: SiReact, brand: "#61DAFB", blurb: "Component-based UI library for the web." },
  "Next.js": { Icon: SiNextdotjs, brand: "var(--ink)", blurb: "React framework with SSR and routing." },
  TypeScript: { Icon: SiTypescript, brand: "#3178C6", blurb: "Typed superset of JavaScript." },
  "Tailwind CSS": { Icon: SiTailwindcss, brand: "#06B6D4", blurb: "Utility-first CSS framework." },
  Angular: { Icon: SiAngular, brand: "#DD0031", blurb: "TypeScript-based web app framework." },
  "Flutter & Dart": { Icon: SiFlutter, brand: "#02569B", blurb: "Cross-platform mobile UI toolkit." },
  Firebase: { Icon: SiFirebase, brand: "#FFA000", blurb: "Google's backend, auth, and hosting." },
  Supabase: { Icon: SiSupabase, brand: "#3ECF8E", blurb: "Open-source Postgres backend platform." },
  "Medusa.js": { Icon: SiMedusa, brand: "var(--ink)", blurb: "Headless commerce backend for Node." },
  "Express.js": { Icon: SiExpress, brand: "var(--ink)", blurb: "Minimal web server framework for Node." },
  SurveyJS: { Icon: TbForms, brand: "#19B394", blurb: "Dynamic forms and survey engine." },
  Git: { Icon: SiGit, brand: "#F05032", blurb: "Distributed version control." },
  Strapi: { Icon: SiStrapi, brand: "#4945FF", blurb: "Open-source headless CMS." },
  Payload: { Icon: SiPayloadcms, brand: "var(--ink)", blurb: "TypeScript-native headless CMS." },
  Drupal: { Icon: SiDrupal, brand: "#0678BE", blurb: "PHP content management system." },
  Claude: { Icon: SiAnthropic, brand: "#D97757", blurb: "AI assistant for coding and writing." },
  "Claude Design": { Icon: SiClaude, brand: "#D97757", blurb: "AI-assisted UI design and prototyping." },
  Figma: { Icon: SiFigma, brand: "#F24E1E", blurb: "Collaborative interface design tool." },
  Expo: { Icon: SiExpo, brand: "var(--ink)", blurb: "Tooling for React Native apps." },
  Convex: { Icon: SiConvex, brand: "#F3B01C", blurb: "Reactive backend and database platform." },
  Docker: { Icon: SiDocker, brand: "#2496ED", blurb: "Containers for building and shipping apps." },
  Zoho: { Icon: SiZoho, brand: "#E42527", blurb: "Business and productivity software suite." },
  Slack: { Icon: FaSlack, brand: "#36C5F0", blurb: "Team messaging and collaboration." },
  "Framer Motion": { Icon: SiFramer, brand: "#0055FF", blurb: "Animation library for React." },
};
