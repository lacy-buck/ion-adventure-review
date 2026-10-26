import type { Question, TableContext } from "./types";

// Hidden true order, most -> least reactive. Charges: Z 1+, R 2+, X 3+, T 1+, W 2+, Y 1+.
export const METALS = [
  { m: "Z", salt: "ZNO3" },
  { m: "R", salt: "R(NO3)2" },
  { m: "X", salt: "X(NO3)3" },
  { m: "T", salt: "TNO3" },
  { m: "W", salt: "W(NO3)2" },
  { m: "Y", salt: "YNO3" },
];

// Columns listed in scrambled order so the answer isn't obvious.
const COLS = ["W", "Z", "Y", "X", "R", "T"];
const rank = (m: string) => METALS.findIndex((x) => x.m === m);

export const metalGrid: TableContext = {
  caption:
    "Lab notebook, Day 4. Each metal strip (columns) was dipped into each salt solution (rows). ✓ = a reaction was seen, — = nothing happened.",
  headers: ["Solution ↓ / Metal →", ...COLS],
  rows: METALS.map((row) => [
    `\`${row.salt}\``,
    ...COLS.map((c) => (c === row.m ? "·" : rank(c) < rank(row.m) ? "✓" : "—")),
  ]),
};

const qGrid: TableContext = {
  caption: "A new metal, Q, was tested in the same six solutions.",
  headers: ["Solution", "Q"],
  rows: METALS.map((row) => [`\`${row.salt}\``, rank(row.m) >= 3 ? "✓" : "—"]),
};

export const activityQuestions: Question[] = [
  {
    id: "act-1",
    station: "activity",
    kind: "order",
    prompt: "Use your notebook data to rank the six mystery metals. Drag them into order.",
    context: metalGrid,
    items: METALS.map((x) => x.m),
    topLabel: "Most reactive",
    bottomLabel: "Least reactive",
    explanation:
      "Count each metal's ✓ marks. Z reacts with all 5 other solutions, so it's the most reactive. Y reacts with none, so it's the least. The order is Z > R > X > T > W > Y.",
  },
  {
    id: "act-2",
    station: "activity",
    kind: "mc",
    prompt: "A lab partner asks why counting ✓ marks ranks the metals. What's the best reason?",
    context: metalGrid,
    options: [
      "A metal that reacts more often has a higher melting point.",
      "A metal can only replace ions of a metal that holds onto its electrons more tightly, so more reactions means it gives up electrons more easily.",
      "The more reactions a metal has, the more water it absorbs.",
      "Metals with more ✓ marks have more protons.",
    ],
    answer: 1,
    explanation:
      "Single replacement happens when the solid metal is more reactive than the metal ion in solution. The solid gives up electrons and becomes an ion. A metal that does this with many solutions loses electrons easily, so it's very reactive.",
  },
  {
    id: "act-3",
    station: "activity",
    kind: "mc",
    prompt: "Look at metal Y in the `W(NO3)2` solution: nothing happened. What can you conclude?",
    context: metalGrid,
    options: [
      "Y is more reactive than W.",
      "Y is less reactive than W.",
      "Y and W are the same metal.",
      "Nothing. No reaction gives no information.",
    ],
    answer: 1,
    explanation:
      "No reaction means Y couldn't push W ions out of solution. That tells you Y is less reactive than W. A dash in the table is still useful evidence.",
  },
  {
    id: "act-4",
    station: "activity",
    kind: "mc",
    prompt: "Where does the new metal Q fit in your ranking? (Full order: Z > R > X > T > W > Y)",
    context: qGrid,
    options: ["Above Z", "Between R and X", "Between X and T", "Between W and Y"],
    answer: 2,
    explanation:
      "Q replaces T, W and Y ions, so it's more reactive than those three. It doesn't react with Z, R or X solutions, so it's less reactive than them. Q goes between X and T.",
  },
  {
    id: "act-5",
    station: "activity",
    kind: "mc",
    prompt:
      "One of the mystery metals might be potassium. Using the salt formulas and your ranking, which metal is the best match?",
    context: metalGrid,
    options: ["Z", "R", "T", "Y"],
    answer: 0,
    explanation:
      "Potassium is in Group 1, so it forms K⁺ ions (1+). Its nitrate has a 1 : 1 formula like `ZNO3`. Z, T and Y all have 1+ ions, but potassium is one of the most reactive metals, and Z ranks at the top. So Z is the best match.",
  },
  {
    id: "act-6",
    station: "activity",
    kind: "equation",
    prompt:
      "Metal X (forms X³⁺) is dropped into a solution of `W(NO3)2`. Write the balanced single replacement equation with state symbols.",
    hint: "X forms 3+ ions and W forms 2+ ions. Nitrate is NO3⁻.",
    answer: "2X(s) + 3W(NO3)2(aq) -> 2X(NO3)3(aq) + 3W(s)",
    explanation:
      "X³⁺ needs three NO3⁻, giving X(NO3)3. Balancing nitrate takes 3 W(NO3)2 → 2 X(NO3)3 (6 nitrates on each side). The equation is 2X(s) + 3W(NO3)2(aq) → 2X(NO3)3(aq) + 3W(s).",
  },
  {
    id: "act-7",
    station: "activity",
    kind: "mc",
    prompt: "Using the reference activity series, which mixture will produce a reaction?",
    options: [
      "Nickel metal + magnesium chloride solution",
      "Tin metal + zinc sulfate solution",
      "Zinc metal + nickel(II) nitrate solution",
      "Lead metal + iron(II) chloride solution",
    ],
    answer: 2,
    explanation:
      "Zinc is above nickel on the activity series, so zinc can replace Ni²⁺ ions. In each of the other mixtures, the solid metal is below the metal in the solution.",
  },
  {
    id: "act-8",
    station: "activity",
    kind: "mc",
    prompt:
      "A solution contains ions of unknown metal M. Lead metal placed in it does nothing, but zinc metal makes a coating of M. Where does M belong?",
    options: ["Above zinc", "Between zinc and lead", "Below lead", "It can't be placed"],
    answer: 1,
    explanation:
      "Zinc replaced M, so zinc is more reactive than M. Lead did not replace M, so M is more reactive than lead. M goes between zinc and lead.",
  },
  {
    id: "act-9",
    station: "activity",
    kind: "equation",
    prompt:
      "Write the balanced equation, with states, for zinc metal reacting with aqueous nickel(II) nitrate.",
    hint: "Zinc forms Zn²⁺. Nickel(II) is Ni²⁺.",
    answer: "Zn(s) + Ni(NO3)2(aq) -> Zn(NO3)2(aq) + Ni(s)",
    explanation:
      "Both ions are 2+, so they swap one for one: Zn(s) + Ni(NO3)2(aq) → Zn(NO3)2(aq) + Ni(s).",
  },
];
