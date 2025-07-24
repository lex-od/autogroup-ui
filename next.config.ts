import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib', 'services', 'stores'],
  },
  
  // 🚀 Оптимизации для разработки / Development optimizations  
  experimental: {
    // Ускоренная компиляция / Faster compilation
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    
    // Быстрый рефреш / Fast refresh
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 🔧 Настройки для улучшения производительности / Performance settings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Оптимизация для development / Development optimization
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },

  // 📊 Отключаем телеметрию / Disable telemetry  
  typescript: {
    // Быстрая проверка типов / Fast type checking
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
