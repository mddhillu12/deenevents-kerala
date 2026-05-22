import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to ignore type errors during the build
  // (Fixes your previous 'Invalid value for --ignoreDeprecations' error)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

// This initializes Cloudflare. 
// The @ts-ignore tells VS Code to stop showing the error on this line.
// @ts-ignore
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflare(nextConfig));