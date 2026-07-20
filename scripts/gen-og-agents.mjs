// scripts/gen-og-agents.mjs
// Генерирует OG-превью профилей агентов для шеринга в мессенджерах/соцсетях.
// Вертикальное фото вписывается ПО ВЫСОТЕ в холст 1200×630 (соцсети требуют landscape),
// лицо не обрезается; по бокам — фирменный тёмный фон ink (#15191b), у фото тонкая рамка
// brass (#a4845c). Результат — статичные public/og/og-<agent>.jpg (стабильный публичный URL).
// Перезапуск при смене/добавлении фото: node scripts/gen-og-agents.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const ink = { r: 0x15, g: 0x19, b: 0x1b }; // --color-ink
const brass = { r: 0xa4, g: 0x84, b: 0x5c }; // --color-brass
const FRAME = 3; // толщина рамки brass, px

const AGENTS = [
  { src: 'src/assets/daria.jpg', out: 'public/og/og-daria.jpg' },
  { src: 'src/assets/starikov.jpg', out: 'public/og/og-starikov.jpg' },
];

for (const { src, out } of AGENTS) {
  const photo = await sharp(src)
    .resize({ height: H - FRAME * 2 })
    .extend({ top: FRAME, bottom: FRAME, left: FRAME, right: FRAME, background: brass })
    .toBuffer();

  await sharp({ create: { width: W, height: H, channels: 3, background: ink } })
    .composite([{ input: photo, gravity: 'center' }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  console.log(`${out} готов (1200×630)`);
}
