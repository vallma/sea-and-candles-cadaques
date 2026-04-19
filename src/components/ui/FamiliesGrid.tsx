"use client";

import Link from "next/link";
import { useState } from "react";

const FAMILIES = [
  { key: "marina",  count: 5, name: "Marina",  desc: "Sal, iode, algues" },
  { key: "floral",  count: 2, name: "Floral",  desc: "Gessamí, figa, magnòlia" },
  { key: "herbes",  count: 2, name: "Herbes",  desc: "Farigola, romaní, pi" },
  { key: "terra",   count: 1, name: "Terra",   desc: "Olivera, pedra, fusta seca" },
  { key: "fusta",   count: 2, name: "Fusta",   desc: "Cedre, pi, corda" },
] as const;

interface FamilyCardProps {
  family: (typeof FAMILIES)[number];
  locale: string;
}

function FamilyCard({ family, locale }: FamilyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/${locale}/products?family=${family.key}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--bg-2)" : "var(--bg)",
        padding: "40px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        textDecoration: "none",
        color: "inherit",
        transition: "background 0.2s",
      }}
    >
      <div className="mono" style={{ color: "var(--mute)" }}>
        {String(family.count).padStart(2, "0")} aromes
      </div>
      <div
        className="serif"
        style={{ fontSize: 32, color: "var(--ink)", lineHeight: 1.1 }}
      >
        {family.name}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--ink-soft)",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}
      >
        {family.desc}
      </div>
      <div className="mono" style={{ color: "var(--sea)", marginTop: 8 }}>
        Explora →
      </div>
    </Link>
  );
}

interface FamiliesGridProps {
  locale: string;
}

export default function FamiliesGrid({ locale }: FamiliesGridProps) {
  return (
    <div
      className="grid-5"
      style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
    >
      {FAMILIES.map((f) => (
        <FamilyCard key={f.key} family={f} locale={locale} />
      ))}
    </div>
  );
}
