// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: {
    // Allow remote images from Strapi to be optimized and bundled at build time
    // For development: localhost
    // For production: configure STRAPI_URL environment variable with your production domain
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});