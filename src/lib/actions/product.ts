"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = { error?: string; success?: boolean } | null;

export async function createProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string) || 0;
  const category = formData.get("category") as string;
  const burningTime = formData.get("burningTime") ? parseInt(formData.get("burningTime") as string) : undefined;
  const weight = formData.get("weight") ? parseInt(formData.get("weight") as string) : undefined;
  const dimensions = formData.get("dimensions") as string || undefined;
  const active = formData.get("active") === "true";

  const imagesRaw = formData.get("images") as string;
  const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];

  const tagsRaw = formData.get("tags") as string;
  const tags: string[] = tagsRaw ? JSON.parse(tagsRaw) : [];

  const materialsRaw = formData.get("materials") as string;
  const materials: string[] = materialsRaw ? JSON.parse(materialsRaw) : ["Cera de soja", "Jesmonite®"];

  const variantsRaw = formData.get("variants") as string;
  const variants: { scent: string; stock: number }[] = variantsRaw ? JSON.parse(variantsRaw) : [];

  if (!name || !price) return { error: "Nom i preu són obligatoris." };
  if (isNaN(price) || price <= 0) return { error: "El preu ha de ser un número positiu." };

  await prisma.product.create({
    data: {
      name,
      description: description || undefined,
      price,
      stock,
      category: category || undefined,
      burningTime,
      weight,
      dimensions,
      active,
      images,
      tags,
      materials,
      variants: variants.length
        ? { create: variants.map((v) => ({ scent: v.scent, stock: v.stock })) }
        : undefined,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string) || 0;
  const category = formData.get("category") as string;
  const burningTime = formData.get("burningTime") ? parseInt(formData.get("burningTime") as string) : undefined;
  const weight = formData.get("weight") ? parseInt(formData.get("weight") as string) : undefined;
  const dimensions = formData.get("dimensions") as string || undefined;
  const active = formData.get("active") === "true";

  const imagesRaw = formData.get("images") as string;
  const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];
  const tagsRaw = formData.get("tags") as string;
  const tags: string[] = tagsRaw ? JSON.parse(tagsRaw) : [];
  const materialsRaw = formData.get("materials") as string;
  const materials: string[] = materialsRaw ? JSON.parse(materialsRaw) : [];
  const variantsRaw = formData.get("variants") as string;
  const variants: { scent: string; stock: number }[] = variantsRaw ? JSON.parse(variantsRaw) : [];

  if (!name || !price) return { error: "Nom i preu són obligatoris." };

  await prisma.$transaction([
    prisma.productVariant.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        name, description: description || undefined, price, stock, category: category || undefined,
        burningTime, weight, dimensions, active, images, tags, materials,
        variants: variants.length ? { create: variants.map((v) => ({ scent: v.scent, stock: v.stock })) } : undefined,
      },
    }),
  ]);

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
