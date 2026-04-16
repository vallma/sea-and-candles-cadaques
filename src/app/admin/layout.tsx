import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: "system-ui, sans-serif" }}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-56 bg-slate-900 text-white flex flex-col">
            <div className="px-6 py-6 border-b border-white/10">
              <p className="text-xs tracking-widest text-slate-400 uppercase">Sea & Candles</p>
              <p className="text-sm text-white mt-0.5">Admin Panel</p>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              <Link href="/admin/products"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                🕯️ Productes
              </Link>
              <Link href="/"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                🌊 Veure web
              </Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
