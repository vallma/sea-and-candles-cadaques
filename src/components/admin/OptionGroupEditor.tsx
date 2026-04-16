"use client";
import { useState } from "react";

export interface OptionGroup {
  name: string;
  options: { value: string; stock: number; priceModifier: number }[];
}

interface Props {
  value: OptionGroup[];
  onChange: (groups: OptionGroup[]) => void;
}

const SUGGESTED_GROUPS = ["Olor", "Mida", "Color"];
const SUGGESTED_OPTIONS: Record<string, string[]> = {
  "Olor":  ["Vainilla", "Lavanda", "Mar", "Cedre", "Rosa", "Eucaliptus", "Sàndal", "Coco", "Jasmí", "Sense olor"],
  "Mida":  ["Standard", "L", "XL", "XXL"],
  "Color": ["Blau", "Blanc", "Negre", "Beix", "Rosa", "Verd"],
};

export default function OptionGroupEditor({ value, onChange }: Props) {
  const [newGroupName, setNewGroupName] = useState("");

  function addGroup(name: string) {
    const n = name.trim();
    if (!n || value.some((g) => g.name === n)) return;
    onChange([...value, { name: n, options: [] }]);
    setNewGroupName("");
  }

  function removeGroup(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function addOption(groupIdx: number, optValue: string) {
    const v = optValue.trim();
    if (!v) return;
    const groups = [...value];
    if (groups[groupIdx].options.some((o) => o.value === v)) return;
    groups[groupIdx] = {
      ...groups[groupIdx],
      options: [...groups[groupIdx].options, { value: v, stock: 10, priceModifier: 0 }],
    };
    onChange(groups);
  }

  function removeOption(groupIdx: number, optIdx: number) {
    const groups = [...value];
    groups[groupIdx] = {
      ...groups[groupIdx],
      options: groups[groupIdx].options.filter((_, i) => i !== optIdx),
    };
    onChange(groups);
  }

  function updateOption(
    groupIdx: number, optIdx: number,
    field: "stock" | "priceModifier", val: number
  ) {
    const groups = [...value];
    groups[groupIdx] = {
      ...groups[groupIdx],
      options: groups[groupIdx].options.map((o, i) =>
        i === optIdx ? { ...o, [field]: val } : o
      ),
    };
    onChange(groups);
  }

  return (
    <div className="space-y-6">
      {value.map((group, gi) => {
        const suggested = (SUGGESTED_OPTIONS[group.name] ?? []).filter(
          (s) => !group.options.some((o) => o.value === s)
        );

        return (
          <div key={group.name} className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Capçalera del grup */}
            <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-700">{group.name}</span>
              <button type="button" onClick={() => removeGroup(gi)}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors">
                Eliminar grup
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Opcions actuals */}
              {group.options.length > 0 && (
                <div>
                  {/* Header columnes */}
                  <div className="grid grid-cols-[1fr_80px_90px_24px] gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Valor</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 text-center">Estoc</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 text-center">+/- Preu (€)</span>
                    <span />
                  </div>
                  <div className="space-y-1.5">
                    {group.options.map((opt, oi) => (
                      <div key={opt.value} className="grid grid-cols-[1fr_80px_90px_24px] gap-2 items-center">
                        <span className="text-sm text-slate-700 bg-slate-50 rounded px-3 py-1.5">
                          {opt.value}
                        </span>
                        <input
                          type="number" min={0} value={opt.stock}
                          onChange={(e) => updateOption(gi, oi, "stock", parseInt(e.target.value) || 0)}
                          className="text-sm text-center border border-slate-200 rounded px-2 py-1.5 w-full focus:outline-none focus:border-blue-300"
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400 text-sm">+</span>
                          <input
                            type="number" step="0.01" value={opt.priceModifier}
                            onChange={(e) => updateOption(gi, oi, "priceModifier", parseFloat(e.target.value) || 0)}
                            className="text-sm text-center border border-slate-200 rounded px-2 py-1.5 w-full focus:outline-none focus:border-blue-300"
                          />
                        </div>
                        <button type="button" onClick={() => removeOption(gi, oi)}
                          className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none text-center">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggerits */}
              {suggested.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {suggested.map((s) => (
                    <button key={s} type="button" onClick={() => addOption(gi, s)}
                      className="text-xs px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
                      + {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input personalitzat */}
              <OptionInput onAdd={(v) => addOption(gi, v)} />
            </div>
          </div>
        );
      })}

      {/* Afegir grup */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_GROUPS.filter((g) => !value.some((v) => v.name === g)).map((g) => (
            <button key={g} type="button" onClick={() => addGroup(g)}
              className="text-sm px-4 py-2 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
              + Grup «{g}»
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGroup(newGroupName); } }}
            placeholder="Altre grup personalitzat (ex: Forma)..."
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-300"
          />
          <button type="button" onClick={() => addGroup(newGroupName)}
            className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
            Afegir grup
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionInput({ onAdd }: { onAdd: (v: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2">
      <input
        type="text" value={val} onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(val); setVal(""); } }}
        placeholder="Valor personalitzat..."
        className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-300"
      />
      <button type="button" onClick={() => { onAdd(val); setVal(""); }}
        className="px-3 py-2 border border-slate-200 text-slate-500 text-sm rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors">
        Afegir
      </button>
    </div>
  );
}
