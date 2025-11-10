import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const pathBase = process.env.NEXT_PUBLIC_PATH_BASE || ''

console.log('isProd:', isProd, process.env.NODE_ENV);

const nextConfig: NextConfig = {
  // add static
  output: 'export',
  basePath: isProd ? pathBase : '',
  /* config options here */
  // Add remote patterns for next/image
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
