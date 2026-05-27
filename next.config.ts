import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Externalize Prisma from bundling – it's server-only and shouldn't be bundled
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
