import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib', 'services', 'stores'],
  },
};

export default nextConfig;
