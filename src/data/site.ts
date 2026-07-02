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
