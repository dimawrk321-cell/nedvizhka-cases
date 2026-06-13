// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: заменить USERNAME на ваш логин GitHub (нужен для sitemap и абсолютных URL).
  // Для проектного сайта GitHub Pages адрес имеет вид https://USERNAME.github.io/REPO/
  site: 'https://dimawrk321-cell.github.io',
  // TODO: заменить REPO на имя репозитория GitHub. Слеши с обеих сторон обязательны ('/REPO/').
  base: '/nedvizhka-cases/',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    // Tailwind CSS 4 подключается как Vite-плагин (НЕ через устаревший @astrojs/tailwind)
    plugins: [tailwindcss()],
  },
});
