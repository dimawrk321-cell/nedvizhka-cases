// src/data/documents.ts
// Типовые шаблоны документов для скачивания. Файлы .docx лежат в public/documents/.
// Ссылка на файл строится как `${BASE_URL}documents/<file>`.

export interface DocTemplate {
  title: string;   // отображаемое название
  file: string;    // имя файла в public/documents/
}

export interface DocCategory {
  id: string;      // якорь/ключ категории
  title: string;   // заголовок категории
  items: DocTemplate[];
}

export const documentsHeading = {
  eyebrow: 'Шаблоны документов',
  title: 'Типовые документы для сделок',
  subtitle:
    'Готовые шаблоны договоров, актов и расписок для сделок с недвижимостью. Скачивайте бесплатно. Это типовые формы — перед подписанием рекомендуем сверить условия с вашим агентом.',
};

export const documentCategories: DocCategory[] = [
  {
    id: 'kvartira',
    title: 'Купля-продажа квартиры',
    items: [
      { title: 'Договор купли-продажи', file: 'kvartira-dogovor-kupli-prodazhi.docx' },
      { title: 'Предварительный договор', file: 'kvartira-predvaritelnyi-dogovor.docx' },
      { title: 'Акт приёма-передачи', file: 'kvartira-akt-priema-peredachi.docx' },
      { title: 'Расписка о получении денег', file: 'kvartira-raspiska.docx' },
    ],
  },
  {
    id: 'komnata',
    title: 'Комната',
    items: [
      { title: 'Договор купли-продажи', file: 'komnata-dogovor-kupli-prodazhi.docx' },
      { title: 'Предварительный договор', file: 'komnata-predvaritelnyi-dogovor.docx' },
      { title: 'Извещение сособственников', file: 'komnata-izveshchenie.docx' },
      { title: 'Акт приёма-передачи', file: 'komnata-akt-priema-peredachi.docx' },
      { title: 'Расписка о получении денег', file: 'komnata-raspiska.docx' },
    ],
  },
  {
    id: 'dolya',
    title: 'Доля в праве собственности',
    items: [
      { title: 'Договор купли-продажи доли', file: 'dolya-dogovor-kupli-prodazhi.docx' },
      { title: 'Предварительный договор', file: 'dolya-predvaritelnyi-dogovor.docx' },
      { title: 'Извещение сособственников', file: 'dolya-izveshchenie.docx' },
      { title: 'Соглашение о порядке пользования', file: 'dolya-soglashenie-o-polzovanii.docx' },
      { title: 'Акт приёма-передачи', file: 'dolya-akt-priema-peredachi.docx' },
      { title: 'Расписка о получении денег', file: 'dolya-raspiska.docx' },
    ],
  },
  {
    id: 'naim',
    title: 'Наём жилья (аренда)',
    items: [
      { title: 'Договор найма', file: 'naim-dogovor.docx' },
      { title: 'Акт от собственника', file: 'naim-akt-ot-sobstvennika.docx' },
      { title: 'Акт от нанимателя', file: 'naim-akt-ot-nanimatelya.docx' },
      { title: 'Расписка о получении оплаты', file: 'naim-raspiska.docx' },
    ],
  },
  {
    id: 'zemlya',
    title: 'Земля и постройки',
    items: [
      { title: 'Акт приёма-передачи', file: 'zemlya-akt-priema-peredachi.docx' },
      { title: 'Расписка о получении денег', file: 'zemlya-raspiska.docx' },
    ],
  },
  {
    id: 'darenie-renta',
    title: 'Дарение и рента',
    items: [
      { title: 'Договор дарения', file: 'darenie-dogovor.docx' },
      { title: 'Акт приёма-передачи (дарение)', file: 'darenie-akt-priema-peredachi.docx' },
      { title: 'Договор ренты', file: 'renta-dogovor.docx' },
    ],
  },
  {
    id: 'agentskie',
    title: 'Агентские и доверительные',
    items: [
      { title: 'Агентский договор — поиск покупателя', file: 'agentskiy-poisk-pokupatelya.docx' },
      { title: 'Агентский договор — поиск объекта', file: 'agentskiy-poisk-obekta.docx' },
      { title: 'Агентский договор — поиск объекта для найма', file: 'agentskiy-naim-poisk-obekta.docx' },
      { title: 'Агентский договор — поиск нанимателя', file: 'agentskiy-poisk-nanimatelya.docx' },
      { title: 'Договор доверительного управления', file: 'doveritelnoe-upravlenie-dogovor.docx' },
      { title: 'Акт к доверительному управлению', file: 'doveritelnoe-upravlenie-akt.docx' },
    ],
  },
];
