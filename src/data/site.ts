/**
 * site.ts — единый источник фактов о бизнесе.
 * Любые цифры, которые встречаются в текстах (стаж, лимит объектов, свободные
 * места), берём ТОЛЬКО отсюда через хелперы — чтобы при смене одного значения
 * тексты не рассыпались.
 */

export interface Site {
  /** Имя специалиста */
  name: string;
  /** Роль / позиционирование */
  role: string;
  /** Телефон в человекочитаемом виде */
  phone: string;
  /** Телефон для атрибута href (tel:) */
  phoneHref: string;
  /** Telegram-ник */
  telegram: string;
  /** Ссылка на Telegram */
  telegramHref: string;
  /** Ссылка на WhatsApp (тот же номер) */
  whatsappHref: string;
  /** Ссылка на мессенджер MAX */
  maxLink: string;
  /** Адрес офиса */
  office: string;
  /** ИНН */
  inn: string;
  /** Год начала практики (для расчёта стажа) */
  practiceSince: number;
  /** Лимит объектов в работе в месяц */
  monthlyLimit: number;
  /** Свободно мест в текущем месяце */
  freeSlots: number;
}

export const site: Site = {
  name: 'Дмитрий Соколов', // TODO: реальное имя
  role: 'Частный риелтор · жилая недвижимость Москвы',
  phone: '+7 (903) 123-45-67', // TODO: реальный телефон
  phoneHref: 'tel:+79031234567', // TODO: реальный телефон
  telegram: '@sokolov_realty', // TODO: реальный Telegram
  telegramHref: 'https://t.me/sokolov_realty', // TODO: реальный Telegram
  whatsappHref: 'https://wa.me/79031234567', // TODO: тот же номер
  maxLink: 'https://max.ru/ИМЯ_ИЛИ_ID', // TODO: уточнить реальную ссылку/формат MAX
  office: 'Москва, Пресненская наб., 12', // TODO: реальный адрес офиса
  inn: '770100000000', // TODO: реальный ИНН
  practiceSince: 2014,
  monthlyLimit: 4,
  freeSlots: 2, // TODO: обновлять в начале каждого месяца
};

/**
 * Русское склонение существительного по числу.
 * @param forms [для 1, для 2–4, для 5–20] — например ['место', 'места', 'мест']
 */
export function plural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

/** Формы склонения слова «год» для стажа — единое объявление на проект. */
export const YEAR_FORMS: [string, string, string] = ['год', 'года', 'лет'];

/** Полных лет на рынке — считается от года начала практики. */
export function experienceYears(): number {
  return new Date().getFullYear() - site.practiceSince;
}

/** Свободные места с правильным словом: «2 места», «1 место», «5 мест». */
export function slotsLabel(n: number = site.freeSlots): string {
  return `${n} ${plural(n, ['место', 'места', 'мест'])}`;
}
