import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-stone-100">
        <Image
          src="/logo.jpg"
          alt="Sea & Candles logo"
          width={120}
          height={120}
          className="rounded-full mb-8 shadow-md object-cover"
          priority
        />
        <h1 className="text-5xl font-light tracking-widest text-stone-800 mb-4">
          {t("hero_title")}
        </h1>
        <p className="text-lg text-stone-500 max-w-md mb-10 font-light">
          {t("hero_subtitle")}
        </p>
        <Link
          href="/products"
          className="px-10 py-3 bg-stone-800 text-white text-sm tracking-widest hover:bg-stone-700 transition-colors"
        >
          {t("cta")}
        </Link>
      </section>

      {/* Photo grid — últimos posts */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-center text-sm tracking-widest text-stone-400 mb-10 uppercase">
          {t("categories_title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-stone-200">
              <Image
                src={`/images/post-${String(i + 1).padStart(2, "0")}.jpg`}
                alt={`Sea & Candles product ${i + 1}`}
                width={400}
                height={400}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
