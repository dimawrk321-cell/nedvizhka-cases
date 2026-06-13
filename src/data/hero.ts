import { site } from './site';

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
  eyebrow: 'Частный риелтор в Москве',
  title: 'Продам вашу квартиру за 30–45 дней по реальной цене рынка',
  titleNote: '— или честно скажу, почему сейчас не время продавать',
  // Лимит объектов берём из site.monthlyLimit, не пишем число руками
  subtitle: `Лично веду каждую сделку — от оценки и предпродажной подготовки до передачи ключей. Без помощников и конвейера, поэтому беру не больше ${site.monthlyLimit} объектов в месяц.`,
  formLabel: 'Оставьте заявку — бесплатно оценю вашу квартиру',
  submitText: 'Получить бесплатную оценку',
  secondaryLink: { label: 'Смотреть кейсы', href: '#cases' },
};
