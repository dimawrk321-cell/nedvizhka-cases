import { experienceYears, plural, YEAR_FORMS } from './site';

export interface Stat {
  /** Крупное значение (выводится гарнитурой Prata) */
  value: string;
  /** Подпись под значением */
  label: string;
}

export const stats: Stat[] = [
  {
    // Стаж считается из site.practiceSince — число не дублируем строкой
    value: String(experienceYears()),
    label: `${plural(experienceYears(), YEAR_FORMS)} на рынке`,
  },
  { value: '330', label: 'закрытых сделок' },
  { value: '3,3 млрд ₽', label: 'объём проданной недвижимости' },
  { value: '34 дня', label: 'средний срок продажи' },
];
