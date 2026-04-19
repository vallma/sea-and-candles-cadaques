import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartForm from "@/components/product/AddToCartForm";
import ImageGallery from "@/components/product/ImageGallery";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const t = await getTranslations("product");

  const [product, related] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        optionGroups: { orderBy: { position: "asc" }, include: { options: true } },
      },
    }),
    prisma.product.findMany({
      where: { active: true, id: { not: id } },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, name: true, price: true, images: true, category: true },
    }),
  ]);

  if (!product || !product.active) notFound();

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div style={{ padding: "24px 40px" }} className="mono">
        <div className="wrap-wide" style={{ color: "var(--mute)" }}>
          <Link href={`/${locale}`}>{t("breadcrumbHome")}</Link>
          {" / "}
          <Link href={`/${locale}/products`} style={{ margin: "0 6px" }}>{t("breadcrumbShop")}</Link>
          {product.category && (
            <>/ <span style={{ marginRight: 6 }}>{product.category}</span></>
          )}
          {" / "}
          <span style={{ color: "var(--ink)" }}>{product.name}</span>
        </div>
      </div>

      <section style={{ padding: "0 40px 80px" }}>
        <div
          className="wrap-wide"
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80 }}
        >
          {/* LEFT: ImageGallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* RIGHT: sticky info */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            {product.category && (
              <div className="mono eyebrow" style={{ marginBottom: 14 }}>
                {product.category} · {t("collection")}
              </div>
            )}
            <h1
              className="serif"
              style={{
                fontSize: 68,
                margin: 0,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              {product.name}
            </h1>

            {product.description && (
              <div
                style={{
                  marginTop: 28,
                  paddingTop: 24,
                  borderTop: "1px solid var(--rule)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--ink-soft)",
                }}
              >
                {product.description}
              </div>
            )}

            {/* Materials as "olfactive notes" grid */}
            {product.materials.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <div className="mono eyebrow" style={{ marginBottom: 14 }}>{t("materials")}</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(product.materials.length, 3)}, 1fr)`,
                    gap: 1,
                    background: "var(--rule)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  {product.materials.map((m, i) => (
                    <div key={i} style={{ background: "var(--bg)", padding: "16px 14px" }}>
                      <div
                        className="mono"
                        style={{ color: "var(--mute)", marginBottom: 6, fontSize: 9 }}
                      >
                        {([t("matPrimary"), t("matSecondary"), t("matBase")] as const)[i] ?? `N° ${i + 1}`}
                      </div>
                      <div className="serif" style={{ fontSize: 18 }}>{m}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AddToCartForm */}
            <div style={{ marginTop: 28 }}>
              <AddToCartForm
                productId={product.id}
                name={product.name}
                basePrice={product.price}
                image={product.images[0] ?? ""}
                optionGroups={product.optionGroups.map((g) => ({
                  id: g.id,
                  name: g.name,
                  options: g.options.map((o) => ({
                    id: o.id,
                    value: o.value,
                    stock: o.stock,
                    priceModifier: o.priceModifier,
                  })),
                }))}
              />
            </div>

            {/* Specs grid */}
            <div
              style={{
                marginTop: 36,
                paddingTop: 24,
                borderTop: "1px solid var(--rule)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                fontSize: 12.5,
              }}
            >
              {product.burningTime && (
                <div>
                  <div className="mono" style={{ color: "var(--mute)", marginBottom: 4 }}>
                    {t("burnTime")}
                  </div>
                  <div>{product.burningTime}h</div>
                </div>
              )}
              {product.weight && (
                <div>
                  <div className="mono" style={{ color: "var(--mute)", marginBottom: 4 }}>{t("weight")}</div>
                  <div>{product.weight}g</div>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <div className="mono" style={{ color: "var(--mute)", marginBottom: 4 }}>
                    {t("dimensions")}
                  </div>
                  <div>{product.dimensions}</div>
                </div>
              )}
              <div>
                <div className="mono" style={{ color: "var(--mute)", marginBottom: 4 }}>{t("madeIn")}</div>
                <div>{t("madeInPlace")}</div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono"
                    style={{ color: "var(--mute)", fontSize: 9 }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </div>
  );
}
