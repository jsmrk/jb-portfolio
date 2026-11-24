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
import memento from "@/assets/projects/memento.png";
import unoTrading from "@/assets/projects/jb-trading.png";
import motorpool from "@/assets/projects/um-mms.png";
import codeBoxStudios from "@/assets/projects/code-box-studios.webp";
import oakBarrelCafe from "@/assets/projects/oak-barrel-cafe.webp";
import tally from "@/assets/projects/tally.webp";
import sentryPos from "@/assets/projects/sentry-pos.webp";
import pikol from "@/assets/projects/pikol.webp";

// All portfolio projects in display order, newest first.
export const projects: Project[] = [
  {
    image: codeBoxStudios,
    name: "Code Box Studios",
    featured: true,
    category: "Studio website",
    tagline: "A software studio's digital home",
    description:
      "A website for Code Box Studios showcasing its services and software projects through scroll-driven interactions, with editable content powered by Payload CMS.",
    technologies: ["Next.js", "TypeScript", "Payload CMS"],
    demoLink: "https://code-box-studios.vercel.app/",
  },
  {
    image: sentryPos,
    name: "Sentry POS",
    featured: true,
    category: "Point-of-sale platform",
    tagline: "Sales and stock, in view",
    description:
      "A point-of-sale and business monitoring platform for Philippine stores, with sales, inventory, and multi-branch reporting.",
    technologies: ["Next.js", "React", "NestJS", "PostgreSQL"],
    demoLink: "https://sentry-pos-landing.vercel.app/",
  },
  {
    image: pikol,
    name: "Pikol",
    featured: true,
    category: "Court-booking platform",
    tagline: "Find your next game",
    description:
      "A pickleball court marketplace where players discover venues, check availability, reserve courts, and manage their bookings.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    demoLink: "https://pikol-ph.vercel.app/",
  },
  {
    image: memento,
    name: "Memento",
    tagline: "Collaborative event photo albums",
    description:
      "Landing page for Memento, a mobile app where guests join a private album with a code and add their own photos — one event captured from every angle.",
    technologies: ["Next.js", "React", "Tailwind"],
    demoLink: "https://memento-app-landing.vercel.app/",
  },
  {
    image: unoTrading,
    name: "Uno Trading",
    tagline: "A members-only trading platform",
    description:
      "A private trading platform for Uno Trading Capital Group, built around live scalping, with member accounts provisioned by an administrator.",
    technologies: ["Next.js", "React", "Tailwind"],
    demoLink: "https://jb-trading.vercel.app",
  },
  {
    image: motorpool,
    name: "Motorpool System",
    featured: true,
    category: "Web application",
    tagline: "Vehicle fleet management for a university",
    description:
      "A motorpool management system for the University of Mindanao that tracks, schedules, and dispatches the institution's vehicle fleet.",
    technologies: ["React", "Vite", "Tailwind"],
    demoLink: "https://um-mms-web.vercel.app/",
  },
  {
    image: tally,
    name: "Tally",
    featured: true,
    category: "Personal finance app",
    tagline: "Loans, bills, and repayments in one place",
    description:
      "A cross-platform finance tracker for money borrowed, money lent, and recurring bills, with installment schedules, partial payments, and balances kept separate by currency.",
    technologies: ["Expo", "React Native", "TypeScript", "Supabase"],
    demoLink: "https://tally-code-box-studios.vercel.app/",
  },
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
  {
    image: oakBarrelCafe,
    name: "OAK Barrel Cafe",
    category: "Interactive website",
    tagline: "An immersive coffee shop experience",
    description:
      "An interactive cafe website with a scroll-driven 3D coffee scene, photo gallery, and location information, backed by Payload CMS for content management.",
    technologies: ["Next.js", "Three.js", "Payload CMS"],
    demoLink: "https://coffee-shop-code-box-studios.vercel.app/",
  },
];
