// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: заменить на реальный домен перед публикацией (нужен для sitemap и абсолютных URL)
  site: 'https://example.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    // Tailwind CSS 4 подключается как Vite-плагин (НЕ через устаревший @astrojs/tailwind)
    plugins: [tailwindcss()],
  },
});
