import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // add static
  output: 'export',
  basePath: '',
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
