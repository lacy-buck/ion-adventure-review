import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RichText } from "@/components/chem/RichText";
import { DataTable } from "@/components/chem/DataTable";
import { ReferenceSheet } from "@/components/chem/ReferenceSheet";
import type { Question } from "@/lib/questions";
import { DiagramView, EquationView, MatchView, MCView, OrderView, type Graded } from "./QuestionViews";

export function QuizRunner({ title, questions, onRestart }: { title: string; questions: Question[]; onRestart?: () => void }) {
  const [idx, setIdx] = useState(0);
  const [graded, setGraded] = useState<Graded | null>(null);
  const [score, setScore] = useState(0);
  const [run, setRun] = useState(0);
  const done = idx >= questions.length;
  const q = questions[Math.min(idx, questions.length - 1)]!;

  const grade = (g: Graded) => {
    setGraded(g);
    if (g.correct) setScore((s) => s + 1);
  };
  const next = () => {
    setGraded(null);
    setIdx((i) => i + 1);
  };
  const restart = () => {
    setIdx(0);
    setScore(0);
    setGraded(null);
    setRun((r) => r + 1);
    onRestart?.();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-sm text-primary hover:underline">← All stations</Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm"><BookOpen /> Reference</Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto bg-background sm:max-w-xl">
            <SheetHeader><SheetTitle className="sr-only">Reference</SheetTitle></SheetHeader>
            <ReferenceSheet />
          </SheetContent>
        </Sheet>
      </div>
      <header className="mb-6">
        <h1 className="hand text-5xl text-primary">{title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary transition-all" style={{ width: `${(Math.min(idx, questions.length) / questions.length) * 100}%` }} />
          </div>
          <span className="font-mono text-muted-foreground">{Math.min(idx + 1, questions.length)}/{questions.length}</span>
          <span className="font-mono font-semibold text-success">✓ {score}</span>
        </div>
      </header>

      {done ? (
        <section className="paper margin-line p-8 text-center">
          <p className="hand text-6xl text-accent">{score}/{questions.length}</p>
          <p className="mt-2 text-lg">
            {score === questions.length ? "Perfect! You're ready." : score >= questions.length * 0.7 ? "Solid work. Review the ones you missed." : "Keep practicing. Read the explanations and try again."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={restart}>Try again</Button>
            <Button variant="outline" asChild><Link to="/">Pick another station</Link></Button>
          </div>
        </section>
      ) : (
        <article key={`${run}-${q.id}`} className="paper margin-line p-6 sm:p-8">
          <p className="hand text-2xl text-accent">Question {idx + 1}</p>
          <h2 className="mt-1 text-lg leading-relaxed font-medium"><RichText text={q.prompt} /></h2>
          {q.context && <DataTable ctx={q.context} />}
          <div className="mt-5">
            {q.kind === "mc" && <MCView q={q} locked={!!graded} onGrade={grade} />}
            {q.kind === "order" && <OrderView q={q} locked={!!graded} onGrade={grade} />}
            {q.kind === "match" && <MatchView q={q} locked={!!graded} onGrade={grade} />}
            {q.kind === "equation" && <EquationView q={q} locked={!!graded} onGrade={grade} />}
            {q.kind === "diagram" && <DiagramView q={q} locked={!!graded} onGrade={grade} />}
          </div>
          {graded && (
            <div className={`mt-6 rounded-md border-l-4 p-4 ${graded.correct ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>
              <p className="flex items-center gap-2 font-semibold">
                {graded.correct ? <CheckCircle2 className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
                {graded.correct ? "Nice!" : "Not quite."}
                {!graded.correct && graded.message && <span className="font-normal">{graded.message}</span>}
              </p>
              <p className="mt-2 text-sm leading-relaxed"><RichText text={q.explanation} /></p>
              <Button className="mt-4" onClick={next}>{idx + 1 === questions.length ? "See results" : "Next question →"}</Button>
            </div>
          )}
        </article>
      )}
    </main>
  );
}
