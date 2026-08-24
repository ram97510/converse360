import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // the .html sources live one level up; scope Turbopack to this app
  turbopack: { root: __dirname },
  // keeps the floating dev badge out of visual-comparison screenshots
  devIndicators: false,
};

export default nextConfig;
