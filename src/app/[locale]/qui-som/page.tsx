export const dynamic = "force-dynamic";

import Image from "next/image";
import SeaUrchinCandle from "@/components/ui/SeaUrchinCandle";

export default function QuiSomPage() {
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
            Cadaqués · Costa Brava · Catalunya
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
          >
            Qui som
          </h1>
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ backgroundColor: "#c4a87a" }}
          />
          <p
            className="text-base sm:text-lg font-light leading-relaxed"
            style={{ color: "#6b4f35" }}
          >
            Espelmes artesanals fetes a mà, al ritme del Mediterrani.
            Inspirades en el mar de Cadaqués, creades amb amor i cera de soja natural.
          </p>
        </div>
      </section>

      {/* La nostra historia */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start gap-12">
            <div className="flex-1">
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-4"
                style={{ color: "#a08060" }}
              >
                Els nostres orígens
              </p>
              <h2
                className="text-3xl font-light mb-6"
                style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
              >
                La nostra història
              </h2>
              <div
                className="w-8 h-px mb-8"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <div
                className="space-y-5 text-sm font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                <p>
                  Sea & Candles va néixer a Cadaqués, un dels pobles més bells de la Costa
                  Brava, arran de la passió per l'artesania i la connexió profunda amb el
                  Mediterrani. El mar sempre ha estat la nostra font d'inspiració: els seus
                  colors, les seves textures, la seva calma.
                </p>
                <p>
                  Tot va començar amb ganes d'aprendre a treballar la cera de soja i les
                  resines de Jesmonita. Hores al taller, proves de colors, aromes que
                  evocaven sal, brisa i pedra. Poc a poc, les espelmes van agafar forma
                  pròpia —formes marines, textures naturals, essències del Mediterrani.
                </p>
                <p>
                  Avui, cada espelma que fem porta el mateix esperit: feta amb cura, sense
                  pressa, amb materials naturals i sostenibles. Perquè creiem que les coses
                  boniques necessiten temps i intenció.
                </p>
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
                Fet amb amor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Els nostres valors */}
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
              El que ens mou
            </p>
            <h2
              className="text-3xl font-light"
              style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
            >
              Els nostres valors
            </h2>
            <div
              className="w-8 h-px mx-auto mt-6"
              style={{ backgroundColor: "#c4a87a" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Artesania */}
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
                Artesania
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                Cada peça és única i feta a mà. Ens prenem el temps necessari per
                garantir la qualitat i el detall que mereix cada espelma. No fem
                producció en massa — fem artesania real.
              </p>
            </div>

            {/* Natura */}
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
                Natura
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                Utilitzem cera de soja natural, mines de cotó i fragàncies
                lliures de substàncies nocives. Respectem el medi ambient en cada
                decisió, des dels materials fins als embalatges.
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
                Cadaqués
              </h3>
              <div
                className="w-6 h-px mx-auto mb-4"
                style={{ backgroundColor: "#c4a87a" }}
              />
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6b4f35" }}
              >
                Som fills del Cap de Creus. El nostre poble, la seva llum, les
                seves cales i el seu caràcter mediterrani impregnen cada creació.
                Cadaqués no és només on vivim — és d'on venim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equip / Fundadora */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-4"
            style={{ color: "#a08060" }}
          >
            Darrere de cada espelma
          </p>
          <h2
            className="text-3xl font-light mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#3d2b1f" }}
          >
            Les nostres mans
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
            Som un projecte petit, fet amb gran estima. Darrere de Sea & Candles
            hi ha una artesana de Cadaqués amb passió per la creativitat manual,
            els aromes naturals i la bellesa de les coses simples.
          </p>
          <p
            className="text-sm font-light leading-relaxed"
            style={{ color: "#6b4f35" }}
          >
            Cada espelma que surte del taller ha passat per les nostres mans, ha
            estat cuidada, olida i aprovada. No existeix cap peça que no hàgim
            gaudit de fer.
          </p>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mt-8"
            style={{ color: "#a08060", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            — Fet amb amor a Cadaqués
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
            Vine a conèixer-nos
          </h2>
          <p
            className="text-sm font-light leading-relaxed mb-10"
            style={{ color: "#6b4f35" }}
          >
            Descobreix les nostres espelmes artesanals i porta una mica de
            Cadaqués a casa teva.
          </p>
          <a
            href="/products"
            className="inline-block px-10 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: "#8b6f4a",
              color: "#faf6ef",
            }}
          >
            Veure la col·lecció
          </a>
        </div>
      </section>
    </div>
  );
}
