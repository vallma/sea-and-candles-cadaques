"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface Props {
  categories: string[];
  total: number;
}

export default function ProductFilter({ categories, total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeCategory = params.get("categoria") ?? "";
  const activeSort = params.get("ordre") ?? "";

  const update = useCallback((key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`);
  }, [params, pathname, router]);

  return (
    <div style={{
      position: "sticky",
      top: 64,
      zIndex: 20,
      background: "color-mix(in oklab, var(--bg) 92%, transparent)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--rule)",
      padding: "20px 40px",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}>
        {/* Category chips */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          <button
            className={`chip${!activeCategory ? " active" : ""}`}
            onClick={() => update("categoria", "")}
          >
            Totes
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => update("categoria", activeCategory === cat ? "" : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <select
            value={activeSort}
            onChange={(e) => update("ordre", e.target.value)}
            style={{
              border: "1px solid var(--rule)",
              background: "transparent",
              color: "var(--ink)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "8px 12px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="">Més nous primer</option>
            <option value="preu-asc">Preu ↑</option>
            <option value="preu-desc">Preu ↓</option>
            <option value="nom">A–Z</option>
          </select>

          <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>
            {total} productes
          </span>
        </div>
      </div>
    </div>
  );
}
