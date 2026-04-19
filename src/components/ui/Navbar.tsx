"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const locales = [
  { code: "ca", label: "CAT" },
  { code: "es", label: "ESP" },
  { code: "en", label: "ENG" },
  { code: "fr", label: "FRA" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0d2b45]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Sea & Candles"
            width={34}
            height={34}
            className="rounded-full object-cover border border-white/20"
          />
          <span className="text-xs tracking-[0.3em] font-light text-white/80 hidden sm:block">
            SEA & CANDLES
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8 text-[11px] tracking-[0.25em] text-[#a9cce3]">
          <Link href={`/${locale}/products`} className="hover:text-white transition-colors">
            {t("products").toUpperCase()}
          </Link>
          <Link href={`/${locale}/cart`} className="relative hover:text-white transition-colors">
            {t("cart").toUpperCase()}
            {itemCount > 0 && (
              <span className="absolute -top-2.5 -right-3.5 bg-[#2e86c1] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Locale switcher */}
        <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#5d9bbf]">
          {locales.map((l, i) => (
            <span key={l.code} className="flex items-center gap-2">
              <button
                onClick={() => switchLocale(l.code)}
                className={`hover:text-white transition-colors ${
                  locale === l.code ? "text-white" : ""
                }`}
              >
                {l.label}
              </button>
              {i < locales.length - 1 && <span className="text-white/10">|</span>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
