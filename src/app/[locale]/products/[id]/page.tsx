export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import ProductDetail from "@/components/ui/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const [t, locale] = await Promise.all([getTranslations("product"), getLocale()]);

  const product = await prisma.product.findUnique({
    where: { id, active: true },
    include: {
      optionGroups: {
        include: { options: true },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!product) notFound();

  const labels = {
    addToCart:   t("addToCart"),
    added:       t("added"),
    materials:   t("materials"),
    details:     t("details"),
    burningTime: t("burningTime"),
    weight:      t("weight"),
    dimensions:  t("dimensions"),
    hours:       t("hours"),
    grams:       t("grams"),
    required:    t("selectOptions"),
  };

  return (
    <main className="min-h-screen bg-[#071d30]">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href={`/${locale}/products`}
          className="text-[10px] tracking-[0.35em] text-[#3a7ca5] uppercase hover:text-[#7fb3d3] transition-colors"
        >
          ← {t("back")}
        </Link>
      </div>

      <ProductDetail product={product} labels={labels} />
    </main>
  );
}
