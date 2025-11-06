import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // add static
  output: 'export',
  basePath: isProd ? '/homepage' : '',
  /* config options here */
  // Add remote patterns for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1tomy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
