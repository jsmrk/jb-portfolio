import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { experience } from "./experience";

// Client names must never appear in the anonymized copy. The banned terms are
// stored as SHA-256 digests, never as plaintext — a guard that spells out the
// very names it protects would leak them to anyone reading this file.
const BANNED_DIGESTS = new Set([
  "929d5758a385b83592f763cd24ece27c64b0857eff752ba42bd8474091f6b231",
  "db775ded1344afe5cc8a8b21e290c568bfef05627cdf9cbdc2d4ff5abdf75f4c",
  "58dec51e901af56890d6bb3779fcf6eee649a24e83f18b9d62d7e3d342609038",
  "1eeed334dffa5ca41e8a445b8b889bdf6e59710a0c261748f9a59944ebf53793",
  "79f9550e027130e35b207dcae063551398b4bffc7b30955296479fbfdf81de90",
  "b982a09b35429d8f87552f1af0a512034e382562cbc792529ed12fd0096e4bef",
  "d83e389d6a3eb4a383a9306c5feabdf3e182c8b15aa007dad74bf7fbb7e29c36",
  "f707c5b56b59cbf1d9eb9c380cda34ce2a1e3fc2645175d93aeabf7fcd299100",
  "c26797501f5fd3656754cbbd007abb551cb6fbe05a07a5379577a12bf23b0567",
  "3830580a8eeea6f3b1d777ee46f2ebc33ee6b9dc231798e7556e3b46e13fbb16",
  "7b48ac80f82c6a97f2b6f6700dc1130ff015b10d2b801b1e8de90705f1752d15",
]);

// Lowercase SHA-256 of a single word, matched against the banned digest set.
const digest = (word: string) =>
  createHash("sha256").update(word.toLowerCase()).digest("hex");

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

  it("stays anonymous — no client identifier survives in the copy", () => {
    for (const item of experience) {
      const words = `${item.title} ${item.description} ${item.sector}`
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

      for (const word of words) {
        expect(BANNED_DIGESTS.has(digest(word))).toBe(false);
      }
    }
  });
});
