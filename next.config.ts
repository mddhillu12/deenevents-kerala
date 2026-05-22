/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This bypasses the build-time type errors
    ignoreBuildErrors: true,
  },
};

// Use 'require' instead of 'import' to avoid the "exported member" error
const { withOpenNextCloudflare } = require("@opennextjs/cloudflare");

module.exports = withOpenNextCloudflare(nextConfig);