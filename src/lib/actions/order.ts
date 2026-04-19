"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CartItemInput {
  productId: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedOptions: { groupName: string; optionValue: string; priceModifier: number }[];
}

export async function createOrder(items: CartItemInput[], customerEmail: string) {
  if (!items.length) throw new Error("El carret és buit");
  if (!customerEmail?.includes("@")) throw new Error("Email invàlid");

  const total = items.reduce((sum, item) => {
    const extra = item.selectedOptions.reduce((s, o) => s + o.priceModifier, 0);
    return sum + (item.basePrice + extra) * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      customerEmail,
      total,
      status: "PENDING",
      items: {
        create: items.map((item) => {
          const extra = item.selectedOptions.reduce((s, o) => s + o.priceModifier, 0);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.basePrice + extra,
            selectedOptions: item.selectedOptions,
          };
        }),
      },
    },
  });

  revalidatePath("/admin/orders");
  return order.id;
}

export async function updateOrderStatus(id: string, status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}
