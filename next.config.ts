// next.config.ts
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Режим standalone для Docker */
  output: 'standalone',
  
  /* Базовая конфигурация Next.js */
  reactStrictMode: true,
  
  /* Уберите или закомментируйте, если не используете React Compiler */
  // reactCompiler: true, // ← Эта опция экспериментальная, может вызывать ошибки
  
  /* Опции для SCSS модулей */
  sassOptions: {
    includePaths: ["./src"],
  },
  
  /* Оптимизация изображений */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  /* Экспериментальные фичи (опционально) */
  experimental: {
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     }
    //   }
    // }
  },
};

// ТОЛЬКО ОДИН вызов withPayload!
export default withPayload(nextConfig);