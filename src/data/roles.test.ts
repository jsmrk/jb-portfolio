import { describe, expect, it } from "vitest";
import { roles } from "./roles";

describe("roles data", () => {
  it("lists the four employment roles", () => {
    expect(roles).toHaveLength(4);
  });

  it("has non-empty, trimmed required fields", () => {
    for (const role of roles) {
      for (const field of [role.title, role.company, role.type, role.period]) {
        expect(field).toBe(field.trim());
        expect(field.length).toBeGreaterThan(0);
      }
    }
  });
});
