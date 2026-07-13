/**
 * mortgage.ts — данные секции «Ипотека»: заголовки, значения калькулятора
 * по умолчанию, банки-партнёры и тексты формы заявки.
 */

export interface MortgageDefaults {
  /** Стоимость недвижимости, ₽ */
  price: number;
  /** Первоначальный взнос, % */
  downPaymentPct: number;
  /** Срок кредита, лет */
  termYears: number;
  /** Годовая ставка, % */
  rate: number;
}

export interface MortgageBounds {
  termMin: number;
  termMax: number;
  rateMin: number;
  rateMax: number;
  rateStep: number;
}

export const mortgageHeading = {
  eyebrow: 'Ипотека',
  title: 'Посчитайте платёж и подайте заявку',
  subtitle:
    'Прикиньте ежемесячный платёж по своим цифрам — а я подберу банк с подходящими условиями и помогу собрать документы.',
};

export const mortgageDefaults: MortgageDefaults = {
  price: 12_000_000,
  downPaymentPct: 20,
  termYears: 20,
  rate: 18, // TODO: уточнить актуальную ставку у Дарьи
};

export const mortgageBounds: MortgageBounds = {
  termMin: 1,
  termMax: 30,
  rateMin: 0.1,
  rateMax: 30,
  rateStep: 0.1,
};

export const mortgageForm = {
  heading: 'Подберу банк и подам заявку', // TODO: уточнить формулировку
  note: 'К заявке автоматически приложатся ваши цифры из калькулятора — сразу видно, что вы считали.',
  submitText: 'Отправить заявку на ипотеку',
};

export const mortgageBanksLabel = 'Работаем с банками';

/**
 * Список банков-партнёров. Логотипы банков — товарные знаки; для их размещения
 * нужно разрешение правообладателей, поэтому пока выводим ТЕКСТОВЫЕ названия.
 * TODO: заменить на официальные логотипы, когда получим брендбуки от банков.
 * TODO: уточнить реальный список банков-партнёров.
 */
export const mortgageBanks: string[] = [
  'СберБанк',
  'ВТБ',
  'Альфа-Банк',
  'Т-Банк',
  'Дом.РФ',
  'Райффайзен',
];

/**
 * Имена скрытых полей формы — параметры расчёта, которые заполняет
 * MortgageCalculator и которые Cloud Function выводит в Telegram.
 * Порядок и ключи должны совпадать с MORTGAGE_DETAIL_ORDER в function/index.js.
 */
export const mortgageDetailFields: string[] = [
  'price',
  'downPayment',
  'creditSum',
  'term',
  'rate',
  'paymentType',
  'monthlyPayment',
];
