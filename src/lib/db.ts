import { PrismaClient } from "@prisma/client";
import { PgAdapter } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient | undefined;

const initializePrisma = () => {
  try {
    if (process.env.NODE_ENV === "production") {
      if (!prismaInstance) {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PgAdapter(pool);
        prismaInstance = new PrismaClient({ adapter });
      }
    } else {
      if (!global.prisma) {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PgAdapter(pool);
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
