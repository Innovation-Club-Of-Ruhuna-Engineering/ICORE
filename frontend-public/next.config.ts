import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.theicore.org',
        port: '',
        pathname: '/**',
      }
    ],
    // Increase timeout to handle slower responses from S3
    minimumCacheTTL: 60,
    // Disable optimization for external images
    unoptimized: true,
  },
};

export default nextConfig;

