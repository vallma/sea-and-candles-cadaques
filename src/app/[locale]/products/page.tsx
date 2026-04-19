export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function ProductsPage() {
  const [t, locale] = await Promise.all([getTranslations("products"), getLocale()]);

  const products = await prisma.product.findMany({
    where: { active: true },
    include: { optionGroups: { include: { options: true }, orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#071d30]">
      {/* Header */}
      <div className="pt-20 pb-14 px-6 text-center">
        <p className="text-[#3a7ca5] text-[9px] tracking-[0.55em] uppercase mb-4">
          {t("label")}
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}>
          {t("title")}
        </h1>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 text-[#3a7ca5]">
          <p className="text-4xl mb-4">🕯️</p>
          <p className="text-sm tracking-widest">{t("empty")}</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: typeof products[number]) => (
            <div key={product.id} className="group bg-[#0d2b45] border border-white/5 overflow-hidden">
              {/* Image */}
              <Link href={`/${locale}/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-[#071d30]">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover brightness-80 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#1a5276] text-5xl">
                      🕯️
                    </div>
                  )}
                  {product.category && (
                    <span className="absolute top-3 left-3 text-[8px] tracking-[0.3em] text-[#a9cce3] border border-[#2e86c1]/50 px-2 py-0.5 uppercase bg-[#0d2b45]/80">
                      {product.category}
                    </span>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-5">
                <Link href={`/${locale}/products/${product.id}`}>
                  <h2 className="text-white text-sm font-light tracking-wide mb-1 hover:text-[#a9cce3] transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}>
                    {product.name}
                  </h2>
                </Link>

                {product.description && (
                  <p className="text-[#5d9bbf] text-[11px] leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a9cce3] text-sm font-light">
                    {product.price.toFixed(2)} €
                  </span>
                  {product.materials.length > 0 && (
                    <span className="text-[9px] tracking-wider text-[#3a7ca5]">
                      {product.materials[0]}
                    </span>
                  )}
                </div>

                <Link
                  href={`/${locale}/products/${product.id}`}
                  className="block w-full py-3 text-center text-[10px] tracking-[0.35em] uppercase border border-[#2e86c1]/50 text-[#7fb3d3] hover:bg-[#1a5276]/40 hover:text-white hover:border-[#2e86c1] transition-all duration-300"
                >
                  {t("view")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
