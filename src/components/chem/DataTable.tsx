import type { TableContext } from "@/lib/questions";
import { RichText } from "./RichText";

export function DataTable({ ctx }: { ctx: TableContext }) {
  return (
    <figure className="my-4">
      {ctx.caption && (
        <figcaption className="mb-2 text-sm text-muted-foreground">
          <RichText text={ctx.caption} />
        </figcaption>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {ctx.headers.map((h, i) => (
                <th key={i} className="border border-border bg-secondary px-3 py-2 text-left font-semibold text-primary">
                  <RichText text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ctx.rows.map((r, ri) => (
              <tr key={ri} className="odd:bg-card even:bg-background/60">
                {r.map((c, ci) => (
                  <td
                    key={ci}
                    className={`border border-border px-3 py-2 ${ci === 0 ? "font-medium" : ""} ${
                      c === "✓" ? "text-success font-bold text-center" : c === "—" || c === "·" ? "text-muted-foreground text-center" : ""
                    }`}
                  >
                    <RichText text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
