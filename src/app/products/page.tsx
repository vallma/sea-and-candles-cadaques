import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-6">
      <h2 className="text-3xl font-light tracking-widest text-stone-800 text-center mb-12">
        COLECCIÓN
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-stone-400">No hay productos aún.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-stone-100 mb-4" />
              <h3 className="font-light text-stone-800 tracking-wide">{product.name}</h3>
              <p className="text-stone-500 text-sm mt-1">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full py-2 bg-stone-800 text-white text-sm tracking-widest hover:bg-stone-700 transition-colors">
                AGREGAR AL CARRITO
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
