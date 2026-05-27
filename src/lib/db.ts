import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient | null = null;

try {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
} catch (error) {
  // Fail silently during build time
  console.warn("Prisma initialization deferred:", error instanceof Error ? error.message : "Unknown error");
}

export default prisma as any;
