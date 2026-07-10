import type { Role } from "@/types";

// Employment history, most recent first. Client names built under these roles
// are kept anonymous in the accompanying "Selected client work" list.
export const roles: Role[] = [
  {
    title: "Frontend Developer",
    company: "Born Digital",
    type: "Full-time",
    period: "Jun 2024 — Jul 2026",
    location: "Remote",
    summary:
      "Building production web apps for fintech, banking, and healthcare companies in React and Next.js.",
  },
  {
    title: "CS-IT Instructor",
    company: "University of Mindanao",
    type: "Part-time",
    period: "Aug 2024 — Aug 2025",
    location: "Tagum, Philippines · On-site",
    summary: "Taught computer-science courses, including Java and Python.",
  },
  {
    title: "Website Developer",
    company: "Provincial Government of Davao del Norte",
    type: "Internship",
    period: "Jul 2023 — Aug 2023",
    location: "Tagum, Philippines · Hybrid",
    summary: "Built the dashboard for a project-management system in Angular.",
  },
  {
    title: "Web Developer",
    company: "Salv-C Industrial Supply and Services",
    type: "Internship",
    period: "Feb 2022 — May 2022",
    location: "Iligan, Philippines · On-site",
    summary: "Developed a static business landing page in HTML and CSS.",
  },
];
