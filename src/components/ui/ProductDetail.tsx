"use client";

import Image from "next/image";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import type { SelectedOption } from "@/lib/cart-context";

interface Option {
  id: string;
  value: string;
  stock: number;
  priceModifier: number;
}

interface OptionGroup {
  id: string;
  name: string;
  options: Option[];
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  materials: string[];
  burningTime: number | null;
  weight: number | null;
  dimensions: string | null;
  tags: string[];
  optionGroups: OptionGroup[];
}

interface Labels {
  addToCart: string;
  added: string;
  materials: string;
  details: string;
  burningTime: string;
  weight: string;
  dimensions: string;
  hours: string;
  grams: string;
  required: string;
}

export default function ProductDetail({ product, labels }: { product: Product; labels: Labels }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Option>>({});

  const allGroupsSelected =
    product.optionGroups.length === 0 ||
    product.optionGroups.every((g) => selectedOptions[g.id] !== undefined);

  const builtOptions: SelectedOption[] = Object.entries(selectedOptions).map(([gId, opt]) => {
    const group = product.optionGroups.find((g) => g.id === gId)!;
    return {
      groupName: group.name,
      optionValue: opt.value,
      priceModifier: opt.priceModifier,
    };
  });

  const finalPrice =
    product.price + builtOptions.reduce((s, o) => s + o.priceModifier, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ── IMAGES ── */}
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden bg-[#0d2b45]">
          {product.images[activeImage] ? (
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#1a5276] text-8xl">
              🕯️
            </div>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-16 overflow-hidden border transition-colors ${
                  i === activeImage ? "border-[#2e86c1]" : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── INFO ── */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-white text-3xl md:text-4xl font-light mb-3"
            style={{ fontFamily: "Georgia, serif" }}>
            {product.name}
          </h1>
          <p className="text-[#a9cce3] text-2xl font-light">
            {finalPrice.toFixed(2)} €
          </p>
        </div>

        {product.description && (
          <p className="text-[#7fb3d3] text-[13px] leading-[1.9] font-light">
            {product.description}
          </p>
        )}

        {/* Options */}
        {product.optionGroups.map((group) => (
          <div key={group.id}>
            <p className="text-[9px] tracking-[0.4em] text-[#3a7ca5] uppercase mb-3">
              {group.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const isSelected = selectedOptions[group.id]?.id === opt.id;
                const outOfStock = opt.stock === 0;
                return (
                  <button
                    key={opt.id}
                    disabled={outOfStock}
                    onClick={() =>
                      setSelectedOptions((prev) => ({ ...prev, [group.id]: opt }))
                    }
                    className={`px-4 py-2 text-[11px] tracking-wider border transition-all duration-200 ${
                      outOfStock
                        ? "border-white/10 text-white/20 cursor-not-allowed line-through"
                        : isSelected
                        ? "border-[#2e86c1] bg-[#1a5276]/50 text-white"
                        : "border-white/20 text-[#a9cce3] hover:border-[#2e86c1]/70 hover:text-white"
                    }`}
                  >
                    {opt.value}
                    {opt.priceModifier !== 0 && (
                      <span className="ml-1 text-[9px] text-[#5d9bbf]">
                        {opt.priceModifier > 0 ? "+" : ""}
                        {opt.priceModifier.toFixed(0)}€
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Add to cart */}
        {allGroupsSelected ? (
          <AddToCartButton
            productId={product.id}
            name={product.name}
            basePrice={product.price}
            image={product.images[0] ?? ""}
            selectedOptions={builtOptions}
            label={labels.addToCart}
            addedLabel={labels.added}
          />
        ) : (
          <div className="w-full py-3 text-center text-[10px] tracking-[0.35em] uppercase border border-white/10 text-white/30 cursor-not-allowed">
            {labels.required}
          </div>
        )}

        {/* Technical details */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          {product.materials.length > 0 && (
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#3a7ca5] uppercase mb-2">
                {labels.materials}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <span key={m} className="text-[11px] text-[#7fb3d3] border border-white/10 px-2.5 py-1">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(product.burningTime || product.weight || product.dimensions) && (
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#3a7ca5] uppercase mb-2">
                {labels.details}
              </p>
              <dl className="space-y-1.5 text-[11px]">
                {product.burningTime && (
                  <div className="flex gap-2 text-[#7fb3d3]">
                    <dt className="text-[#3a7ca5]">{labels.burningTime}</dt>
                    <dd>{product.burningTime} {labels.hours}</dd>
                  </div>
                )}
                {product.weight && (
                  <div className="flex gap-2 text-[#7fb3d3]">
                    <dt className="text-[#3a7ca5]">{labels.weight}</dt>
                    <dd>{product.weight} {labels.grams}</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex gap-2 text-[#7fb3d3]">
                    <dt className="text-[#3a7ca5]">{labels.dimensions}</dt>
                    <dd>{product.dimensions}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
