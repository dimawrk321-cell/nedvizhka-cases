export interface HeroLink {
  label: string;
  href: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  /** Приписка к заголовку — задаёт честный, не давящий тон */
  titleNote: string;
  subtitle: string;
  /** Подпись над формой заявки */
  formLabel: string;
  /** Текст кнопки формы */
  submitText: string;
  secondaryLink: HeroLink;
}

export const hero: Hero = {
  eyebrow: 'Агентство недвижимости в Москве и области',
  title: 'Продам вашу квартиру за 30 дней по рыночной цене',
  titleNote: '— или подробно расскажу, почему сейчас не время продавать',
  subtitle:
    'Ведём каждую сделку индивидуально: за каждым клиентом закреплён личный агент, сопровождение от оценки до передачи ключей.',
  formLabel: 'Оставьте заявку — бесплатно оценю вашу квартиру',
  submitText: 'Получить бесплатную оценку',
  secondaryLink: { label: 'Наши агенты', href: '#agents' },
};
