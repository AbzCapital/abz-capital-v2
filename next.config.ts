import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Externalize Prisma from bundling – it's server-only and shouldn't be bundled
  serverExternalPackages: ["@prisma/client", "prisma"],
  // Allow images from Unsplash for product cards
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
