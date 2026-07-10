import { describe, expect, it } from "vitest";
import { navItems, site } from "./site";

describe("site data", () => {
  it("has a valid email", () => {
    expect(site.email).toContain("@");
  });

  it("uses https for every social link", () => {
    for (const social of site.socials) {
      expect(social.url).toMatch(/^https:\/\//);
      expect(social.label.length).toBeGreaterThan(0);
    }
  });

  it("links the resume to the bundled PDF", () => {
    expect(site.resumeUrl).toContain("Jess-Mark-Baguio-Resume.pdf");
  });

  it("navigates to the four page sections in scroll order", () => {
    expect(navItems.map((item) => item.id)).toEqual([
      "about",
      "experience",
      "work",
      "contact",
    ]);
  });
});
