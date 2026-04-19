import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SeaWidgetCompact, SeaWidgetFull } from "@/components/ui/SeaWidget";
import FamiliesGrid from "@/components/ui/FamiliesGrid";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <>
      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section style={{ padding: "40px 40px 80px" }}>
        <div className="grid-2-hero wrap-wide" style={{ maxWidth: 1600, margin: "0 auto" }}>
          {/* Left: editorial text */}
          <div>
            <p className="mono eyebrow" style={{ marginBottom: 32 }}>
              Col·lecció primavera — N° 01
            </p>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(48px, 8vw, 132px)",
                lineHeight: 0.92,
                color: "var(--ink)",
                marginBottom: 40,
              }}
              dangerouslySetInnerHTML={{
                __html: "La llum<br/><em>de la costa,</em><br/>en una espelma.",
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-soft)",
                lineHeight: 1.75,
                maxWidth: 380,
                marginBottom: 40,
              }}
            >
              Elaborades a mà a Cadaqués amb cera de soja ecològica i essències inspirades en la Costa Brava. Cada espelma és única, com el paisatge que la inspira.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href={`/${locale}/products`} className="btn btn-primary">
                Descobreix la col·lecció →
              </Link>
              <Link href={`/${locale}/qui-som`} className="btn btn-ghost">
                La nostra història
              </Link>
            </div>
          </div>

          {/* Right: hero video + floating caption */}
          <div style={{ position: "relative" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              src="/hero.mp4"
              style={{
                aspectRatio: "4/5",
                width: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Floating caption card */}
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                background: "var(--bg)",
                border: "1px solid var(--rule)",
                padding: "18px 22px",
                maxWidth: 240,
              }}
            >
              <div className="mono" style={{ color: "var(--mute)", marginBottom: 8 }}>
                Escena N° 07
              </div>
              <div
                className="serif"
                style={{ fontSize: 20, color: "var(--ink)", lineHeight: 1.3, fontStyle: "italic" }}
              >
                Migdia a una casa blanca del carrer des Call.
              </div>
            </div>
          </div>
        </div>

        {/* Sea ticker */}
        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            marginTop: 120,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <SeaWidgetCompact />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. FEATURED PRODUCTS
      ═══════════════════════════════════════ */}
      <section style={{ padding: "80px 40px", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto" }}>
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 48,
            }}
          >
            <div>
              <div className="mono eyebrow" style={{ marginBottom: 12 }}>
                Escollides
              </div>
              <h2
                className="serif"
                style={{ fontSize: 56, color: "var(--ink)", lineHeight: 1.05 }}
              >
                Quatre aromes d&apos;aquesta setmana
              </h2>
            </div>
            <Link
              href={`/${locale}/products`}
              className="nav-link"
              style={{ borderBottom: "1px solid var(--ink)", whiteSpace: "nowrap" }}
            >
              Veure totes →
            </Link>
          </div>

          {/* Products grid */}
          <div className="grid-4">
            {products.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="sc-product-card">
                    <div className="ph" style={{ aspectRatio: "4/5", position: "relative" }}>
                      <span className="ph-label">Aviat disponible</span>
                    </div>
                  </div>
                ))
              : products.map((p, i) => (
                  <div key={p.id} className="sc-product-card">
                    <Link
                      href={`/${locale}/products/${p.id}`}
                      style={{ display: "block", textDecoration: "none", color: "inherit" }}
                    >
                      {/* Image area */}
                      <div
                        style={{
                          aspectRatio: "4/5",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div className="ph" style={{ width: "100%", height: "100%" }}>
                            <span className="ph-label">{p.name}</span>
                          </div>
                        )}
                        {/* Number badge */}
                        <div
                          className="mono"
                          style={{
                            position: "absolute",
                            top: 14,
                            right: 14,
                            background: "var(--bg)",
                            padding: "4px 8px",
                            fontSize: 10,
                          }}
                        >
                          N° {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Card info */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "16px 0 4px",
                          gap: 8,
                        }}
                      >
                        <div>
                          <div
                            className="serif"
                            style={{ fontSize: 20, color: "var(--ink)", lineHeight: 1.2 }}
                          >
                            {p.name}
                          </div>
                          {p.category && (
                            <div
                              style={{
                                fontSize: 13,
                                color: "var(--mute)",
                                fontStyle: "italic",
                                marginTop: 4,
                              }}
                            >
                              {p.category}
                            </div>
                          )}
                        </div>
                        <div
                          className="mono"
                          style={{ color: "var(--ink-soft)", whiteSpace: "nowrap", marginTop: 4 }}
                        >
                          {p.price.toFixed(2)} €
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. EDITORIAL SPLIT — Process / Craft
      ═══════════════════════════════════════ */}
      <section style={{ padding: "120px 40px" }}>
        <div className="grid-2 wrap" style={{ maxWidth: 1380, margin: "0 auto", alignItems: "center" }}>
          {/* Left: process video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              aspectRatio: "9/16",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src="/process.mp4" type="video/mp4" />
          </video>

          {/* Right: editorial text + stats */}
          <div>
            <div className="mono eyebrow" style={{ marginBottom: 24 }}>
              N° 02 — L&apos;ofici
            </div>
            <h2
              className="serif"
              style={{ fontSize: 64, color: "var(--ink)", lineHeight: 0.95, marginBottom: 32 }}
              dangerouslySetInnerHTML={{
                __html: "Cada espelma<br/><em>es fa a mà,</em><br/>una a una.",
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-soft)",
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 48,
              }}
            >
              Fem servir cera de soja 100% ecològica, lliure de parafines i toxines. Cada espelma crema entre 45 i 55 hores, emetent fins a un 80% menys de CO₂ que les espelmes convencionals.
            </p>

            {/* Stats grid */}
            <div className="grid-2" style={{ gap: 0, border: "1px solid var(--rule)" }}>
              {[
                ["100%", "Cera de soja"],
                ["0", "Parafines"],
                ["45-55h", "Cremada mitjana"],
                ["CO₂ −80%", "vs. parafina"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  style={{
                    padding: "28px 24px",
                    borderRight: "1px solid var(--rule)",
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  <div
                    className="serif"
                    style={{ fontSize: 36, color: "var(--ink)", lineHeight: 1, marginBottom: 8 }}
                  >
                    {value}
                  </div>
                  <div className="mono" style={{ color: "var(--mute)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. SEA WIDGET SECTION
      ═══════════════════════════════════════ */}
      <section style={{ padding: "60px 40px 120px" }}>
        <div className="grid-2-sea wrap" style={{ maxWidth: 1380, margin: "0 auto" }}>
          {/* Left: editorial text */}
          <div>
            <div className="mono eyebrow" style={{ marginBottom: 24 }}>
              N° 03 — El mar
            </div>
            <h2
              className="serif"
              style={{ fontSize: 56, color: "var(--ink)", lineHeight: 1.0, marginBottom: 28 }}
              dangerouslySetInnerHTML={{
                __html: "Ara mateix<br/><em>a la nostra cala.</em>",
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-soft)",
                lineHeight: 1.75,
                maxWidth: 380,
                marginBottom: 32,
              }}
            >
              Les nostres aromes neixen d&apos;observar el Mediterrani. L&apos;estat del mar cada dia ens recorda per què fem el que fem.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid var(--sea)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <p
                className="serif"
                style={{
                  fontSize: 20,
                  color: "var(--ink-soft)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                «El vent decideix com cau la metxa.»
              </p>
              <div className="mono" style={{ color: "var(--mute)" }}>
                — Oriol, fundador
              </div>
            </blockquote>
          </div>

          {/* Right: sea widget */}
          <SeaWidgetFull />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FAMILIES OLFACTIVES GRID
      ═══════════════════════════════════════ */}
      <section style={{ padding: "80px 40px", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="mono eyebrow" style={{ marginBottom: 16 }}>
              N° 04 — Famílies olfactives
            </div>
            <h2
              className="serif"
              style={{ fontSize: 56, color: "var(--ink)", lineHeight: 1.05 }}
            >
              Cinc maneres d&apos;oblidar-se del temps.
            </h2>
          </div>
          <FamiliesGrid locale={locale} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CLOSING QUOTE
      ═══════════════════════════════════════ */}
      <section style={{ padding: "160px 40px 100px", textAlign: "center" }}>
        {/* S&C Monogram SVG */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 40 40"
          style={{ margin: "0 auto 40px", display: "block" }}
        >
          <circle
            cx="20"
            cy="20"
            r="18.5"
            fill="none"
            stroke="var(--sea)"
            strokeWidth="0.8"
          />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fontFamily="var(--font-cormorant, 'Cormorant Garamond', serif)"
            fontSize="16"
            fill="var(--sea)"
            fontStyle="italic"
          >
            S&amp;C
          </text>
        </svg>

        <blockquote style={{ margin: "0 auto", maxWidth: 680 }}>
          <p
            className="serif"
            style={{
              fontSize: 52,
              color: "var(--ink)",
              fontStyle: "italic",
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            «Quan encens una espelma nostra no compres un producte, encens un racó de Cadaqués.»
          </p>
        </blockquote>

        <div className="mono" style={{ color: "var(--mute)" }}>
          ♡ Fet amb amor a Cadaqués
        </div>
      </section>
    </>
  );
}
