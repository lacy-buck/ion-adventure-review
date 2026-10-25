import { describe, expect, it } from "vitest";
import { isBalanced, parseEquation } from "@/lib/chem/equation";
import { ALL_QUESTIONS, QUESTIONS } from ".";

describe("question bank", () => {
  it("has 8-10 questions per station", () => {
    for (const qs of Object.values(QUESTIONS)) {
      expect(qs.length).toBeGreaterThanOrEqual(8);
      expect(qs.length).toBeLessThanOrEqual(10);
    }
  });
  it("every equation answer parses and is balanced", () => {
    for (const q of ALL_QUESTIONS) {
      if (q.kind !== "equation") continue;
      const eq = parseEquation(q.answer);
      expect(eq, q.id).not.toBeNull();
      expect(isBalanced(eq!), q.id).toBe(true);
    }
  });
  it("potassium-like mystery metal question points to a 1+ ion metal", () => {
    const q = QUESTIONS.activity.find((x) => x.id === "act-5");
    expect(q?.kind).toBe("mc");
    if (q?.kind === "mc") expect(q.options[q.answer]).toBe("Z");
  });
});
