import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  eslint: {
    dirs: ['app', 'components', 'lib', 'services', 'stores'],
  },
};

export default nextConfig;
