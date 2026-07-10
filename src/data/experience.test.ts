import { describe, expect, it } from "vitest";
import { experience } from "./experience";

describe("experience data", () => {
  it("lists the eight anonymized engagements", () => {
    expect(experience).toHaveLength(8);
  });

  it("has non-empty, trimmed fields", () => {
    for (const item of experience) {
      for (const field of [item.title, item.description, item.sector]) {
        expect(field).toBe(field.trim());
        expect(field.length).toBeGreaterThan(0);
      }
    }
  });

  it("stays anonymous — no brand names or identifying hints", () => {
    // Guards against a real client name or locating detail slipping back in.
    const banned = /apcopay|fyorin|bov|valletta|malta|oxygen|lyv|mediva|browns|\.mt\b|\.co\.uk\b/i;
    for (const item of experience) {
      expect(`${item.title} ${item.description} ${item.sector}`).not.toMatch(banned);
    }
  });
});
