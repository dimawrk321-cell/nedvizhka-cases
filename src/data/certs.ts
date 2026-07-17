/**
 * certs.ts — сертификаты и дипломы для профиля агента (/agents/<slug>/).
 * Скан-документы лежат в src/assets/certs/ и подключаются через astro:assets
 * (оптимизируются в webp/avif на сборке). Список легко расширять — добавьте
 * элемент в массив; год необязателен (например, у диплома Metr.Club его нет).
 */
import type { ImageMetadata } from 'astro';
import certNovostroyki from '../assets/certs/cert-novostroyki.jpg';
import certReso from '../assets/certs/cert-reso.jpg';
import certVtb from '../assets/certs/cert-vtb.jpg';
import certMetrclub from '../assets/certs/cert-metrclub.jpg';

export interface Certificate {
  /** Скан сертификата/диплома (astro:assets) */
  image: ImageMetadata;
  /** Название документа — подпись под миниатюрой */
  title: string;
  /** Год выдачи; необязателен */
  year?: string;
}

export const certsHeading = {
  eyebrow: 'Квалификация',
  title: 'Сертификаты и дипломы',
};

export const certificates: Certificate[] = [
  { image: certMetrclub, title: 'Диплом партнёра ипотечного агрегатора Metr.Club' },
  { image: certNovostroyki, title: 'Школа по новостройкам и ипотеке', year: '2024' },
  { image: certReso, title: 'РЕСО-Гарантия — курс страхового агента', year: '2021' },
  { image: certVtb, title: 'ВТБ24 — обучение по продуктам банка', year: '2012' },
];
