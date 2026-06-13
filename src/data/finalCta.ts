import { site, slotsLabel } from './site';

export interface FinalCta {
  heading: string;
  text: string;
  /** Текст кнопки формы */
  submitText: string;
  /** Подпись под кнопкой */
  note: string;
}

export const finalCta: FinalCta = {
  heading: 'Начнём с бесплатной оценки вашей квартиры',
  // Числа берём из site.ts: monthlyLimit и freeSlots (через slotsLabel)
  text: `Беру не больше ${site.monthlyLimit} объектов в месяц, чтобы заниматься каждым лично. На текущий месяц свободно ${slotsLabel()}.`,
  submitText: 'Получить бесплатную оценку',
  note: 'Отвечаю в течение часа в рабочее время',
};
