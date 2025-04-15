import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable TypeScript strict mode
  typescript: {
    // Handled by the build process
    ignoreBuildErrors: false,
  },
  
  // Disable ESLint during builds if it continues to be problematic
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
