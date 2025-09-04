import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Add remote patterns for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/1tomy.com/**',
      },
    ],
  },
}

export default nextConfig;
