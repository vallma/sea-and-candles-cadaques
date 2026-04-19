"use client";
import { deleteProduct } from "@/lib/actions/product";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  return (
    <form action={deleteProduct.bind(null, id)}>
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600 transition-colors"
        onClick={(e) => { if (!confirm(`Eliminar "${name}"?`)) e.preventDefault(); }}
      >
        Eliminar
      </button>
    </form>
  );
}
