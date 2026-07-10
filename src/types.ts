// A portfolio project as displayed in the Personal projects gallery.
export type Project = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  ghLink?: string;
  demoLink?: string;
};

// A dated employment role shown in the Work experience timeline.
export type Role = {
  title: string;
  company: string;
  type: string; // employment type, e.g. "Full-time", "Internship"
  period: string; // e.g. "Jun 2024 — Present"
  location?: string; // e.g. "Remote", "Tagum, Philippines · On-site"
  summary?: string; // optional one-line description of the work
};

// An anonymized client engagement shown in the Work experience section.
// Names and identifying details are withheld by design.
export type Experience = {
  title: string;
  description: string;
  sector: string;
};

// Anchor ids of the navigable page sections.
export type SectionId = "experience" | "work" | "about" | "contact";

// A top-navigation entry pointing at a page section.
export type NavItem = {
  label: string;
  id: SectionId;
};
