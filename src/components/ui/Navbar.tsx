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
    // Replace current locale segment in path
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Sea & Candles"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="text-sm tracking-widest font-light text-stone-800 hidden sm:block">
            SEA & CANDLES
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-xs tracking-widest text-stone-600">
          <Link href={`/${locale}/products`} className="hover:text-stone-900 transition-colors">
            {t("products")}
          </Link>
          <Link href={`/${locale}/cart`} className="hover:text-stone-900 transition-colors">
            {t("cart")}
          </Link>
        </nav>

        {/* Locale switcher */}
        <div className="flex items-center gap-2 text-xs tracking-widest text-stone-400">
          {locales.map((l, i) => (
            <span key={l.code} className="flex items-center gap-2">
              <button
                onClick={() => switchLocale(l.code)}
                className={`hover:text-stone-800 transition-colors ${
                  locale === l.code ? "text-stone-800 font-medium" : ""
                }`}
              >
                {l.label}
              </button>
              {i < locales.length - 1 && <span className="text-stone-200">|</span>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
