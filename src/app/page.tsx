export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <h1 className="text-5xl font-light tracking-widest text-stone-800 mb-4">
          Sea &amp; Candles
        </h1>
        <p className="text-lg text-stone-500 max-w-md mb-10">
          Velas artesanales inspiradas en el mar. Cada aroma, una historia.
        </p>
        <a
          href="/products"
          className="px-8 py-3 bg-stone-800 text-white text-sm tracking-widest hover:bg-stone-700 transition-colors"
        >
          EXPLORAR COLECCIÓN
        </a>
      </section>

      {/* Featured categories */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {["Oceano", "Brisa", "Tormenta"].map((cat) => (
          <div
            key={cat}
            className="aspect-square bg-stone-200 flex items-end p-6 cursor-pointer hover:bg-stone-300 transition-colors"
          >
            <span className="text-stone-700 font-light tracking-widest text-sm">
              {cat.toUpperCase()}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
