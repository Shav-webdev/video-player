import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repository name is not the root domain, uncomment and set basePath
  // basePath: '/video-player',
  // trailingSlash: true,
};

export default nextConfig;
