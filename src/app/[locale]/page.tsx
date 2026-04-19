import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SeaUrchinCandle from "@/components/ui/SeaUrchinCandle";

// Assignació de posts als productes coneguts
const PRODUCTS = [
  { post: "01", key: 0 },
  { post: "02", key: 1 },
  { post: "03", key: 2 },
  { post: "04", key: 3 },
  { post: "05", key: 4 },
  { post: "11", key: 5 },
];

const GALLERY_POSTS = ["06","07","08","09","10","12"];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  const products = t.raw("collection.products") as { name: string; desc: string; tag: string }[];

  return (
    <>
      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#071d30]">

        {/* Erizo silueta fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SeaUrchinCandle className="w-[420px] md:w-[580px] text-white/[0.04]" />
        </div>

        {/* Gradient radial suau */}
        <div className="absolute inset-0 bg-radial-[ellipse_60%_50%_at_50%_60%] from-[#1a5276]/20 to-transparent pointer-events-none" />

        {/* Oles animades */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: 100 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            className="absolute bottom-0 w-[200%] wave" style={{ height: 100 }}>
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1380,35 1440,50 L1440,100 L0,100Z"
              fill="#0d2b45" opacity="0.8" />
          </svg>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none"
            className="absolute bottom-0 w-[200%] wave"
            style={{ height: 65, animationDuration: "9s", animationDirection: "reverse" }}>
            <path d="M0,35 C480,65 960,5 1440,35 L1440,70 L0,70Z"
              fill="#1a5276" opacity="0.35" />
          </svg>
        </div>

        {/* Contingut */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-8">
          <Image
            src="/logo.jpg" alt="Sea & Candles"
            width={80} height={80}
            className="rounded-full mb-10 border border-white/10 object-cover"
            priority
          />

          <p className="text-[#3a7ca5] text-[9px] tracking-[0.55em] uppercase mb-8">
            {t("hero.origin")}
          </p>

          <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-light text-white leading-[0.9] tracking-[0.06em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Sea
          </h1>
          <div className="flex items-center gap-4 my-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#2e86c1]/50" />
            <SeaUrchinCandle className="w-8 text-[#2e86c1]/60" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#2e86c1]/50" />
          </div>
          <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-light text-white leading-[0.9] tracking-[0.06em] mb-8"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Candles
          </h1>

          <p className="text-[#7fb3d3] text-[13px] max-w-[340px] leading-loose font-light mb-3">
            {t("hero.tagline")}
          </p>
          <p className="text-[#3a7ca5] text-[11px] max-w-[300px] leading-relaxed font-light mb-12">
            {t("hero.subtitle")}
          </p>

          <Link href={`/${locale}/products`}
            className="group flex items-center gap-3 px-10 py-3.5 border border-[#2e86c1]/40 text-[#7fb3d3] text-[9px] tracking-[0.45em] uppercase hover:bg-[#1a5276]/40 hover:border-[#2e86c1]/70 hover:text-white transition-all duration-500">
            {t("hero.cta")}
            <span className="text-[#2e86c1] group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. MANIFEST
      ═══════════════════════════════════════ */}
      <section className="bg-[#0d2b45] py-28 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-shrink-0">
            <SeaUrchinCandle className="w-40 md:w-52 text-[#1a5276]" />
          </div>
          <div>
            <p className="text-[#3a7ca5] text-[9px] tracking-[0.5em] uppercase mb-5">
              {t("manifest.label")}
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light leading-snug mb-7 whitespace-pre-line"
              style={{ fontFamily: "Georgia, serif" }}>
              {t("manifest.title")}
            </h2>
            <p className="text-[#7fb3d3] text-[13px] leading-[1.9] font-light">
              {t("manifest.text")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. MATERIALS / VALORS
      ═══════════════════════════════════════ */}
      <section className="bg-[#071d30] py-24 px-6 border-t border-white/5">
        <p className="text-center text-[#3a7ca5] text-[9px] tracking-[0.5em] uppercase mb-16">
          {t("materials.label")}
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {[
            { icon: "🌱", title: t("materials.soja_title"),     text: t("materials.soja_text") },
            { icon: "♻️", title: t("materials.jesmonite_title"), text: t("materials.jesmonite_text") },
            { icon: "🐚", title: t("materials.vegan_title"),    text: t("materials.vegan_text") },
            { icon: "📍", title: t("materials.local_title"),    text: t("materials.local_text") },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-white text-[11px] tracking-[0.2em] uppercase font-light">
                {item.title}
              </h3>
              <p className="text-[#3a7ca5] text-[11px] leading-relaxed font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. COL·LECCIÓ
      ═══════════════════════════════════════ */}
      <section className="bg-[#0d2b45] py-24 px-6">
        <p className="text-center text-[#3a7ca5] text-[9px] tracking-[0.5em] uppercase mb-3">
          {t("collection.label")}
        </p>
        <h2 className="text-center text-white text-2xl md:text-3xl font-light tracking-wide mb-14"
          style={{ fontFamily: "Georgia, serif" }}>
          {t("collection.title")}
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
          {PRODUCTS.map(({ post, key }) => {
            const product = products[key];
            return (
              <div key={post} className="group relative aspect-square overflow-hidden cursor-pointer">
                <Image
                  src={`/images/post-${post}.jpg`}
                  alt={product?.name ?? ""}
                  width={500} height={500}
                  className="object-cover w-full h-full brightness-50 group-hover:brightness-70 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay info */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  {product?.tag && (
                    <span className="self-start text-[8px] tracking-[0.3em] text-[#a9cce3] border border-[#2e86c1]/50 px-2 py-0.5 mb-3 uppercase">
                      {product.tag}
                    </span>
                  )}
                  <h3 className="text-white text-sm font-light tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}>
                    {product?.name}
                  </h3>
                  <p className="text-[#7fb3d3] text-[10px] tracking-wide mt-1">
                    {product?.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/products`}
            className="inline-block px-10 py-3 border border-[#2e86c1]/40 text-[#7fb3d3] text-[9px] tracking-[0.4em] uppercase hover:bg-[#1a5276]/40 hover:text-white transition-all duration-400">
            {t("collection.cta")}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. GALERIA / PROCÉS
      ═══════════════════════════════════════ */}
      <section className="bg-[#071d30] py-20 px-6">
        <p className="text-center text-[#3a7ca5] text-[9px] tracking-[0.5em] uppercase mb-10">
          {t("gallery.label")}
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-1.5">
          {GALLERY_POSTS.map((post) => (
            <div key={post} className="aspect-square overflow-hidden group">
              <Image
                src={`/images/post-${post}.jpg`}
                alt="Sea & Candles"
                width={300} height={300}
                className="object-cover w-full h-full brightness-60 group-hover:brightness-90 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Wave cap avall */}
      <div className="bg-[#071d30]">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full block" style={{ height: 50 }}>
          <path d="M0,25 C480,50 960,0 1440,25 L1440,50 L0,50Z" fill="#fafafa" />
        </svg>
      </div>
    </>
  );
}
