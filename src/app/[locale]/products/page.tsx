export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductFilter from "@/components/product/ProductFilter";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ categoria?: string; ordre?: string }>;
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { categoria, ordre } = await searchParams;
  const t = await getTranslations("products");

  const orderBy = ordre === "preu-asc"  ? { price: "asc"  as const }
                : ordre === "preu-desc" ? { price: "desc" as const }
                : ordre === "nom"       ? { name:  "asc"  as const }
                :                        { createdAt: "desc" as const };

  const [products, allProducts] = await Promise.all([
    prisma.product.findMany({
      where: { active: true, ...(categoria ? { category: categoria } : {}) },
      orderBy,
    }),
    prisma.product.findMany({
      where: { active: true },
      select: { category: true },
    }),
  ]);

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))] as string[];

  return (
    <div className="page">
      {/* Header */}
      <section className="section-pad" style={{ paddingBottom: 40 }}>
        <div className="wrap-wide">
          <div className="mono eyebrow" style={{ marginBottom: 20 }}>{t("eyebrow")}</div>
          <div className="products-header-grid">
            <h1
              className="serif"
              style={{
                fontSize: "clamp(44px, 7vw, 104px)",
                margin: 0,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              {t("title")}<span style={{ color: "var(--mute)", fontStyle: "italic" }}>.</span>
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* Sticky filter bar */}
      <Suspense>
        <ProductFilter categories={categories} total={allProducts.length} />
      </Suspense>

      {/* Grid */}
      <section className="section-pad" style={{ paddingTop: 60 }}>
        <div className="wrap-wide">
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p className="serif" style={{ fontSize: 28, fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 24 }}>
                {t("emptyTitle")}
              </p>
              <Link href={`/${locale}/products`} className="btn btn-ghost">
                {t("emptyCta")}
              </Link>
            </div>
          ) : (
            <div className="grid-4" style={{ rowGap: 48 }}>
              {products.map((p, i) => (
                <div key={p.id} className="sc-product-card">
                  <Link
                    href={`/${locale}/products/${p.id}`}
                    style={{ display: "block", textDecoration: "none", color: "inherit" }}
                  >
                    {/* Image container */}
                    <div style={{ aspectRatio: "4/5", position: "relative", overflow: "hidden" }}>
                      {p.images[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <div className="ph" style={{ width: "100%", height: "100%" }}>
                          <span className="ph-label">{p.name}</span>
                        </div>
                      )}

                      {/* Number badge */}
                      <span
                        className="mono"
                        style={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "var(--bg)",
                          padding: "4px 8px",
                          fontSize: 10,
                          letterSpacing: "0.08em",
                        }}
                      >
                        N° {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Category badge */}
                      {p.category && (
                        <span
                          className="mono"
                          style={{
                            position: "absolute",
                            top: 14,
                            left: 14,
                            color: "var(--mist)",
                            mixBlendMode: "difference",
                            fontSize: 9,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          }}
                        >
                          {p.category}
                        </span>
                      )}
                    </div>

                    {/* Card info */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 14 }}>
                      <div>
                        <div className="serif" style={{ fontSize: 22, lineHeight: 1.1 }}>{p.name}</div>
                        {p.category && (
                          <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--mute)", marginTop: 2 }}>
                            {p.category}
                          </div>
                        )}
                      </div>
                      <div className="mono" style={{ color: "var(--ink-soft)", fontSize: 12, whiteSpace: "nowrap", marginLeft: 12 }}>
                        {p.price.toFixed(2)} €
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
