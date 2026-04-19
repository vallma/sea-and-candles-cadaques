"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

const FAMILIES = [
  { key: "marina", count: 5, name: "Marina",  descKey: "marina_desc" as const },
  { key: "floral", count: 2, name: "Floral",  descKey: "floral_desc" as const },
  { key: "herbes", count: 2, name: "Herbes",  descKey: "herbes_desc" as const },
  { key: "terra",  count: 1, name: "Terra",   descKey: "terra_desc"  as const },
  { key: "fusta",  count: 2, name: "Fusta",   descKey: "fusta_desc"  as const },
] as const;

interface FamilyCardProps {
  family: (typeof FAMILIES)[number];
  locale: string;
}

function FamilyCard({ family, locale }: FamilyCardProps) {
  const [hovered, setHovered] = useState(false);
  const t = useTranslations("families");

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
        {String(family.count).padStart(2, "0")} {t("aromes")}
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
        {t(family.descKey)}
      </div>
      <div className="mono" style={{ color: "var(--sea)", marginTop: 8 }}>
        {t("explore")}
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
