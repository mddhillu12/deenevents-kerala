import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

// This correctly calls the updated dev server function for Cloudflare
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());