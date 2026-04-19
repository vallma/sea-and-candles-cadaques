"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function Footer() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      setEmail("");
    }
  }

  return (
    <footer
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--rule)",
        paddingTop: 72,
        paddingBottom: 0,
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr",
            gap: 60,
            paddingBottom: 64,
          }}
        >
          {/* Col 1 – Brand story */}
          <div>
            <div
              className="serif"
              style={{ fontSize: 28, color: "var(--ink)", marginBottom: 12 }}
            >
              Sea&amp;Candles
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-soft)",
                lineHeight: 1.75,
                marginBottom: 20,
                maxWidth: 260,
              }}
            >
              Espelmes artesanals fetes a mà a Cadaqués, inspirades en el paisatge de la Costa Brava i elaborades amb cera de soja 100% ecològica.
            </p>
            <div className="mono" style={{ color: "var(--mute)" }}>
              Est. 2024 · Costa Brava
            </div>
          </div>

          {/* Col 2 – Botiga */}
          <div>
            <div
              className="mono"
              style={{ color: "var(--mute)", marginBottom: 20 }}
            >
              Botiga
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href={`/${locale}/products`} className="nav-link">
                Tots els productes
              </Link>
              <Link href={`/${locale}/products?family=marina`} className="nav-link">
                Família Marina
              </Link>
              <Link href={`/${locale}/products?family=floral`} className="nav-link">
                Família Floral
              </Link>
              <Link href={`/${locale}/products?family=herbes`} className="nav-link">
                Família Herbes
              </Link>
            </nav>
          </div>

          {/* Col 3 – Casa */}
          <div>
            <div
              className="mono"
              style={{ color: "var(--mute)", marginBottom: 20 }}
            >
              Casa
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href={`/${locale}/qui-som`} className="nav-link">
                La nostra història
              </Link>
              <Link href={`/${locale}/qui-som#ingredients`} className="nav-link">
                Ingredients
              </Link>
              <Link href={`/${locale}/qui-som#enviaments`} className="nav-link">
                Enviaments
              </Link>
              <Link href={`mailto:sea.andcandles@gmail.com`} className="nav-link">
                Contacte
              </Link>
            </nav>
          </div>

          {/* Col 4 – Newsletter */}
          <div>
            <div
              className="mono"
              style={{ color: "var(--mute)", marginBottom: 20 }}
            >
              Butlletí
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 20 }}>
              Novetats de temporada, noves aromes i històries de la costa.
            </p>
            {sent ? (
              <div className="mono" style={{ color: "var(--sea)" }}>
                Gràcies! Aviat rebràs novetats.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  required
                  placeholder="el.teu@correu.cat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "var(--ink)",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>
                  Subscriure&apos;m
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--rule)",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          maxWidth: 1380,
          margin: "0 auto",
        }}
      >
        <span className="mono" style={{ color: "var(--mute)" }}>
          © 2026 Sea&amp;Candles Cadaqués
        </span>
        <a href="mailto:sea.andcandles@gmail.com" className="nav-link mono" style={{ fontSize: 11 }}>
          sea.andcandles@gmail.com
        </a>
        <span style={{ display: "flex", gap: 16 }}>
          <Link href={`/${locale}/privacitat`} className="nav-link mono" style={{ fontSize: 11 }}>
            Privacitat
          </Link>
          <span className="mono" style={{ color: "var(--rule)", fontSize: 11 }}>·</span>
          <Link href={`/${locale}/termes`} className="nav-link mono" style={{ fontSize: 11 }}>
            Termes
          </Link>
        </span>
      </div>
    </footer>
  );
}
