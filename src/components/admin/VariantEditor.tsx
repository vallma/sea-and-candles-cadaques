"use client";
import { useState } from "react";

interface Variant { scent: string; stock: number; }
interface Props { value: Variant[]; onChange: (v: Variant[]) => void; }

const SUGGESTED_SCENTS = ["Lavanda", "Vainilla", "Mar", "Cedre", "Rosa", "Eucaliptus", "Sàndal", "Coco", "Jasmí", "Sense olor"];

export default function VariantEditor({ value, onChange }: Props) {
  const [newScent, setNewScent] = useState("");

  function add(scent: string) {
    const s = scent.trim();
    if (!s || value.some((v) => v.scent === s)) return;
    onChange([...value, { scent: s, stock: 10 }]);
    setNewScent("");
  }

  function updateStock(idx: number, stock: number) {
    const next = [...value];
    next[idx] = { ...next[idx], stock };
    onChange(next);
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-3">
      {/* Olors afegides */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((v, i) => (
            <div key={v.scent} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2">
              <span className="flex-1 text-sm text-slate-700">{v.scent}</span>
              <input
                type="number" min={0} value={v.stock}
                onChange={(e) => updateStock(i, parseInt(e.target.value) || 0)}
                className="w-16 text-sm border border-slate-200 rounded px-2 py-1 text-center"
              />
              <span className="text-xs text-slate-400">unitats</span>
              <button type="button" onClick={() => remove(i)}
                className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Suggerits */}
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_SCENTS.filter((s) => !value.some((v) => v.scent === s)).map((s) => (
          <button key={s} type="button" onClick={() => add(s)}
            className="text-xs px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
            + {s}
          </button>
        ))}
      </div>

      {/* Input personalitzat */}
      <div className="flex gap-2">
        <input
          type="text" value={newScent} onChange={(e) => setNewScent(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(newScent); } }}
          placeholder="Altra olor personalitzada..."
          className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-300"
        />
        <button type="button" onClick={() => add(newScent)}
          className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
          Afegir
        </button>
      </div>
    </div>
  );
}
