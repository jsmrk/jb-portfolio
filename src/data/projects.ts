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

// All portfolio projects in display order, newest first.
export const projects: Project[] = [
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
    tagline: "Vehicle fleet management for a university",
    description:
      "A motorpool management system for the University of Mindanao that tracks, schedules, and dispatches the institution's vehicle fleet.",
    technologies: ["React", "Vite", "Tailwind"],
    demoLink: "https://um-mms.vercel.app",
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
];
