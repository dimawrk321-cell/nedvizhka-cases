/**
 * site.ts — единый источник фактов о бизнесе.
 * Бренд: компания «Первый город». Тексты сайта написаны от лица риелтора Дарьи Сальниковой.
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
  /** Ссылка на мессенджер MAX */
  maxLink: string;
  /** Адрес офиса */
  office: string;
  /** Ссылка на карту офиса (Яндекс.Карты) — квадратные скобки в URL закодированы */
  mapHref: string;
  /** ИНН */
  inn: string;
  /** Год начала работы (для расчёта стажа) */
  practiceSince: number;
}

export const site: Site = {
  company: 'Первый город',
  companyRole: 'Агентство недвижимости в Москве и области',
  person: 'Дарья Сальникова',
  personRole: 'Риелтор',
  legalName: 'Сальникова Дарья Викторовна',
  phone: '+7 (903) 123-45-67', // TODO: реальный телефон Дарьи
  phoneHref: 'tel:+79031234567', // TODO: реальный телефон Дарьи
  telegram: '@moneymarketdaria',
  telegramHref: 'https://t.me/moneymarketdaria',
  maxLink: 'https://max.ru/ИМЯ_ИЛИ_ID', // TODO: уточнить реальную ссылку/формат MAX Дарьи
  office: 'Ленинградский проспект, 26к1, Москва',
  // Яндекс.Карты: квадратные скобки закодированы (%5B / %5D), иначе href в HTML ломается
  mapHref:
    'https://yandex.ru/maps?whatshere%5Bpoint%5D=37.572854225207536,55.78301769778434&whatshere%5Bzoom%5D=17.8&ll=37.572854,55.783018&z=17.8',
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
