export interface Promo {
  title: string;
  /** Основной текст акции */
  text: string;
  /** Мелкая приписка с условиями */
  note: string;
  /** Текст кнопки */
  ctaLabel: string;
  /** Якорь кнопки */
  ctaHref: string;
}

export const promo: Promo = {
  title: 'Скидка новым клиентам',
  // TODO: уточнить условия скидки
  text: 'Первая сделка — скидка 30 000–50 000 ₽ на услуги агентства',
  note: 'Скидка применяется при заключении договора. Подробности — на консультации.',
  ctaLabel: 'Получить скидку',
  ctaHref: '#cta',
};
