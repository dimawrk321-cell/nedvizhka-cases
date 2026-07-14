/**
 * site.ts — единый источник фактов о бизнесе.
 * Бренд: компания «Первый город», лицо бренда — Дарья Сальникова.
 *   company / companyRole — в шапке и футере;
 *   person / personRole  — в текстах и подписях от лица Дарьи;
 *   legalName            — для реквизитов в футере и privacy (полное ФИО).
 * Любые цифры, которые встречаются в текстах (стаж), берём ТОЛЬКО отсюда через
 * хелперы — чтобы при смене одного значения тексты не рассыпались.
 */

export interface Site {
  /** Название компании — в шапке и футере */
  company: string;
  /** Позиционирование компании (тэглайн под названием) */
  companyRole: string;
  /** Лицо бренда — как в текстах и подписях (Имя Фамилия) */
  person: string;
  /** Роль лица бренда — для подписи */
  personRole: string;
  /** Полное ФИО — для реквизитов и юридических документов */
  legalName: string;
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
  /** Год начала работы (для расчёта стажа) */
  practiceSince: number;
}

export const site: Site = {
  company: 'Первый город',
  companyRole: 'Агентство недвижимости в Москве',
  person: 'Дарья Сальникова',
  personRole: 'Основатель «Первого города»',
  legalName: 'Сальникова Дарья Викторовна',
  phone: '+7 (903) 123-45-67', // TODO: реальный телефон Дарьи
  phoneHref: 'tel:+79031234567', // TODO: реальный телефон Дарьи
  telegram: '@salnikova_realty', // TODO: реальный Telegram Дарьи
  telegramHref: 'https://t.me/salnikova_realty', // TODO: реальный Telegram Дарьи
  whatsappHref: 'https://wa.me/79031234567', // TODO: тот же номер Дарьи
  maxLink: 'https://max.ru/ИМЯ_ИЛИ_ID', // TODO: уточнить реальную ссылку/формат MAX Дарьи
  office: 'Москва, Пресненская наб., 12', // TODO: реальный адрес офиса
  inn: '770100000000', // TODO: реальный ИНН оператора
  practiceSince: 2020, // Дарья в недвижимости с 2020 (отсюда же считается стаж в stats.ts)
};

/**
 * Русское склонение существительного по числу.
 * @param forms [для 1, для 2–4, для 5–20] — например ['год', 'года', 'лет']
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

/** Полных лет на рынке — считается от года начала работы. */
export function experienceYears(): number {
  return new Date().getFullYear() - site.practiceSince;
}
