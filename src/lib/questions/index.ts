import { activityQuestions } from "./activity";
import { precipitateQuestions } from "./precipitates";
import { productQuestions } from "./products";
import { propertyQuestions } from "./properties";
import type { Question, Station, StationId } from "./types";

export const STATIONS: Station[] = [
  { id: "activity", number: "01", title: "Activity Series", blurb: "Rank mystery metals from lab data and predict replacements." },
  { id: "precipitates", number: "02", title: "Precipitates & Particles", blurb: "Identify unknown solutions, write precipitation equations, and draw particle diagrams." },
  { id: "products", number: "03", title: "Predicting Products", blurb: "Single vs. double replacement. Write and balance equations with states." },
  { id: "properties", number: "04", title: "Properties of Substances", blurb: "Ionic, covalent or metallic? Use solubility, conductivity and melting point." },
];

export const QUESTIONS: Record<StationId, Question[]> = {
  activity: activityQuestions,
  precipitates: precipitateQuestions,
  products: productQuestions,
  properties: propertyQuestions,
};

export const ALL_QUESTIONS: Question[] = Object.values(QUESTIONS).flat();

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export * from "./types";
