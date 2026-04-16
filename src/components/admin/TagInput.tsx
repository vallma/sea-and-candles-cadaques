"use client";
import { useState, KeyboardEvent } from "react";

interface Props { value: string[]; onChange: (tags: string[]) => void; placeholder?: string; }

export default function TagInput({ value, onChange, placeholder = "Afegir..." }: Props) {
  const [input, setInput] = useState("");

  function add() {
    const tag = input.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !input && value.length) onChange(value.slice(0, -1));
  }

  return (
    <div className="flex flex-wrap gap-1.5 border border-slate-200 rounded-lg px-3 py-2 focus-within:border-blue-300 min-h-[42px]">
      {value.map((tag) => (
        <span key={tag} className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full">
          {tag}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}
            className="text-slate-400 hover:text-red-400 leading-none">×</button>
        </span>
      ))}
      <input
        value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} onBlur={add}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
      />
    </div>
  );
}
