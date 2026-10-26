import { Formula } from "./RichText";

const SERIES = ["Li", "K", "Ba", "Sr", "Ca", "Na", "Mg", "Al", "Mn", "Zn", "Cr", "Fe", "Ni", "Sn", "Pb", "H", "Cu", "Hg", "Ag", "Pt", "Au"];
const HALOGENS = ["F2", "Cl2", "Br2", "I2"];

const RULES: { ions: string; rule: string; except: string }[] = [
  { ions: "Group 1 (Li⁺, Na⁺, K⁺…), NH4⁺", rule: "Always soluble", except: "none" },
  { ions: "Nitrate NO3⁻, acetate C2H3O2⁻", rule: "Always soluble", except: "none" },
  { ions: "Cl⁻, Br⁻, I⁻", rule: "Soluble", except: "Ag⁺, Pb²⁺, Hg2²⁺" },
  { ions: "Sulfate SO4²⁻", rule: "Soluble", except: "Ba²⁺, Sr²⁺, Pb²⁺, Ca²⁺ (slightly)" },
  { ions: "Carbonate CO3²⁻, phosphate PO4³⁻", rule: "Insoluble", except: "Group 1, NH4⁺" },
  { ions: "Hydroxide OH⁻", rule: "Insoluble", except: "Group 1, NH4⁺, Ba²⁺ (Ca²⁺, Sr²⁺ slightly)" },
  { ions: "Sulfide S²⁻", rule: "Insoluble", except: "Group 1, Group 2, NH4⁺" },
];

export function ReferenceSheet() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="hand text-3xl text-primary">Activity series of metals</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          A metal can replace any metal ion (or H⁺) <em>below</em> it.
        </p>
        <ol className="flex flex-wrap items-center gap-1.5">
          {SERIES.map((m, i) => (
            <li key={m} className="flex items-center gap-1.5">
              <span
                className={`rounded border px-2 py-1 font-mono text-sm ${
                  m === "H" ? "border-accent text-accent" : "border-primary/40 bg-card text-primary"
                }`}
              >
                {m}
              </span>
              {i < SERIES.length - 1 && <span className="text-muted-foreground">›</span>}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">Most reactive → least reactive</p>
        <p className="mt-4 text-sm">
          <span className="font-semibold">Halogens:</span>{" "}
          {HALOGENS.map((h, i) => (
            <span key={h}>
              <Formula f={h} />
              {i < HALOGENS.length - 1 && " › "}
            </span>
          ))}
        </p>
      </section>
      <section>
        <h3 className="hand text-3xl text-primary">Solubility rules (in water)</h3>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr>
                {["Compounds containing…", "Usually", "Exceptions"].map((h) => (
                  <th key={h} className="border border-border bg-secondary px-3 py-2 text-left text-primary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RULES.map((r) => (
                <tr key={r.ions} className="bg-card">
                  <td className="border border-border px-3 py-2">{r.ions}</td>
                  <td className={`border border-border px-3 py-2 font-medium ${r.rule === "Insoluble" ? "text-accent" : "text-success"}`}>
                    {r.rule}
                  </td>
                  <td className="border border-border px-3 py-2">{r.except}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
