"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import CartBasket from "@/components/ui/CartBasket";

const LOCALES = ["ca", "es", "en", "fr"] as const;

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const t = useTranslations("navbar");

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          maxWidth: 1600,
          margin: "0 auto",
          padding: "10px 40px",
          height: "auto",
          gap: 32,
        }}
      >
        {/* Left: nav links */}
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
          style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
        >
          <Image
            src="/logo.jpg"
            alt="Sea & Candles"
            width={36}
            height={36}
            className="rounded-full object-cover"
            style={{ border: "1px solid var(--rule)" }}
          />
          <div
            className="serif"
            style={{ fontSize: 16, color: "var(--ink)", letterSpacing: "0.01em", lineHeight: 1 }}
          >
            Sea<em style={{ fontWeight: 500 }}>&amp;</em>Candles
          </div>
          <div
            className="mono"
            style={{ fontSize: 8, color: "var(--mute)", letterSpacing: "0.22em" }}
          >
            Cadaqués
          </div>
        </Link>

        {/* Right: locale switcher + cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 20,
          }}
        >
          {/* Locale switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        </div>
      </div>
    </header>
  );
}
