export const dynamic = "force-dynamic";

import Image from "next/image";
import SeaUrchinCandle from "@/components/ui/SeaUrchinCandle";
import { getTranslations } from "next-intl/server";

export default async function QuiSomPage() {
  const t = await getTranslations("quiSom");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf6ef" }}>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
        style={{ backgroundColor: "#f0e9dc" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <SeaUrchinCandle className="w-96 text-[#3d2b1f]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "#a08060" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
          >
            {t("title")}
          </h1>
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ backgroundColor: "#c4a87a" }}
          />
          <p
            className="text-base sm:text-lg font-light leading-relaxed"
            style={{ color: "#6b4f35" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start gap-12">
            <div className="flex-1">
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-4"
                style={{ color: "#a08060" }}
              >
                {t("originsEyebrow")}
              </p>
              <h2
                className="text-3xl font-light mb-6"
                style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
              >
                {t("originsTitle")}
              </h2>
              <div
                className="w-8 h-px mb-8"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <div
                className="space-y-5 text-sm font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                <p>{t("story1")}</p>
                <p>{t("story2")}</p>
                <p>{t("story3")}</p>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-6 pt-8">
              <Image
                src="/logo.jpg"
                alt="Sea & Candles"
                width={128}
                height={128}
                className="rounded-full object-cover"
                style={{ border: "1px solid #d9ccb2" }}
              />
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-center"
                style={{ color: "#a08060" }}
              >
                {t("madeWithLove")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "#f0e9dc" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{ color: "#a08060" }}
            >
              {t("valuesEyebrow")}
            </p>
            <h2
              className="text-3xl font-light"
              style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
            >
              {t("valuesTitle")}
            </h2>
            <div
              className="w-8 h-px mx-auto mt-6"
              style={{ backgroundColor: "#c4a87a" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Craft */}
            <div
              className="flex flex-col items-center text-center p-8 rounded-sm"
              style={{ backgroundColor: "#e8ddd0" }}
            >
              <div className="mb-5">
                <SeaUrchinCandle className="w-14 text-[#8b6f4a]" />
              </div>
              <h3
                className="text-lg font-light mb-3 tracking-wide"
                style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
              >
                {t("craftTitle")}
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                {t("craftText")}
              </p>
            </div>

            {/* Nature */}
            <div
              className="flex flex-col items-center text-center p-8 rounded-sm"
              style={{ backgroundColor: "#e8ddd0" }}
            >
              <div className="mb-5">
                <SeaUrchinCandle className="w-14 text-[#8b6f4a]" />
              </div>
              <h3
                className="text-lg font-light mb-3 tracking-wide"
                style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
              >
                {t("naturTitle")}
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                {t("naturText")}
              </p>
            </div>

            {/* Cadaqués */}
            <div
              className="flex flex-col items-center text-center p-8 rounded-sm"
              style={{ backgroundColor: "#e8ddd0" }}
            >
              <div className="mb-5">
                <SeaUrchinCandle className="w-14 text-[#8b6f4a]" />
              </div>
              <h3
                className="text-lg font-light mb-3 tracking-wide"
                style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
              >
                {t("cadaquesTitle")}
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                {t("cadaquesText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-4"
            style={{ color: "#a08060" }}
          >
            {t("teamEyebrow")}
          </p>
          <h2
            className="text-3xl font-light mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
          >
            {t("teamTitle")}
          </h2>
          <div
            className="w-8 h-px mx-auto mb-10"
            style={{ backgroundColor: "#c4a87a" }}
          />
          <div
            className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#e8ddd0" }}
          >
            <SeaUrchinCandle className="w-12 text-[#c4a87a]" />
          </div>
          <p
            className="text-sm font-light leading-relaxed mb-6"
            style={{ color: "#6b4f35" }}
          >
            {t("teamText1")}
          </p>
          <p
            className="text-sm font-light leading-relaxed"
            style={{ color: "#6b4f35" }}
          >
            {t("teamText2")}
          </p>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mt-8"
            style={{ color: "#a08060", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            {t("teamSignature")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#f0e9dc" }}
      >
        <div className="max-w-xl mx-auto">
          <SeaUrchinCandle className="w-16 mx-auto mb-8 text-[#c4a87a]" />
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
          >
            {t("ctaTitle")}
          </h2>
          <p
            className="text-sm font-light leading-relaxed mb-10"
            style={{ color: "#6b4f35" }}
          >
            {t("ctaText")}
          </p>
          <a
            href="/products"
            className="inline-block px-10 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: "#8b6f4a",
              color: "#faf6ef",
            }}
          >
            {t("ctaBtn")}
          </a>
        </div>
      </section>
    </div>
  );
}
