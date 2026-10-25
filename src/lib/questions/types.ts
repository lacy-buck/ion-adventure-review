export type StationId = "activity" | "precipitates" | "products" | "properties";

export interface TableContext {
  caption?: string;
  headers: string[];
  rows: string[][];
}

interface Base {
  id: string;
  station: StationId;
  prompt: string;
  context?: TableContext;
  explanation: string;
}

export interface MCQuestion extends Base {
  kind: "mc";
  options: string[];
  answer: number;
}
export interface OrderQuestion extends Base {
  kind: "order";
  items: string[]; // correct order, top to bottom
  topLabel: string;
  bottomLabel: string;
}
export interface MatchQuestion extends Base {
  kind: "match";
  left: string[];
  options: string[];
  answer: number[]; // index into options for each left item
}
export interface EquationQuestion extends Base {
  kind: "equation";
  answer: string;
  hint?: string;
}
export interface DiagramQuestion extends Base {
  kind: "diagram";
  palette: string[];
  boxes: { label: string; expected: string[] }[];
}

export type Question = MCQuestion | OrderQuestion | MatchQuestion | EquationQuestion | DiagramQuestion;

export interface Station {
  id: StationId;
  title: string;
  blurb: string;
  number: string;
}
