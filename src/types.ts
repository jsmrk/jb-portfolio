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
