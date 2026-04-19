"use client";

import { useCart } from "@/lib/cart-context";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!email.trim()) { setError(t("emailRequired")); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });

      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? t("checkoutError"));
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("checkoutError"));
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#071d30] flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-6xl">🕯️</p>
        <h1 className="text-white text-2xl font-light tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
          {t("empty")}
        </h1>
        <Link
          href={`/${locale}/products`}
          className="px-10 py-3 border border-[#2e86c1]/50 text-[#7fb3d3] text-[10px] tracking-[0.4em] uppercase hover:bg-[#1a5276]/40 hover:text-white transition-all"
        >
          {t("goShop")}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071d30] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#3a7ca5] text-[9px] tracking-[0.55em] uppercase mb-3">{t("label")}</p>
          <h1 className="text-white text-3xl font-light" style={{ fontFamily: "Georgia, serif" }}>
            {t("title")}
          </h1>
        </div>

        {/* Items */}
        <div className="space-y-4 mb-10">
          {items.map((item) => (
            <div key={item.cartKey} className="flex gap-4 bg-[#0d2b45] border border-white/5 p-4">
              {/* Image */}
              <div className="relative w-20 h-20 flex-shrink-0 bg-[#071d30]">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🕯️</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-light" style={{ fontFamily: "Georgia, serif" }}>
                  {item.name}
                </p>
                {item.selectedOptions.length > 0 && (
                  <p className="text-[#3a7ca5] text-[10px] mt-0.5">
                    {item.selectedOptions.map((o) => `${o.groupName}: ${o.optionValue}`).join(" · ")}
                  </p>
                )}
                <p className="text-[#a9cce3] text-sm mt-1">{item.price.toFixed(2)} €</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                  className="w-7 h-7 border border-white/20 text-[#a9cce3] hover:border-[#2e86c1] hover:text-white transition-colors text-sm"
                >
                  −
                </button>
                <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                  className="w-7 h-7 border border-white/20 text-[#a9cce3] hover:border-[#2e86c1] hover:text-white transition-colors text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.cartKey)}
                  className="ml-2 text-[#3a7ca5] hover:text-red-400 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary + Checkout */}
        <div className="bg-[#0d2b45] border border-white/5 p-6 space-y-5">
          <div className="flex justify-between items-center text-white">
            <span className="text-[11px] tracking-widest uppercase text-[#7fb3d3]">{t("total")}</span>
            <span className="text-xl font-light" style={{ fontFamily: "Georgia, serif" }}>
              {total.toFixed(2)} €
            </span>
          </div>

          <div className="border-t border-white/10 pt-5 space-y-3">
            <label className="block text-[9px] tracking-[0.4em] text-[#3a7ca5] uppercase">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#071d30] border border-white/20 px-4 py-3 text-white text-sm placeholder-[#3a7ca5] focus:outline-none focus:border-[#2e86c1] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[11px] tracking-wide">{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 bg-[#1a5276] text-white text-[10px] tracking-[0.4em] uppercase hover:bg-[#2e86c1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? t("processing") : t("checkout")}
          </button>

          <button
            onClick={clearCart}
            className="w-full py-2 text-[9px] tracking-widest text-[#3a7ca5] hover:text-red-400 uppercase transition-colors"
          >
            {t("clear")}
          </button>
        </div>

        {/* Continue shopping */}
        <div className="text-center mt-8">
          <Link
            href={`/${locale}/products`}
            className="text-[10px] tracking-[0.35em] text-[#3a7ca5] uppercase hover:text-[#7fb3d3] transition-colors"
          >
            ← {t("continueShopping")}
          </Link>
        </div>
      </div>
    </main>
  );
}
