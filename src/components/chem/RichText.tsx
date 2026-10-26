import { Fragment, type ReactNode } from "react";

/** Renders a chemical formula: subscripts digits that follow an element or ")". */
export function Formula({ f }: { f: string }) {
  const s = f.replace(/->/g, "→");
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < s.length) {
    const c = s[i];
    const prev = s[i - 1];
    if (/\d/.test(c) && prev && /[A-Za-z)\]]/.test(prev) && !/\((aq|s|l|g)$/.test(s.slice(0, i))) {
      let n = "";
      while (i < s.length && /\d/.test(s[i])) n += s[i++];
      out.push(<sub key={k++}>{n}</sub>);
    } else {
      out.push(<Fragment key={k++}>{c}</Fragment>);
      i++;
    }
  }
  return <span className="font-mono text-[0.95em] whitespace-nowrap">{out}</span>;
}

/** Plain text where `backticked` segments are rendered as formulas. */
export function RichText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <Formula key={i} f={p} /> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}
