import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <a href="/admin/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          ← Productes
        </a>
        <h1 className="text-2xl font-light text-slate-800 mt-3">Nou producte</h1>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-8">
        <ProductForm />
      </div>
    </div>
  );
}
