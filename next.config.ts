import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    middlewareUseMatcherAsPrefix: true,
  },
};

export default nextConfig;
