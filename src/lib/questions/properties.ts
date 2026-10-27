import type { Question, TableContext } from "./types";

const samples: TableContext = {
  caption: "Data collected on four mystery white or gray samples.",
  headers: ["Sample", "Dissolves in water?", "Conducts as a solid?", "Melting point (°C)"],
  rows: [
    ["1", "No", "No", "58"],
    ["2", "Yes", "No", "734"],
    ["3", "No", "Yes", "1538"],
    ["4", "Yes", "No", "186"],
  ],
};

export const propertyQuestions: Question[] = [
  {
    id: "prop-1",
    station: "properties",
    kind: "match",
    prompt: "The labels came off! Match each sample to its substance.",
    context: samples,
    left: ["Sample 1", "Sample 2", "Sample 3", "Sample 4"],
    options: ["Iron (`Fe`)", "Sucrose (`C12H22O11`)", "Paraffin wax (`C25H52`)", "Potassium bromide (`KBr`)"],
    answer: [2, 3, 0, 1],
    explanation:
      "Iron is the only one that conducts as a solid (metallic). KBr is ionic: it dissolves and has a high melting point. Sucrose is a polar covalent molecule: it dissolves but melts at a low temperature. Wax is a nonpolar covalent molecule: it doesn't dissolve and melts at a very low temperature.",
  },
  {
    id: "prop-2",
    station: "properties",
    kind: "mc",
    prompt: "Which sample(s) would conduct electricity once dissolved in water?",
    context: samples,
    options: ["Sample 2 only", "Samples 2 and 4", "Sample 3 only", "Samples 1 and 3"],
    answer: 0,
    explanation:
      "Only an ionic compound that dissolves (Sample 2, KBr) releases charged ions into the water. Sample 4 dissolves as neutral molecules, and Samples 1 and 3 don't dissolve.",
  },
  {
    id: "prop-3",
    station: "properties",
    kind: "mc",
    prompt: "Why does Sample 2 conduct when dissolved but not as a solid?",
    options: [
      "Water adds free electrons to it.",
      "In the solid, its ions are locked in a crystal lattice. In water, they're free to move and carry charge.",
      "It turns into a metal in water.",
      "Its covalent bonds break and release protons.",
    ],
    answer: 1,
    explanation: "To conduct, charged particles must be able to move. Ions are stuck in place in a crystal, but they move freely in solution.",
  },
  {
    id: "prop-4",
    station: "properties",
    kind: "mc",
    prompt: "Sample 4 dissolves easily, yet the solution doesn't light a conductivity bulb. Why?",
    options: [
      "It dissolves as whole neutral molecules, so there are no ions.",
      "Its ions are too big to move.",
      "Sugar water is too thick.",
      "It reacts with water to form a solid.",
    ],
    answer: 0,
    explanation: "Covalent compounds like sucrose separate into individual molecules, not ions. With no charged particles moving, there's no current.",
  },
  {
    id: "prop-5",
    station: "properties",
    kind: "mc",
    prompt: "What lets Sample 3 conduct electricity as a solid?",
    options: [
      "Ions moving through the crystal",
      "A 'sea' of electrons that can flow between metal atoms",
      "Water trapped inside it",
      "Strong covalent bonds",
    ],
    answer: 1,
    explanation: "In metallic bonding, the valence electrons are delocalized. They're free to drift through the metal, so it conducts even as a solid.",
  },
  {
    id: "prop-6",
    station: "properties",
    kind: "mc",
    prompt: "Sample 2 melts at 734 °C, but Sample 4 melts at only 186 °C. What best explains the difference?",
    options: [
      "Sample 4 has more atoms.",
      "Melting Sample 2 means overcoming strong attractions between oppositely charged ions. Melting Sample 4 only separates molecules from each other.",
      "Sample 2 contains a metal, and all metals melt above 700 °C.",
      "Sample 4 absorbs heat faster.",
    ],
    answer: 1,
    explanation:
      "Ionic lattices are held together by strong electrostatic attractions. Molecular solids have weaker forces between molecules, so they melt at lower temperatures.",
  },
  {
    id: "prop-7",
    station: "properties",
    kind: "mc",
    prompt: "A new shiny sample doesn't dissolve, conducts as a solid, and melts at 962 °C. How should it be classified?",
    options: ["Ionic", "Polar covalent", "Metallic", "Nonpolar covalent"],
    answer: 2,
    explanation: "Conducting as a solid is the giveaway for a metal. Its shine and high melting point fit too.",
  },
  {
    id: "prop-8",
    station: "properties",
    kind: "mc",
    prompt: "A white crystal melts at 801 °C. It doesn't conduct as a solid, but it DOES conduct once melted. What type of substance is it?",
    options: ["Metallic", "Ionic", "Covalent molecular", "Can't tell"],
    answer: 1,
    explanation: "Melting frees the ions just like dissolving does. Only ionic compounds conduct as liquids but not as solids.",
  },
  {
    id: "prop-9",
    station: "properties",
    kind: "mc",
    prompt: "Which statement correctly compares the two main bond types?",
    options: [
      "Ionic bonds share electrons, and covalent bonds transfer them.",
      "Ionic bonds form when electrons transfer from a metal to a nonmetal. Covalent bonds form when nonmetals share electrons.",
      "Both form only between metals.",
      "Covalent bonds always make substances that conduct.",
    ],
    answer: 1,
    explanation:
      "Metal + nonmetal → electron transfer → ions → ionic. Nonmetal + nonmetal → shared electrons → molecules → covalent.",
  },
];
