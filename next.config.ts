import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const pathBase = process.env.NEXT_PUBLIC_PATH_BASE || ''

const nextConfig: NextConfig = {
  // Add Static
  output: 'export',
  basePath: isProd ? pathBase : '',
  // Add remote patterns for next/image
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
