import { createFileRoute, notFound } from "@tanstack/react-router";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { QUESTIONS, STATIONS, type StationId } from "@/lib/questions";

export const Route = createFileRoute("/station/$id")({
  loader: ({ params }) => {
    const station = STATIONS.find((s) => s.id === params.id);
    if (!station) throw notFound();
    return { station };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.station.title}: Unit 2 Chem Review` : "Station: Unit 2 Chem Review";
    const d = loaderData?.station.blurb ?? "Practice station for Unit 2 Bonding & Reactivity.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: StationPage,
});

function StationPage() {
  const { station } = Route.useLoaderData();
  return <QuizRunner key={station.id} title={station.title} questions={QUESTIONS[station.id as StationId]} />;
}
