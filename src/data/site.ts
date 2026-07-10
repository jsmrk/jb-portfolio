import type { NavItem } from "@/types";

// Single source of truth for personal info, external links, and site-wide copy.
export const site = {
  name: "Jess Mark Baguio",
  role: "Full-Stack Web Developer",
  location: "Tagum, Davao Region, Philippines",
  email: "jsmrkbaguio.official@gmail.com",
  phone: "+63 992 689 0336",
  phoneHref: "tel:+639926890336",
  resumeUrl: `${import.meta.env.BASE_URL}Jess-Mark-Baguio-Resume.pdf`,
  socials: [
    { label: "GitHub", url: "https://github.com/jsmrk" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jess-mark-baguio-980a102a7/",
    },
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
    "Medusa.js",
    "Express.js",
    "SurveyJS",
    "Git",
    "Strapi",
    "Payload",
    "Drupal",
    "Claude",
    "Claude Design",
    "Figma",
    "Expo",
    "Convex",
    "Docker",
    "Zoho",
    "Slack",
    "Framer Motion",
  ],
} as const;

// Top-navigation entries, in display order.
// Ordered to match the on-page scroll order so the active-nav highlight
// sweeps top-to-bottom instead of jumping between slots.
export const navItems: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "work" },
  { label: "Contact", id: "contact" },
];
