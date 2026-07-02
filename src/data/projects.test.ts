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
