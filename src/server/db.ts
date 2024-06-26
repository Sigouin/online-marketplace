import { PrismaClient } from "@prisma/client";
import { env } from "~/env";
import supabase from "./supabaseClient";

const { data, error } = await supabase.from("listings").select("*");
if (error) {
  console.error("error", error);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
