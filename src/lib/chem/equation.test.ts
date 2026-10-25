import { describe, expect, it } from "vitest";
import { checkEquation, countAtoms, isBalanced, parseEquation } from "./equation";

const ANS = "2X(s) + 3W(NO3)2(aq) -> 2X(NO3)3(aq) + 3W(s)";

describe("equation checker", () => {
  it("counts atoms through parentheses", () => {
    expect(countAtoms("Fe2(CO3)3")).toEqual({ Fe: 2, C: 3, O: 9 });
  });
  it("accepts a correct answer in any order and spacing", () => {
    expect(checkEquation("3W(NO3)2(aq)+2X(s) → 3W(s) + 2X(NO3)3(aq)", ANS).correct).toBe(true);
  });
  it("rejects an unbalanced equation", () => {
    const r = checkEquation("X(s) + W(NO3)2(aq) -> X(NO3)3(aq) + W(s)", ANS);
    expect(r.correct).toBe(false);
    expect(r.message).toMatch(/balanced/);
  });
  it("rejects non-lowest coefficients", () => {
    expect(checkEquation("4X(s) + 6W(NO3)2(aq) -> 4X(NO3)3(aq) + 6W(s)", ANS).correct).toBe(false);
  });
  it("rejects a wrong state", () => {
    const r = checkEquation("2X(s) + 3W(NO3)2(aq) -> 2X(NO3)3(s) + 3W(s)", ANS);
    expect(r.correct).toBe(false);
    expect(r.message).toMatch(/state/);
  });
  it("rejects wrong products", () => {
    expect(checkEquation("X(s) + W(NO3)2(aq) -> XNO3(aq) + W(s)", ANS).correct).toBe(false);
  });
  it("detects balance", () => {
    expect(isBalanced(parseEquation("Mg + FeCl2 -> MgCl2 + Fe")!)).toBe(true);
  });
});
