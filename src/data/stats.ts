import { experienceYears, plural, YEAR_FORMS } from './site';

export interface Stat {
  /** Крупное значение (выводится гарнитурой Prata) */
  value: string;
  /** Подпись под значением */
  label: string;
}

export const stats = [];
