import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@prisma/client", "bcryptjs"], // ✅ pindah ke root, bukan experimental
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "irigasibunta.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "192.168.1.106",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
