import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Si DATABASE_URL és un placeholder (conté USER o PASSWORD literals), usem la URL local
const envUrl = process.env.DATABASE_URL ?? "";
const DB_URL = envUrl.includes("USER") || envUrl.includes("PASSWORD") || !envUrl
  ? "postgresql://adriavallma@localhost:5432/seaandcandles"
  : envUrl;

function createPrismaClient() {
  const pool = new Pool({ connectionString: DB_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
