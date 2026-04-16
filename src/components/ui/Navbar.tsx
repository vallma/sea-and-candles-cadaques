"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
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
          <Link href={`/${locale}/cart`} className="hover:text-white transition-colors">
            {t("cart").toUpperCase()}
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
