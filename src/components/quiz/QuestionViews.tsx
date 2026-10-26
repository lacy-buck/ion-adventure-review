import { useMemo, useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichText, Formula } from "@/components/chem/RichText";
import { checkEquation } from "@/lib/chem/equation";
import { shuffle } from "@/lib/questions";
import type { DiagramQuestion, EquationQuestion, MatchQuestion, MCQuestion, OrderQuestion } from "@/lib/questions";

export interface Graded {
  correct: boolean;
  message?: string;
}
interface Props<Q> {
  q: Q;
  locked: boolean;
  onGrade: (g: Graded) => void;
}

export function MCView({ q, locked, onGrade }: Props<MCQuestion>) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {q.options.map((o, i) => {
        const state = locked ? (i === q.answer ? "right" : i === pick ? "wrong" : "") : pick === i ? "picked" : "";
        return (
          <button
            key={i}
            disabled={locked}
            onClick={() => setPick(i)}
            className={`flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
              state === "right"
                ? "border-success bg-success/10"
                : state === "wrong"
                  ? "border-destructive bg-destructive/10"
                  : state === "picked"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/60"
            }`}
          >
            <span className="hand text-2xl leading-none text-primary">{String.fromCharCode(97 + i)}.</span>
            <span className="pt-0.5"><RichText text={o} /></span>
          </button>
        );
      })}
      {!locked && (
        <Button className="mt-2" disabled={pick === null} onClick={() => onGrade({ correct: pick === q.answer })}>
          Check answer
        </Button>
      )}
    </div>
  );
}

function SortItem({ id, index, locked }: { id: string; index: number; locked: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: locked });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`flex touch-none items-center gap-3 rounded-md border bg-card px-4 py-3 ${
        isDragging ? "z-10 border-primary shadow-lg" : "border-border"
      } ${locked ? "" : "cursor-grab active:cursor-grabbing"}`}
    >
      <span className="w-5 text-sm text-muted-foreground">{index + 1}</span>
      <span className="font-mono text-lg font-semibold text-primary">{id}</span>
      {!locked && <GripVertical className="ml-auto h-4 w-4 text-muted-foreground" />}
    </li>
  );
}

