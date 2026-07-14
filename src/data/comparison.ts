export interface ComparisonRow {
  criterion: string;
  diy: string;
  agency: string;
  mine: string;
}

/** Заголовки колонок таблицы сравнения */
export const comparisonColumns = {
  diy: 'Продавать самому',
  agency: 'Через агентство',
  mine: 'Со мной',
} as const;

export const comparisonHeading = {
  eyebrow: 'Сравнение',
  title: 'Три способа продать квартиру',
  recommended: 'рекомендую',
};

export const comparison: ComparisonRow[] = [
  {
    criterion: 'Кто занимается продажей',
    diy: 'Вы сами, в свободное от работы время',
    agency: 'Агент, у которого 20–30 объектов одновременно',
    mine: 'Личный агент, закреплённый за вами',
  },
  {
    criterion: 'Торг с покупателем',
    diy: 'Торгуются с вами — и обычно выигрывают',
    agency: 'Как получится, зависит от загрузки агента',
    mine: 'Веду переговоры я, опираясь на статистику по дому и району',
  },
  {
    criterion: 'Юридическая проверка',
    diy: 'На ваш страх и риск',
    agency: 'Базовая, по регламенту',
    mine: 'На каждом этапе сделки',
  },
  {
    criterion: 'Средний срок продажи',
    diy: 'Месяцы без гарантий',
    agency: 'Как пойдёт',
    mine: '30 дней',
  },
  {
    criterion: 'Мотивация',
    diy: 'Только ваша',
    agency: 'Поток сделок, важен объём',
    mine: 'Процент только с результата',
  },
];
