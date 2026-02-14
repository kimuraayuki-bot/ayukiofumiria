import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prd.storage.lit.link",
      },
    ],
  },
};

export default nextConfig;