export function OrderView({ q, locked, onGrade }: Props<OrderQuestion>) {
  const initial = useMemo(() => {
    let s = shuffle(q.items);
    while (s.join() === q.items.join()) s = shuffle(q.items);
    return s;
  }, [q]);
  const [items, setItems] = useState(initial);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const onEnd = (e: DragEndEvent) => {
    if (e.over && e.active.id !== e.over.id) {
      setItems((it) => arrayMove(it, it.indexOf(String(e.active.id)), it.indexOf(String(e.over!.id))));
    }
  };
  return (
    <div className="max-w-sm">
      <p className="hand mb-1 text-xl text-accent">{q.topLabel} ↑</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2">
            {items.map((id, i) => (
              <SortItem key={id} id={id} index={i} locked={locked} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      <p className="hand mt-1 text-xl text-accent">{q.bottomLabel} ↓</p>
      {!locked && (
        <Button className="mt-3" onClick={() => onGrade({ correct: items.join() === q.items.join() })}>
          Check order
        </Button>
      )}
      {locked && <p className="mt-3 text-sm">Correct order: <span className="font-mono font-semibold">{q.items.join(" > ")}</span></p>}
    </div>
  );
}

export function MatchView({ q, locked, onGrade }: Props<MatchQuestion>) {
  const [sel, setSel] = useState<(number | null)[]>(q.left.map(() => null));
  return (
    <div className="space-y-3">
      {q.left.map((l, i) => {
        const wrong = locked && sel[i] !== q.answer[i];
        return (
          <div key={l} className="flex flex-wrap items-center gap-3">
            <span className="w-24 font-semibold text-primary">{l}</span>
            <span className="text-muted-foreground">→</span>
            <select
              disabled={locked}
              value={sel[i] ?? ""}
              onChange={(e) => setSel((s) => s.map((v, j) => (j === i ? Number(e.target.value) : v)))}
              className={`min-w-56 rounded-md border bg-card px-3 py-2 ${
                locked ? (wrong ? "border-destructive" : "border-success") : "border-input"
              }`}
            >
              <option value="" disabled>Choose…</option>
              {q.options.map((o, oi) => (
                <option key={oi} value={oi}>{o.replace(/`/g, "")}</option>
              ))}
            </select>
            {wrong && (
              <span className="text-sm text-destructive">
                should be <RichText text={q.options[q.answer[i]]} />
              </span>
            )}
          </div>
        );
      })}
      {!locked && (
        <Button disabled={sel.some((s) => s === null)} onClick={() => onGrade({ correct: sel.every((s, i) => s === q.answer[i]) })}>
          Check matches
        </Button>
      )}
    </div>
  );
}

export function EquationView({ q, locked, onGrade }: Props<EquationQuestion>) {
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const check = () => {
    const r = checkEquation(val, q.answer);
    if (r.correct || tries >= 2) onGrade({ correct: r.correct, message: r.message });
    else {
      setMsg(r.message);
      setTries((t) => t + 1);
    }
  };
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Type it like: <span className="font-mono">2A(s) + B(NO3)2(aq) -&gt; ...</span>. Numbers after symbols become subscripts automatically.
      </p>
      <Input
        value={val}
        disabled={locked}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !locked && val.trim() && check()}
        placeholder="Reactants -> Products"
        className="h-12 bg-card font-mono text-base"
        spellCheck={false}
        autoCapitalize="off"
      />
      {val && (
        <p className="text-lg">
          Preview: <Formula f={val} />
        </p>
      )}
      {q.hint && !locked && <p className="hand text-xl text-accent">Hint: {q.hint}</p>}
      {msg && !locked && (
        <p className="rounded-md border border-accent/50 bg-accent/10 px-3 py-2 text-sm">
          {msg} <span className="text-muted-foreground">({3 - tries} tries left)</span>
        </p>
      )}
      {!locked && <Button disabled={!val.trim()} onClick={check}>Check equation</Button>}
      {locked && (
        <p className="text-lg">
          Answer: <Formula f={q.answer} />
        </p>
      )}
    </div>
  );
}

export function DiagramView({ q, locked, onGrade }: Props<DiagramQuestion>) {
  const [active, setActive] = useState(0);
  const [boxes, setBoxes] = useState<string[][]>(q.boxes.map(() => []));
  const toggle = (p: string) =>
    setBoxes((b) => b.map((list, i) => (i !== active ? list : list.includes(p) ? list.filter((x) => x !== p) : [...list, p])));
  const grade = () =>
    onGrade({
      correct: q.boxes.every((bx, i) => bx.expected.length === boxes[i].length && bx.expected.every((e) => boxes[i].includes(e))),
    });
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {q.palette.map((p) => (
          <button
            key={p}
            disabled={locked}
            onClick={() => toggle(p)}
            className={`rounded-full border px-3 py-1.5 font-mono text-sm transition-colors ${
              boxes[active].includes(p) ? "border-primary bg-primary text-primary-foreground" : "border-primary/40 bg-card text-primary hover:bg-secondary"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className={`grid gap-4 ${q.boxes.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {q.boxes.map((bx, i) => {
          const ok = locked && bx.expected.length === boxes[i].length && bx.expected.every((e) => boxes[i].includes(e));
          return (
            <div
              key={bx.label}
              onClick={() => !locked && setActive(i)}
              className={`min-h-40 cursor-pointer rounded-b-[2rem] border-2 border-t-0 p-4 ${
                locked ? (ok ? "border-success" : "border-destructive") : active === i ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <p className="hand mb-2 text-2xl text-primary">
                {bx.label} {!locked && active === i && <span className="text-base text-accent">← adding here</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {boxes[i].map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 font-mono text-sm">
                    {p}
                    {!locked && (
                      <button
                        aria-label={`remove ${p}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setBoxes((b) => b.map((l, j) => (j === i ? l.filter((x) => x !== p) : l)));
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {locked && !ok && (
                <p className="mt-3 text-sm">Should contain: <span className="font-mono">{bx.expected.join(", ")}</span></p>
              )}
            </div>
          );
        })}
      </div>
      {!locked && (
        <>
          <p className="text-xs text-muted-foreground">Tap a beaker to select it, then tap particles to add or remove them.</p>
          <Button onClick={grade} disabled={boxes.every((b) => b.length === 0)}>Check diagram</Button>
        </>
      )}
    </div>
  );
}
