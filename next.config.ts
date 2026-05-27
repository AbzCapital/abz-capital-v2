import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore build errors temporarily to unblock deployment
    ignoreBuildErrors: false,
  },
  // Skip ISR/static generation for routes with database
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
