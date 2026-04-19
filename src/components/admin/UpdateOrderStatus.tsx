"use client";

import { updateOrderStatus } from "@/lib/actions/order";
import { useTransition } from "react";

const STATUSES = [
  { value: "PENDING",   label: "Pendent" },
  { value: "PAID",      label: "Pagat" },
  { value: "SHIPPED",   label: "Enviat" },
  { value: "DELIVERED", label: "Entregat" },
  { value: "CANCELLED", label: "Cancel·lat" },
] as const;

type Status = typeof STATUSES[number]["value"];

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatus}
      disabled={pending}
      onChange={(e) => {
        startTransition(() => {
          updateOrderStatus(orderId, e.target.value as Status);
        });
      }}
      className="text-xs border border-slate-200 text-slate-600 rounded px-2 py-1.5 outline-none hover:border-slate-300 transition-colors disabled:opacity-50 cursor-pointer bg-white"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
