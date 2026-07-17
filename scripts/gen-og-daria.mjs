// scripts/gen-og-daria.mjs
// Генерирует OG-превью профиля Дарьи для шеринга в мессенджерах/соцсетях.
// Вертикальное фото src/assets/daria.jpg вписывается ПО ВЫСОТЕ в холст 1200×630
// (соцсети требуют landscape 1.91:1), лицо не обрезается; по бокам — фирменный тёмный
// фон ink (#15191b), у фото тонкая рамка brass (#a4845c). Результат — статичный файл
// public/og/og-daria.jpg (нужен именно публичный файл со стабильным URL).
// Перезапуск при смене фото: node scripts/gen-og-daria.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const ink = { r: 0x15, g: 0x19, b: 0x1b }; // --color-ink
const brass = { r: 0xa4, g: 0x84, b: 0x5c }; // --color-brass
const FRAME = 3; // толщина рамки brass, px

// Фото по высоте (минус рамка) + тонкая рамка brass
const photo = await sharp('src/assets/daria.jpg')
  .resize({ height: H - FRAME * 2 })
  .extend({ top: FRAME, bottom: FRAME, left: FRAME, right: FRAME, background: brass })
  .toBuffer();

// Холст 1200×630 фоном ink, фото по центру
await sharp({ create: { width: W, height: H, channels: 3, background: ink } })
  .composite([{ input: photo, gravity: 'center' }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og/og-daria.jpg');

console.log('public/og/og-daria.jpg готов (1200×630)');
