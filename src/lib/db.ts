import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient | undefined;

const initializePrisma = () => {
  try {
    if (process.env.NODE_ENV === "production") {
      if (!prismaInstance) {
        prismaInstance = new PrismaClient();
      }
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient({
          log: ["error"],
        });
      }
      prismaInstance = global.prisma;
    }
  } catch (error) {
    console.error("Failed to initialize Prisma:", error);
  }
  return prismaInstance;
};

const prisma = initializePrisma();

export default prisma as PrismaClient;
