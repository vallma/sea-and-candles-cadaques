"use client";

import { useCart, type SelectedOption } from "@/lib/cart-context";
import { useState } from "react";

interface Props {
  productId: string;
  name: string;
  basePrice: number;
  image: string;
  selectedOptions: SelectedOption[];
  label: string;
  addedLabel: string;
}

export default function AddToCartButton({
  productId, name, basePrice, image, selectedOptions, label, addedLabel,
}: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const finalPrice =
    basePrice + selectedOptions.reduce((s, o) => s + o.priceModifier, 0);

  function handleAdd() {
    addItem({ productId, name, price: finalPrice, image, selectedOptions });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3 text-[10px] tracking-[0.35em] uppercase transition-all duration-300 ${
        added
          ? "bg-[#1a5276] text-white border border-[#1a5276]"
          : "border border-[#2e86c1]/50 text-[#7fb3d3] hover:bg-[#1a5276]/40 hover:text-white hover:border-[#2e86c1]"
      }`}
    >
      {added ? addedLabel : label}
    </button>
  );
}
