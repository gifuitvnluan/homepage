import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // add static
  output: 'export',
  basePath: isProd ? '/homepage' : '',
  /* config options here */
  // Add remote patterns for next/image
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
