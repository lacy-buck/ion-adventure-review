export type State = "s" | "l" | "g" | "aq";
export interface Species {
  coef: number;
  formula: string;
  state?: State;
}
export interface Equation {
  left: Species[];
  right: Species[];
}

const SUB: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
};

function normalize(s: string) {
  return s.replace(/[₀-₉]/g, (c) => SUB[c]).replace(/→|⟶|=>|=/g, "->").replace(/\s+/g, " ").trim();
}

export function countAtoms(formula: string): Record<string, number> | null {
  const stack: Record<string, number>[] = [{}];
  let i = 0;
  const readNum = () => {
    let n = "";
    while (i < formula.length && /\d/.test(formula[i])) n += formula[i++];
    return n ? parseInt(n, 10) : 1;
  };
  while (i < formula.length) {
    const c = formula[i];
    if (c === "(") {
      stack.push({});
      i++;
    } else if (c === ")") {
      i++;
      const n = readNum();
      const top = stack.pop();
      if (!top || stack.length === 0) return null;
      const into = stack[stack.length - 1];
      for (const [k, v] of Object.entries(top)) into[k] = (into[k] ?? 0) + v * n;
    } else if (/[A-Z]/.test(c)) {
      let sym = c;
      i++;
      while (i < formula.length && /[a-z]/.test(formula[i])) sym += formula[i++];
      const n = readNum();
      const top = stack[stack.length - 1];
      top[sym] = (top[sym] ?? 0) + n;
    } else return null;
  }
  return stack.length === 1 ? stack[0] : null;
}

function parseSpecies(raw: string): Species | null {
  const m = raw.trim().match(/^(\d*)\s*(.+?)\s*(?:\((s|l|g|aq)\))?$/i);
  if (!m) return null;
  const formula = m[2].replace(/\s/g, "");
  if (!countAtoms(formula)) return null;
  return {
    coef: m[1] ? parseInt(m[1], 10) : 1,
    formula,
    state: m[3] ? (m[3].toLowerCase() as State) : undefined,
  };
}

export function parseEquation(input: string): Equation | null {
  const parts = normalize(input).split("->");
  if (parts.length !== 2) return null;
  const side = (s: string) => {
    if (!s.trim()) return null;
    const out: Species[] = [];
    for (const piece of s.split("+")) {
      const sp = parseSpecies(piece);
      if (!sp) return null;
      out.push(sp);
    }
    return out;
  };
  const left = side(parts[0]);
  const right = side(parts[1]);
  if (!left || !right) return null;
  return { left, right };
}

function totals(side: Species[]) {
  const t: Record<string, number> = {};
  for (const sp of side) {
    const a = countAtoms(sp.formula)!;
    for (const [k, v] of Object.entries(a)) t[k] = (t[k] ?? 0) + v * sp.coef;
  }
  return t;
}

export function isBalanced(eq: Equation) {
  const l = totals(eq.left);
  const r = totals(eq.right);
  const keys = new Set([...Object.keys(l), ...Object.keys(r)]);
  for (const k of keys) if ((l[k] ?? 0) !== (r[k] ?? 0)) return false;
  return true;
}

export interface CheckResult {
  correct: boolean;
  message: string;
}

const key = (side: Species[]) => side.map((s) => s.formula).sort().join("|");

export function checkEquation(input: string, answer: string, requireStates = true): CheckResult {
  const student = parseEquation(input);
  const ans = parseEquation(answer)!;
  if (!student) {
    return {
      correct: false,
      message: "I couldn't read that. Use the format 2A + B -> C + 2D, with states like (aq) after each formula.",
    };
  }
  if (key(student.left) !== key(ans.left)) {
    return { correct: false, message: "Check your reactants. The left side should match the substances you started with." };
  }
  if (key(student.right) !== key(ans.right)) {
    const expected = new Set(ans.right.map((s) => s.formula));
    const wrong = student.right.find((s) => !expected.has(s.formula));
    return {
      correct: false,
      message: wrong
        ? `Check your products. ${wrong.formula} isn't one of them. Think about which ions swap partners and their charges.`
        : "Check your products. Something is missing.",
    };
  }
  if (!isBalanced(student)) {
    return { correct: false, message: "Your products are right, but the equation isn't balanced. Count each atom on both sides." };
  }
  const coefOf = (eq: Equation, f: string) =>
    [...eq.left, ...eq.right].find((s) => s.formula === f)!.coef;
  const allF = [...ans.left, ...ans.right].map((s) => s.formula);
  if (allF.some((f) => coefOf(student, f) !== coefOf(ans, f))) {
    return { correct: false, message: "Balanced, but use the lowest whole-number coefficients." };
  }
  if (requireStates) {
    for (const sp of [...ans.left, ...ans.right]) {
      const st = [...student.left, ...student.right].find((s) => s.formula === sp.formula)!;
      if (!st.state) return { correct: false, message: `Add state symbols. ${sp.formula} needs one, like (s), (l), (g) or (aq).` };
      if (st.state !== sp.state) return { correct: false, message: `Almost there! Check the state of ${sp.formula}.` };
    }
  }
  return { correct: true, message: "Correct, and balanced!" };
}
