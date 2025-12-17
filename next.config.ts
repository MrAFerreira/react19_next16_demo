import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    biweekly: {
      stale: 60 * 60 * 24 * 14,
      revalidate: 60 * 60,
      expire: 60 * 60 * 24 * 30,
    },
    products: {
      stale: 60 * 60 * 24 * 14,
      revalidate: 60 * 60,
      expire: 60 * 60 * 24,
    },
  },
};

export default nextConfig;
