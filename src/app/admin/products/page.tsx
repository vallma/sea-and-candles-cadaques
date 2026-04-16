import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/product";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-slate-800">Productes</h1>
          <p className="text-sm text-slate-400 mt-1">{products.length} productes al catàleg</p>
        </div>
        <Link href="/admin/products/new"
          className="px-5 py-2.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
          + Nou producte
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <p className="text-4xl mb-4">🕯️</p>
          <p className="text-sm">Encara no hi ha productes. Crea el primer!</p>
          <Link href="/admin/products/new"
            className="mt-4 inline-block px-6 py-2.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
            Crear producte
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Producte</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Categoria</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Preu</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Estoc</th>
                <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Estat</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => {
                const totalStock = p.variants.length
                  ? p.variants.reduce((s, v) => s + v.stock, 0)
                  : p.stock;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images[0] && (
                          <img src={p.images[0]} alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                        )}
                        <div>
                          <p className="font-medium text-slate-800">{p.name}</p>
                          {p.variants.length > 0 && (
                            <p className="text-xs text-slate-400">{p.variants.length} olors</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{p.category ?? "—"}</td>
                    <td className="px-5 py-4 text-right font-medium">{p.price.toFixed(2)} €</td>
                    <td className="px-5 py-4 text-right">
                      <span className={totalStock === 0 ? "text-red-500" : totalStock < 5 ? "text-amber-500" : "text-slate-700"}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${p.active ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                        {p.active ? "Actiu" : "Inactiu"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/products/${p.id}/edit`}
                          className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
                          Editar
                        </Link>
                        <form action={deleteProduct.bind(null, p.id)}>
                          <button type="submit"
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                            onClick={(e) => { if (!confirm(`Eliminar "${p.name}"?`)) e.preventDefault(); }}>
                            Eliminar
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
