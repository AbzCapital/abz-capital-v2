import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient | undefined;

const initializePrisma = () => {
  try {
    if (process.env.NODE_ENV === "production") {
      if (!prismaInstance) {
        const url = new URL(process.env.DATABASE_URL!);
        url.searchParams.set("uselibpqcompat", "true");
        const adapter = new PrismaPg({
          connectionString: url.toString(),
        });
        prismaInstance = new PrismaClient({ adapter });
      }
    } else {
      if (!global.prisma) {
        const url = new URL(process.env.DATABASE_URL!);
        url.searchParams.set("uselibpqcompat", "true");
        const adapter = new PrismaPg({
          connectionString: url.toString(),
        });
        global.prisma = new PrismaClient({
          adapter,
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
