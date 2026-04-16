import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { optionGroups: { include: { options: true }, orderBy: { position: "asc" } } },
  });
  if (!product) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <a href="/admin/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← Productes</a>
        <h1 className="text-2xl font-light text-slate-800 mt-3">Editar: {product.name}</h1>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-8">
        <ProductForm initialData={{
          ...product,
          description: product.description,
          optionGroups: product.optionGroups.map((g) => ({
            name: g.name,
            options: g.options.map((o) => ({ value: o.value, stock: o.stock, priceModifier: o.priceModifier })),
          })),
        }} />
      </div>
    </div>
  );
}
