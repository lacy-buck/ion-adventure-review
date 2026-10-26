import { createFileRoute, Link } from "@tanstack/react-router";
import { ReferenceSheet } from "@/components/chem/ReferenceSheet";

export const Route = createFileRoute("/reference")({
  head: () => ({
    meta: [
      { title: "Reference Sheet: Unit 2 Chem Review" },
      { name: "description", content: "Metal activity series and solubility rules for quick reference." },
      { property: "og:title", content: "Reference Sheet: Unit 2 Chem Review" },
      { property: "og:description", content: "Metal activity series and solubility rules for quick reference." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-primary hover:underline">← All stations</Link>
      <h1 className="hand mt-4 mb-6 text-5xl text-primary">Reference sheet</h1>
      <div className="paper margin-line p-6 sm:p-8">
        <ReferenceSheet />
      </div>
    </main>
  ),
});
