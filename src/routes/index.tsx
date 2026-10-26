import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Shuffle } from "lucide-react";
import { STATIONS, QUESTIONS } from "@/lib/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unit 2 Review: Bonding & Reactivity" },
      { name: "description", content: "Practice stations for activity series, precipitates, predicting products and properties of substances." },
      { property: "og:title", content: "Unit 2 Review: Bonding & Reactivity" },
      { property: "og:description", content: "Practice stations for activity series, precipitates, predicting products and properties of substances." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <p className="hand text-2xl text-accent">Chemistry · Unit 2</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Bonding &amp; <span className="underline-pen">Reactivity</span> Review
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Pick a station. You'll get feedback and an explanation after every question.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {STATIONS.map((s) => (
          <Link
            key={s.id}
            to="/station/$id"
            params={{ id: s.id }}
            className="paper margin-line group block p-6 transition-transform hover:-translate-y-1"
          >
            <p className="hand text-3xl text-accent">{s.number}</p>
            <h2 className="mt-1 text-xl font-semibold text-primary group-hover:underline">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">{QUESTIONS[s.id].length} questions</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Link to="/final" className="group flex items-center gap-4 rounded-md bg-primary p-6 text-primary-foreground shadow-lg transition-transform hover:-translate-y-1">
          <Shuffle className="h-8 w-8" />
          <div>
            <h2 className="hand text-3xl">Mixed Final Review</h2>
            <p className="text-sm opacity-85">15 random questions from all stations</p>
          </div>
        </Link>
        <Link to="/reference" className="paper group flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h2 className="hand text-3xl text-primary">Reference Sheet</h2>
            <p className="text-sm text-muted-foreground">Activity series and solubility rules</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
