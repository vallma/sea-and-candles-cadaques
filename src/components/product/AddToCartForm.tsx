"use client";

import { useState } from "react";
import { useCart, CartOption } from "@/lib/cart-context";
import { useRouter, useParams } from "next/navigation";

interface OptionGroup {
  id: string;
  name: string;
  options: { id: string; value: string; stock: number; priceModifier: number }[];
}

interface Props {
  productId: string;
  name: string;
  basePrice: number;
  image: string;
  optionGroups: OptionGroup[];
}

export default function AddToCartForm({ productId, name, basePrice, image, optionGroups }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function selectOption(groupId: string, optionId: string) {
    setSelected((prev) =>
      prev[groupId] === optionId ? { ...prev, [groupId]: "" } : { ...prev, [groupId]: optionId }
    );
  }

  const selectedOptions: CartOption[] = optionGroups.flatMap((g) => {
    const opt = g.options.find((o) => o.id === selected[g.id]);
    if (!opt) return [];
    return [{ groupId: g.id, groupName: g.name, optionId: opt.id, optionValue: opt.value, priceModifier: opt.priceModifier }];
  });

  const extraPrice = selectedOptions.reduce((s, o) => s + o.priceModifier, 0);
  const finalPrice = basePrice + extraPrice;

  function handleAdd() {
    addItem({ productId, name, basePrice, image, selectedOptions });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Preu */}
      <div>
        <span className="serif" style={{ fontSize: 36, color: "var(--ink)" }}>
          {finalPrice.toFixed(2)} €
        </span>
        {extraPrice !== 0 && (
          <span className="mono" style={{ color: "var(--mute)", fontSize: 12, marginLeft: 10 }}>
            ({extraPrice > 0 ? "+" : ""}{extraPrice.toFixed(2)} € per opcions)
          </span>
        )}
      </div>

      {/* Grups d'opcions */}
      {optionGroups.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
          {optionGroups.map((group) => (
            <div key={group.id}>
              <div className="mono eyebrow" style={{ marginBottom: 12 }}>
                {group.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.options.map((opt) => {
                  const isSelected = selected[group.id] === opt.id;
                  const outOfStock = opt.stock === 0;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => !outOfStock && selectOption(group.id, opt.id)}
                      disabled={outOfStock}
                      className={`chip${isSelected ? " active" : ""}`}
                      style={outOfStock ? { opacity: 0.35, cursor: "not-allowed" } : {}}
                    >
                      {opt.value}
                      {opt.priceModifier !== 0 && (
                        <span className="mono" style={{ color: "var(--mute)", marginLeft: 6, fontSize: 10 }}>
                          {opt.priceModifier > 0 ? `+${opt.priceModifier.toFixed(2)}€` : `${opt.priceModifier.toFixed(2)}€`}
                        </span>
                      )}
                      {outOfStock && <span style={{ marginLeft: 6, fontSize: 9 }}>(esgotat)</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantitat */}
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
        <div className="mono eyebrow" style={{ marginBottom: 12 }}>Quantitat</div>
        <div style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", border: "1px solid var(--ink)" }}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{
              width: 44,
              height: 44,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink)",
            }}
          >
            −
          </button>
          <span
            className="serif"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "var(--ink)",
              borderLeft: "1px solid var(--ink)",
              borderRight: "1px solid var(--ink)",
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            style={{
              width: 44,
              height: 44,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink)",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Botons */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleAdd}
          className="btn btn-primary"
          style={{
            flex: 1,
            justifyContent: "center",
            ...(added
              ? { border: "1px solid green", color: "green", background: "transparent" }
              : {}),
          }}
        >
          {added ? "✓ Afegit" : "Afegir al carret"}
        </button>
        <button
          onClick={() => router.push(`/${locale}/cart`)}
          className="btn btn-ghost"
        >
          Carret
        </button>
      </div>
    </div>
  );
}
