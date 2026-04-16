"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = { error?: string } | null;

interface OptionGroupInput {
  name: string;
  options: { value: string; stock: number; priceModifier: number }[];
}

function parseForm(formData: FormData) {
  return {
    name:        (formData.get("name") as string)?.trim(),
    description: (formData.get("description") as string)?.trim() || undefined,
    price:       parseFloat(formData.get("price") as string),
    stock:       parseInt(formData.get("stock") as string) || 0,
    category:    (formData.get("category") as string)?.trim() || undefined,
    active:      formData.get("active") === "true",
    burningTime: formData.get("burningTime") ? parseInt(formData.get("burningTime") as string) : undefined,
    weight:      formData.get("weight") ? parseInt(formData.get("weight") as string) : undefined,
    dimensions:  (formData.get("dimensions") as string)?.trim() || undefined,
    images:      JSON.parse((formData.get("images") as string) || "[]") as string[],
    tags:        JSON.parse((formData.get("tags") as string) || "[]") as string[],
    materials:   JSON.parse((formData.get("materials") as string) || "[]") as string[],
    optionGroups: JSON.parse((formData.get("optionGroups") as string) || "[]") as OptionGroupInput[],
  };
}

export async function createProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const d = parseForm(formData);
  if (!d.name) return { error: "El nom és obligatori." };
  if (isNaN(d.price) || d.price <= 0) return { error: "El preu ha de ser un número positiu." };

  await prisma.product.create({
    data: {
      name: d.name, description: d.description, price: d.price, stock: d.stock,
      category: d.category, active: d.active, burningTime: d.burningTime,
      weight: d.weight, dimensions: d.dimensions, images: d.images,
      tags: d.tags, materials: d.materials,
      optionGroups: d.optionGroups.length ? {
        create: d.optionGroups.map((g, i) => ({
          name: g.name, position: i,
          options: { create: g.options.map((o) => ({ value: o.value, stock: o.stock, priceModifier: o.priceModifier })) },
        })),
      } : undefined,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const d = parseForm(formData);
  if (!d.name) return { error: "El nom és obligatori." };
  if (isNaN(d.price) || d.price <= 0) return { error: "El preu ha de ser un número positiu." };

  // Esborra els grups antics (cascade elimina les opcions)
  await prisma.productOptionGroup.deleteMany({ where: { productId: id } });

  await prisma.product.update({
    where: { id },
    data: {
      name: d.name, description: d.description, price: d.price, stock: d.stock,
      category: d.category, active: d.active, burningTime: d.burningTime,
      weight: d.weight, dimensions: d.dimensions, images: d.images,
      tags: d.tags, materials: d.materials,
      optionGroups: d.optionGroups.length ? {
        create: d.optionGroups.map((g, i) => ({
          name: g.name, position: i,
          options: { create: g.options.map((o) => ({ value: o.value, stock: o.stock, priceModifier: o.priceModifier })) },
        })),
      } : undefined,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
