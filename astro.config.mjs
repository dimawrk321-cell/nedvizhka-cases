// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Собственный домен pervyigorod.ru — сайт в КОРНЕ (не в подпапке GitHub Pages).
  // site нужен для sitemap, canonical и абсолютных og-URL; base '/' — корень домена.
  // Привязка домена — файлом public/CNAME (копируется в dist при сборке).
  site: 'https://pervyigorod.ru',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    // Tailwind CSS 4 подключается как Vite-плагин (НЕ через устаревший @astrojs/tailwind)
    plugins: [tailwindcss()],
  },
});
