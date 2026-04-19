import { prisma } from "@/lib/prisma";
import UpdateOrderStatus from "@/components/admin/UpdateOrderStatus";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:   { label: "Pendent",   color: "bg-amber-50 text-amber-600" },
  PAID:      { label: "Pagat",     color: "bg-blue-50 text-blue-600" },
  SHIPPED:   { label: "Enviat",    color: "bg-purple-50 text-purple-600" },
  DELIVERED: { label: "Entregat",  color: "bg-green-50 text-green-600" },
  CANCELLED: { label: "Cancel·lat", color: "bg-slate-100 text-slate-400" },
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-slate-800">Comandes</h1>
        <p className="text-sm text-slate-400 mt-1">{orders.length} comandes en total</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-sm">Encara no hi ha comandes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const s = STATUS_LABELS[order.status] ?? STATUS_LABELS.PENDING;
            return (
              <div key={order.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                {/* Capçalera */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs font-mono text-slate-500">#{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm font-medium text-slate-800">{order.customerEmail}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-sm font-medium text-slate-800">{order.total.toFixed(2)} €</p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString("ca-ES", {
                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                    <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
                  </div>
                </div>

                {/* Ítems */}
                <div className="px-6 py-3 divide-y divide-slate-50">
                  {order.items.map((item) => {
                    const opts = Array.isArray(item.selectedOptions)
                      ? (item.selectedOptions as { groupName: string; optionValue: string }[])
                      : [];
                    return (
                      <div key={item.id} className="py-2.5 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          {item.product.images[0] && (
                            <img src={item.product.images[0]} alt={item.product.name}
                              className="w-8 h-8 object-cover rounded border border-slate-100" />
                          )}
                          <div>
                            <p className="text-slate-700 font-light">{item.product.name}</p>
                            {opts.length > 0 && (
                              <p className="text-xs text-slate-400">
                                {opts.map((o) => `${o.groupName}: ${o.optionValue}`).join(" · ")}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-600">× {item.quantity}</p>
                          <p className="text-xs text-slate-400">{(item.price * item.quantity).toFixed(2)} €</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
