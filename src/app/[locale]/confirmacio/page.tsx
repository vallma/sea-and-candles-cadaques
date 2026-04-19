import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SeaUrchinCandle from "@/components/ui/SeaUrchinCandle";

export const dynamic = "force-dynamic";

export default async function ConfirmacioPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ comanda?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { comanda } = await searchParams;
  const { locale } = await params;

  const order = comanda
    ? await prisma.order.findUnique({
        where: { id: comanda },
        include: { items: { include: { product: true } } },
      })
    : null;

  return (
    <main className="min-h-screen bg-[#faf6ef] flex flex-col items-center justify-center px-6 text-center py-20">
      <SeaUrchinCandle className="w-16 mb-8 text-[#c4a87a]/60" />

      <p className="text-[#a08060] text-[9px] tracking-[0.5em] uppercase mb-4">Comanda rebuda</p>
      <h1 className="text-[#3d2b1f] text-3xl md:text-4xl font-light mb-4"
        style={{ fontFamily: "Georgia, serif" }}>
        Gràcies per la teva compra
      </h1>
      <p className="text-[#6b4f35] text-[13px] leading-relaxed max-w-sm mb-2">
        Hem rebut la teva comanda i ens posarem en contacte aviat.
      </p>
      {order && (
        <p className="text-[#a08060] text-[11px] mb-10">
          Referència: <span className="font-mono text-[#6b4f35]">{order.id.slice(-8).toUpperCase()}</span>
        </p>
      )}

      {/* Resum comanda */}
      {order && order.items.length > 0 && (
        <div className="w-full max-w-md bg-[#f0e9dc] border border-[#e8ddd0] p-6 mb-10 text-left">
          <p className="text-[#a08060] text-[9px] tracking-[0.4em] uppercase mb-4">Resum</p>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="text-[#3d2b1f] font-light">{item.product.name}</p>
                  {Array.isArray(item.selectedOptions) && (item.selectedOptions as {groupName:string;optionValue:string}[]).length > 0 && (
                    <p className="text-[#a08060] text-[10px]">
                      {(item.selectedOptions as {groupName:string;optionValue:string}[]).map((o) => `${o.groupName}: ${o.optionValue}`).join(" · ")}
                    </p>
                  )}
                  <p className="text-[#a08060] text-[10px]">× {item.quantity}</p>
                </div>
                <p className="text-[#6b4f35] font-light">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e8ddd0] mt-4 pt-4 flex justify-between">
            <p className="text-[#a08060] text-[9px] tracking-widest uppercase">Total</p>
            <p className="text-[#3d2b1f] font-light">{order.total.toFixed(2)} €</p>
          </div>
        </div>
      )}

      <Link href={`/${locale}/products`}
        className="px-10 py-3 border border-[#c4a87a]/50 text-[#8b6f4a] text-[9px] tracking-[0.4em] uppercase hover:bg-[#8b6f4a]/10 transition-all duration-300">
        Continuar comprant
      </Link>
    </main>
  );
}
