import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // add static
  output: 'export',
  basePath: '/homepage',
  /* config options here */
  // Add remote patterns for next/image
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
