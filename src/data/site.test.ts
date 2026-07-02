import { describe, expect, it } from "vitest";
import { navItems, site } from "./site";

describe("site data", () => {
  it("has a valid email", () => {
    expect(site.email).toContain("@");
  });

  it("uses https for every social and resume link", () => {
    for (const social of site.socials) {
      expect(social.url).toMatch(/^https:\/\//);
      expect(social.label.length).toBeGreaterThan(0);
    }
    expect(site.resumeUrl).toMatch(/^https:\/\//);
  });

  it("navigates to the three page sections", () => {
    expect(navItems.map((item) => item.id)).toEqual(["work", "about", "contact"]);
  });
});
