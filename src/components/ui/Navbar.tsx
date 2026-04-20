"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import CartBasket from "@/components/ui/CartBasket";
import { useState } from "react";

const LOCALES = ["ca", "es", "en", "fr"] as const;

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const t = useTranslations("navbar");
  const [menuOpen, setMenuOpen] = useState(false);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "color-mix(in oklab, var(--bg) 88%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="nav-inner">
          {/* Left: nav links (desktop only) */}
          <nav className="nav-left" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <Link href={`/${locale}/products`} className="nav-link">
              {t("shop")}
            </Link>
            <Link href={`/${locale}/qui-som`} className="nav-link">
              {t("history")}
            </Link>
          </nav>

          {/* Center: logo */}
          <Link
            href={`/${locale}`}
            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Image
              src="/logo.jpg"
              alt="Sea & Candles"
              width={40}
              height={40}
              className="rounded-full object-cover"
              style={{ border: "1px solid var(--rule)" }}
            />
          </Link>

          {/* Right: locale switcher + cart + hamburger */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 20,
            }}
          >
            {/* Locale switcher — hidden on mobile */}
            <div className="nav-locale-switcher" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {LOCALES.map((l, i) => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => switchLocale(l)}
                    className="nav-link"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: locale === l ? "var(--ink)" : "var(--mute)",
                      borderBottom: locale === l ? "1px solid var(--ink)" : "1px solid transparent",
                      fontWeight: locale === l ? 500 : 400,
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                  {i < LOCALES.length - 1 && (
                    <span style={{ color: "var(--rule)", fontSize: 10 }}>·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              style={{ display: "flex", alignItems: "center", color: "var(--ink-soft)", textDecoration: "none" }}
              aria-label={t("cart")}
            >
              <CartBasket count={totalItems} className="w-10 h-10" />
            </Link>

            {/* Hamburger — mobile only, right side */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              style={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
                width: 36,
                height: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <div style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 1 }} />
              <div style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 1 }} />
              <div style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 1 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ width: 22, height: 1.5, background: "var(--ink)", transform: "rotate(45deg) translate(2.5px, 2.5px)" }} />
            <div style={{ width: 22, height: 1.5, background: "var(--ink)", transform: "rotate(-45deg) translate(2.5px, -2.5px)" }} />
          </button>

          {/* Logo inside overlay */}
          <Link
            href={`/${locale}`}
            onClick={closeMenu}
            style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 56 }}
          >
            <div className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>
              Sea<em style={{ fontWeight: 500 }}>&amp;</em>Candles
            </div>
            <div className="mono" style={{ fontSize: 9, color: "var(--mute)", letterSpacing: "0.22em" }}>
              Cadaqués
            </div>
          </Link>

          {/* Nav links */}
          <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <Link
              href={`/${locale}/products`}
              onClick={closeMenu}
              className="serif"
              style={{ fontSize: 40, color: "var(--ink)", textDecoration: "none", fontStyle: "italic" }}
            >
              {t("shop")}
            </Link>
            <Link
              href={`/${locale}/qui-som`}
              onClick={closeMenu}
              className="serif"
              style={{ fontSize: 40, color: "var(--ink)", textDecoration: "none", fontStyle: "italic" }}
            >
              {t("history")}
            </Link>
            <Link
              href={`/${locale}/cart`}
              onClick={closeMenu}
              className="serif"
              style={{ fontSize: 40, color: "var(--ink)", textDecoration: "none", fontStyle: "italic" }}
            >
              {t("cart")}{totalItems > 0 && ` (${totalItems})`}
            </Link>
          </nav>

          {/* Locale switcher inside overlay */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 56 }}>
            {LOCALES.map((l, i) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button
                  onClick={() => { switchLocale(l); closeMenu(); }}
                  className="nav-link"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: locale === l ? "var(--ink)" : "var(--mute)",
                    borderBottom: locale === l ? "1px solid var(--ink)" : "1px solid transparent",
                    fontWeight: locale === l ? 500 : 400,
                  }}
                >
                  {l.toUpperCase()}
                </button>
                {i < LOCALES.length - 1 && (
                  <span style={{ color: "var(--rule)", fontSize: 10 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
