import { site, slotsLabel } from './site';

export interface FinalCta {
  eyebrow: string;
  heading: string;
  text: string;
  /** Точки доверия рядом с заголовком */
  points: string[];
  /** Текст кнопки формы */
  submitText: string;
  /** Подпись под кнопкой */
  note: string;
}

export const finalCta: FinalCta = {
  eyebrow: 'Бесплатная оценка',
  heading: 'Начнём с бесплатной оценки вашей квартиры',
  points: ['Это ни к чему вас не обязывает', 'Личные данные не передаю третьим лицам'],
  // Числа берём из site.ts: monthlyLimit и freeSlots (через slotsLabel)
  text: `Беру не больше ${site.monthlyLimit} объектов в месяц, чтобы заниматься каждым лично. На текущий месяц свободно ${slotsLabel()}.`,
  submitText: 'Получить бесплатную оценку',
  note: 'Отвечаю в течение часа в рабочее время',
};
