"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/actions/order";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clear } = useCart();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!email.includes("@")) { setError("Introdueix un email vàlid."); return; }
    setLoading(true);
    setError("");
    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        basePrice: item.basePrice,
        quantity: item.quantity,
        selectedOptions: item.selectedOptions.map((o) => ({
          groupName: o.groupName,
          optionValue: o.optionValue,
          priceModifier: o.priceModifier,
        })),
      }));
      const orderId = await createOrder(orderItems, email);
      clear();
      router.push(`/${locale}/confirmacio?comanda=${orderId}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error en processar la comanda.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 500 }}>
          <svg width="44" height="44" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--sea)" strokeWidth="0.8"/>
            <text x="20" y="25" textAnchor="middle" fontFamily="var(--font-cormorant, Cormorant Garamond, serif)" fontSize="16" fill="var(--sea)" fontStyle="italic">S&amp;C</text>
          </svg>
          <div className="mono" style={{ color: "var(--mute)", marginTop: 32, marginBottom: 14 }}>La cistella és buida</div>
          <h1 className="serif" style={{ fontSize: 56, margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>
            Encara no<br/><em style={{ fontWeight: 500 }}>has triat res.</em>
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 24, lineHeight: 1.7 }}>
            Dotze aromes fetes a mà t&apos;esperen a la botiga.
          </p>
          <Link href={`/${locale}/products`} className="btn btn-ghost" style={{ display: "inline-flex", marginTop: 40 }}>
            Explora la botiga →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section style={{ padding: "60px 40px 80px" }}>
        <div className="wrap" style={{ maxWidth: 1100 }}>

          {/* Header */}
          <div className="mono eyebrow" style={{ marginBottom: 14 }}>
            {totalItems} {totalItems === 1 ? "espelma" : "espelmes"}
          </div>
          <h1 className="serif" style={{ fontSize: 72, margin: "0 0 60px", letterSpacing: "-0.02em", lineHeight: 0.95 }}>
            La teva cistella.
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "start" }}>

            {/* LEFT: Items list */}
            <div style={{ borderTop: "1px solid var(--rule)" }}>
              {items.map((item) => {
                const optionExtra = item.selectedOptions.reduce((s, o) => s + o.priceModifier, 0);
                const unitPrice = item.basePrice + optionExtra;
                return (
                  <div key={item.key} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 20, padding: "24px 0", borderBottom: "1px solid var(--rule)", alignItems: "start" }}>
                    {/* Image */}
                    <div style={{ width: 80, aspectRatio: "4/5" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div className="ph" style={{ width: "100%", height: "100%" }} />
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="serif" style={{ fontSize: 22, lineHeight: 1.1 }}>{item.name}</div>
                      {item.selectedOptions.length > 0 && (
                        <div className="mono" style={{ color: "var(--mute)", marginTop: 6 }}>
                          {item.selectedOptions.map(o => `${o.groupName}: ${o.optionValue}`).join(" · ")}
                        </div>
                      )}
                      {/* Qty controls */}
                      <div style={{ display: "flex", border: "1px solid var(--rule)", width: "fit-content", marginTop: 14 }}>
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)} style={{ width: 32, height: 32, cursor: "pointer" }}>–</button>
                        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-jetbrains), monospace", fontSize: 11 }}>{item.quantity}</div>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)} style={{ width: 32, height: 32, cursor: "pointer" }}>+</button>
                      </div>
                    </div>

                    {/* Price + remove */}
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <div className="mono">{(unitPrice * item.quantity).toFixed(2)} €</div>
                      <button onClick={() => removeItem(item.key)} className="mono" style={{ color: "var(--mute)", cursor: "pointer", fontSize: 9 }}>Eliminar</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Summary + email + checkout — sticky */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ border: "1px solid var(--rule)", padding: 32, background: "var(--bg-2)" }}>
                <div className="mono eyebrow" style={{ marginBottom: 24 }}>Resum</div>

                <div style={{ display: "grid", gap: 10, fontSize: 13, paddingBottom: 20, borderBottom: "1px solid var(--rule)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--ink-soft)" }}>Subtotal</span>
                    <span className="mono">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--ink-soft)" }}>Enviament</span>
                    <span className="mono" style={{ color: "var(--mute)" }}>Calculat al confirmar</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "20px 0 28px" }}>
                  <span className="serif" style={{ fontSize: 22 }}>Total</span>
                  <span className="serif" style={{ fontSize: 28 }}>{totalPrice.toFixed(2)} €</span>
                </div>

                {/* Email input */}
                <div className="mono eyebrow" style={{ marginBottom: 10 }}>El teu email</div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="hola@exemple.com"
                  style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "1px solid var(--rule)", color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box" }}
                />
                {error && <p style={{ color: "#c0392b", fontSize: 12, marginBottom: 12 }}>{error}</p>}

                <button onClick={handleCheckout} disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  {loading ? "Processant..." : `Confirmar comanda · ${totalPrice.toFixed(2)} €`}
                </button>
                <Link href={`/${locale}/products`} className="mono" style={{ display: "block", textAlign: "center", marginTop: 16, color: "var(--ink-soft)", cursor: "pointer", fontSize: 10 }}>
                  Continua comprant
                </Link>

                <div className="mono" style={{ color: "var(--mute)", marginTop: 20, fontSize: 9, textAlign: "center" }}>
                  IVA inclòs · Envasos reutilitzables
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
