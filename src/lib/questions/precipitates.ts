import type { Question, TableContext } from "./types";

const mystery: TableContext = {
  caption:
    "Three tubes (1, 2, 3) hold Pb(NO3)2, Ba(NO3)2 and Zn(NO3)2, but you don't know which is which. All three are clear and colorless. A few drops of each test solution were added.",
  headers: ["", "KBr(aq)", "K2SO4(aq)", "NaOH(aq)"],
  rows: [
    ["Tube 1", "stays clear", "white solid forms", "stays clear"],
    ["Tube 2", "white solid forms", "white solid forms", "white solid forms"],
    ["Tube 3", "stays clear", "stays clear", "white gel-like solid"],
  ],
};

const DIAGRAM_PALETTE = [
  "Zn²⁺", "Br⁻", "K⁺", "OH⁻", "H₂O",
  "Zn(OH)₂ (solid)", "ZnBr₂ unit", "KOH unit", "KBr (solid)",
];

export const precipitateQuestions: Question[] = [
  {
    id: "ppt-1",
    station: "precipitates",
    kind: "match",
    prompt: "Use the solubility rules to figure out which compound is in each tube.",
    context: mystery,
    left: ["Tube 1", "Tube 2", "Tube 3"],
    options: ["`Pb(NO3)2`", "`Ba(NO3)2`", "`Zn(NO3)2`"],
    answer: [1, 0, 2],
    explanation:
      "Pb²⁺ forms a precipitate with bromide, sulfate AND hydroxide, so it's in Tube 2. Ba²⁺ forms one only with sulfate (BaSO₄), so it's in Tube 1. Zn²⁺ forms one only with hydroxide (Zn(OH)₂), so it's in Tube 3.",
  },
  {
    id: "ppt-2",
    station: "precipitates",
    kind: "mc",
    prompt: "Suppose you ran out of KBr. Could you still identify all three tubes?",
    context: mystery,
    options: [
      "No. Without bromide you can't detect lead at all.",
      "Yes. Lead is the only ion that forms a precipitate with BOTH sulfate and hydroxide, so the other two tests still tell all three apart.",
      "Yes, but only by tasting the solutions.",
      "No. Sulfate forms a precipitate with all three ions.",
    ],
    answer: 1,
    explanation:
      "Each tube still gives a different pattern. Ba: sulfate only. Zn: hydroxide only. Pb: both. Pb²⁺ + SO₄²⁻ → PbSO₄(s) and Pb²⁺ + 2OH⁻ → Pb(OH)₂(s) are enough to tell lead apart.",
  },
  {
    id: "ppt-3",
    station: "precipitates",
    kind: "equation",
    prompt: "Write the balanced equation, with states, for what happened in Tube 2 when KBr was added.",
    hint: "Lead(II) is Pb²⁺. Which product breaks the halide solubility rule?",
    answer: "Pb(NO3)2(aq) + 2KBr(aq) -> PbBr2(s) + 2KNO3(aq)",
    explanation:
      "The ions swap partners. PbBr₂ is one of the halide exceptions (Ag⁺, Pb²⁺, Hg₂²⁺), so it's the solid. KNO₃ stays dissolved.",
  },
  {
    id: "ppt-4",
    station: "precipitates",
    kind: "equation",
    prompt:
      "Solutions of ammonium carbonate and strontium chloride are mixed. Write the formulas, predict the products, and balance it with states.",
    hint: "Ammonium is NH4⁺. Carbonate is CO3²⁻.",
    answer: "(NH4)2CO3(aq) + SrCl2(aq) -> SrCO3(s) + 2NH4Cl(aq)",
    explanation:
      "Carbonates are insoluble unless paired with Group 1 or ammonium ions, so SrCO₃ precipitates. Ammonium compounds are always soluble.",
  },
  {
    id: "ppt-5",
    station: "precipitates",
    kind: "equation",
    prompt:
      "Solutions of magnesium bromide and potassium hydroxide are mixed. Write the balanced equation with states.",
    answer: "MgBr2(aq) + 2KOH(aq) -> Mg(OH)2(s) + 2KBr(aq)",
    explanation:
      "Most hydroxides are insoluble, so Mg(OH)₂ is the solid. It takes two OH⁻ to balance one Mg²⁺, so KOH and KBr each get a 2.",
  },
  {
    id: "ppt-6",
    station: "precipitates",
    kind: "mc",
    prompt:
      "You have two unlabeled clear solutions: `Sr(NO3)2` and `LiNO3`. Which test solution would tell them apart in one step?",
    options: ["`KNO3(aq)`", "`K2SO4(aq)`", "`LiCl(aq)`", "`NH4Br(aq)`"],
    answer: 1,
    explanation:
      "Sulfate forms a precipitate with Sr²⁺ (SrSO₄) but not with Li⁺. The other choices give no precipitate with either solution, so you'd see nothing either way.",
  },
  {
    id: "ppt-7",
    station: "precipitates",
    kind: "mc",
    prompt: "Rubidium nitrate and ammonium iodide solutions are mixed. What happens?",
    options: [
      "RbI precipitates",
      "NH₄NO₃ precipitates",
      "No precipitate; all the ions stay dissolved",
      "Both products precipitate",
    ],
    answer: 2,
    explanation:
      "Rb⁺ is a Group 1 ion, and ammonium and nitrate compounds are always soluble. Every possible product dissolves, so nothing forms.",
  },
  {
    id: "ppt-8",
    station: "precipitates",
    kind: "diagram",
    prompt:
      "Particle diagram: `ZnBr2(aq) + 2KOH(aq) -> Zn(OH)2(s) + 2KBr(aq)`. Tap particles to add every kind that is present before and after the reaction.",
    palette: DIAGRAM_PALETTE,
    boxes: [
      { label: "Before mixing", expected: ["Zn²⁺", "Br⁻", "K⁺", "OH⁻", "H₂O"] },
      { label: "After reaction", expected: ["Zn(OH)₂ (solid)", "K⁺", "Br⁻", "H₂O"] },
    ],
    explanation:
      "Dissolved ionic compounds exist as separate ions surrounded by water, never as 'ZnBr₂ units'. Afterward, Zn²⁺ and OH⁻ have clumped into solid Zn(OH)₂. K⁺ and Br⁻ are spectator ions and stay dissolved. Water is in both boxes.",
  },
  {
    id: "ppt-9",
    station: "precipitates",
    kind: "diagram",
    prompt: "Show what's in a beaker of potassium carbonate (`K2CO3`) dissolved in water.",
    palette: ["K⁺", "K²⁺", "CO₃²⁻", "C⁴⁺", "O²⁻", "K₂CO₃ unit", "H₂O"],
    boxes: [{ label: "Beaker", expected: ["K⁺", "CO₃²⁻", "H₂O"] }],
    explanation:
      "Ionic solids separate into their ions when they dissolve. Carbonate is a polyatomic ion, so it stays together as CO₃²⁻. There should be twice as many K⁺ as CO₃²⁻, all surrounded by water.",
  },
  {
    id: "ppt-10",
    station: "precipitates",
    kind: "diagram",
    prompt: "Show what's in a beaker of ethanol (`C2H6O`) dissolved in water.",
    palette: ["C₂H₆O molecule", "C⁴⁺", "H⁺", "O²⁻", "OH⁻", "H₂O"],
    boxes: [{ label: "Beaker", expected: ["C₂H₆O molecule", "H₂O"] }],
    explanation:
      "Ethanol is covalent (molecular). Its molecules spread out among the water molecules but don't break into ions. That's why the solution doesn't conduct electricity.",
  },
];
