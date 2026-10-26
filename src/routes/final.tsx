import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { ALL_QUESTIONS, shuffle, type Question } from "@/lib/questions";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Mixed Final Review: Unit 2 Chem Review" },
      { name: "description", content: "15 random questions from every Unit 2 Bonding & Reactivity topic." },
      { property: "og:title", content: "Mixed Final Review: Unit 2 Chem Review" },
      { property: "og:description", content: "15 random questions from every Unit 2 Bonding & Reactivity topic." },
    ],
  }),
  component: FinalPage,
});

function FinalPage() {
  const [qs, setQs] = useState<Question[] | null>(null);
  const draw = () => setQs(shuffle(ALL_QUESTIONS).slice(0, 15));
  useEffect(draw, []);
  if (!qs) return <p className="hand p-10 text-center text-3xl text-primary">Shuffling…</p>;
  return <QuizRunner title="Mixed Final Review" questions={qs} onRestart={draw} />;
}
