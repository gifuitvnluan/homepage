import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
