export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import SeaUrchinCandle from "@/components/ui/SeaUrchinCandle";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const [t, locale] = await Promise.all([getTranslations("orders"), getLocale()]);

  const order = session_id
    ? await prisma.order.findUnique({
        where: { stripeSessionId: session_id },
        include: {
          items: {
            include: { product: true },
          },
        },
      })
    : null;

  if (!order) {
    return (
      <main className="min-h-screen bg-[#071d30] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <SeaUrchinCandle className="w-20 text-[#1a5276]" />
        <h1 className="text-white text-2xl font-light" style={{ fontFamily: "Georgia, serif" }}>
          {t("notFound")}
        </h1>
        <Link
          href={`/${locale}`}
          className="px-10 py-3 border border-[#2e86c1]/50 text-[#7fb3d3] text-[10px] tracking-[0.4em] uppercase hover:bg-[#1a5276]/40 hover:text-white transition-all"
        >
          {t("goHome")}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071d30] py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="mb-10">
          <SeaUrchinCandle className="w-20 mx-auto text-[#2e86c1]/60 mb-6" />
          <p className="text-[#3a7ca5] text-[9px] tracking-[0.55em] uppercase mb-3">
            {t("label")}
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-light mb-3"
            style={{ fontFamily: "Georgia, serif" }}>
            {t("title")}
          </h1>
          <p className="text-[#7fb3d3] text-sm font-light">
            {t("subtitle", { email: order.customerEmail })}
          </p>
        </div>

        {/* Order summary */}
        <div className="bg-[#0d2b45] border border-white/5 p-6 text-left space-y-4 mb-8">
          <p className="text-[9px] tracking-[0.4em] text-[#3a7ca5] uppercase">{t("summary")}</p>

          <div className="space-y-3">
            {order.items.map((item: typeof order.items[number]) => (
              <div key={item.id} className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-white text-sm font-light">{item.product.name}</p>
                  <p className="text-[#3a7ca5] text-[10px]">× {item.quantity}</p>
                </div>
                <p className="text-[#a9cce3] text-sm whitespace-nowrap">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between">
            <span className="text-[11px] tracking-widest text-[#7fb3d3] uppercase">{t("total")}</span>
            <span className="text-white text-lg font-light" style={{ fontFamily: "Georgia, serif" }}>
              {order.total.toFixed(2)} €
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}`}
          className="inline-block px-10 py-3.5 border border-[#2e86c1]/40 text-[#7fb3d3] text-[10px] tracking-[0.4em] uppercase hover:bg-[#1a5276]/40 hover:text-white transition-all"
        >
          {t("goHome")}
        </Link>
      </div>
    </main>
  );
}
