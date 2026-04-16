"use client";

import { useActionState, useState } from "react";
import { createProduct, updateProduct, type ActionState } from "@/lib/actions/product";
import ImageUploader from "./ImageUploader";
import VariantEditor from "./VariantEditor";
import TagInput from "./TagInput";

interface Product {
  id: string; name: string; description: string | null; price: number; stock: number;
  category: string | null; active: boolean; tags: string[]; materials: string[];
  images: string[]; burningTime: number | null; weight: number | null; dimensions: string | null;
  variants: { scent: string; stock: number }[];
}

interface Props { initialData?: Product; }

const CATEGORIES = ["Estrella de Mar", "Cargol de Mar", "Curculla", "Corna", "Eriçó de Mar", "Espiral de Mar", "Perla", "Altres"];

export default function ProductForm({ initialData }: Props) {
  const action = initialData
    ? updateProduct.bind(null, initialData.id)
    : createProduct;

  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, null);

  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [materials, setMaterials] = useState<string[]>(initialData?.materials ?? ["Cera de soja", "Jesmonite®"]);
  const [variants, setVariants] = useState<{ scent: string; stock: number }[]>(initialData?.variants ?? []);

  const field = "border border-slate-200 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:border-blue-300";
  const label = "block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <form action={formAction} className="space-y-10">
      {/* Hidden serialitzats */}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <input type="hidden" name="materials" value={JSON.stringify(materials)} />
      <input type="hidden" name="variants" value={JSON.stringify(variants)} />

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      {/* ── IMATGES ── */}
      <section>
        <h2 className="text-base font-medium text-slate-800 mb-4">Imatges del producte</h2>
        <ImageUploader value={images} onChange={setImages} />
      </section>

      {/* ── INFORMACIÓ BÀSICA ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <h2 className="text-base font-medium text-slate-800 md:col-span-2">Informació bàsica</h2>

        <div className="md:col-span-2">
          <label className={label}>Nom *</label>
          <input name="name" defaultValue={initialData?.name} required
            placeholder="Cargol de Mar" className={field} />
        </div>

        <div className="md:col-span-2">
          <label className={label}>Descripció</label>
          <textarea name="description" defaultValue={initialData?.description ?? ""} rows={4}
            placeholder="Una peça inspirada en les cargols del Mediterrani..."
            className={field + " resize-none"} />
        </div>

        <div>
          <label className={label}>Preu (€) *</label>
          <input name="price" type="number" step="0.01" min="0"
            defaultValue={initialData?.price} required placeholder="24.90" className={field} />
        </div>

        <div>
          <label className={label}>Estoc general</label>
          <input name="stock" type="number" min="0"
            defaultValue={initialData?.stock ?? 0} className={field} />
          <p className="text-xs text-slate-400 mt-1">Si tens olors, l'estoc es gestiona per olor</p>
        </div>

        <div>
          <label className={label}>Categoria</label>
          <select name="category" defaultValue={initialData?.category ?? ""} className={field}>
            <option value="">Sense categoria</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={label}>Estat</label>
          <select name="active" defaultValue={initialData?.active !== false ? "true" : "false"} className={field}>
            <option value="true">Actiu (visible a la web)</option>
            <option value="false">Inactiu (ocult)</option>
          </select>
        </div>
      </section>

      {/* ── OLORS / VARIANTS ── */}
      <section>
        <h2 className="text-base font-medium text-slate-800 mb-1">Olors disponibles</h2>
        <p className="text-sm text-slate-400 mb-4">El client podrà escollir l'olor en afegir al carrito</p>
        <VariantEditor value={variants} onChange={setVariants} />
      </section>

      {/* ── DETALLS TÈCNICS ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <h2 className="text-base font-medium text-slate-800 md:col-span-3">Detalls tècnics</h2>
        <div>
          <label className={label}>Temps de cremada (h)</label>
          <input name="burningTime" type="number" min="1"
            defaultValue={initialData?.burningTime ?? ""} placeholder="35" className={field} />
        </div>
        <div>
          <label className={label}>Pes (g)</label>
          <input name="weight" type="number" min="1"
            defaultValue={initialData?.weight ?? ""} placeholder="180" className={field} />
        </div>
        <div>
          <label className={label}>Dimensions</label>
          <input name="dimensions" defaultValue={initialData?.dimensions ?? ""}
            placeholder="8 × 8 cm" className={field} />
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section>
        <h2 className="text-base font-medium text-slate-800 mb-1">Materials</h2>
        <TagInput value={materials} onChange={setMaterials} placeholder="Cera de soja, Jesmonite®..." />
      </section>

      {/* ── ETIQUETES ── */}
      <section>
        <h2 className="text-base font-medium text-slate-800 mb-1">Etiquetes</h2>
        <p className="text-sm text-slate-400 mb-3">Per filtrar i cercar productes</p>
        <TagInput value={tags} onChange={setTags} placeholder="bestseller, nadal, nou..." />
      </section>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <a href="/admin/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          ← Cancel·lar
        </a>
        <button type="submit" disabled={pending}
          className="px-8 py-3 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors">
          {pending ? "Guardant..." : initialData ? "Actualitzar producte" : "Crear producte"}
        </button>
      </div>
    </form>
  );
}
