interface nodeToTranslate {
  node: HTMLElement;
  en: string;
  ru: string;
}

const nodesToTranslate: nodeToTranslate[] = [];

function addNodeToTranslate(node: HTMLElement, en: string, ru: string) {
  nodesToTranslate.push({
    node,
    en,
    ru,
  });
}

addNodeToTranslate(
  document.querySelector('.header__subtitle') as HTMLElement,
  'your favourite device is near',
  'твой любимый девайс уже рядом'
);
addNodeToTranslate(document.querySelector('.search__title_search') as HTMLElement, 'search', 'поиск');
addNodeToTranslate(document.querySelector('.search__title_sort-by') as HTMLElement, 'sort by', 'сортировать по');
addNodeToTranslate(
  document.querySelector('.select__option_alphabet-lh') as HTMLElement,
  'alphabet (A - Z)',
  'алфавит (А - Я)'
);
addNodeToTranslate(
  document.querySelector('.select__option_alphabet-hl') as HTMLElement,
  'alphabet (Z- A)',
  'алфавит (Я - А)'
);
addNodeToTranslate(
  document.querySelector('.select__option_year-hl') as HTMLElement,
  'year (2022 - 2014)',
  'год (2022 - 2014)'
);
addNodeToTranslate(
  document.querySelector('.select__option_year-lh') as HTMLElement,
  'year (2014 - 2022)',
  'год (2014 - 2022)'
);
addNodeToTranslate(
  document.querySelector('.select__option_stock-lh') as HTMLElement,
  'stock (1 - 10)',
  'на складе (1 - 10)'
);
addNodeToTranslate(
  document.querySelector('.select__option_stock-hl') as HTMLElement,
  'stock (10 - 1)',
  'на складе (10 - 1)'
);
addNodeToTranslate(document.querySelector('.search__title_in-stock') as HTMLElement, 'in stock', 'на складе');
addNodeToTranslate(document.querySelector('.search__title_release-year') as HTMLElement, 'release year', 'год выпуска');
addNodeToTranslate(document.querySelector('.search__title_brand') as HTMLElement, 'brand', 'бренд');
addNodeToTranslate(document.querySelector('.search__title_colors') as HTMLElement, 'colors', 'цвета');
addNodeToTranslate(document.querySelector('.search__title_size') as HTMLElement, 'size', 'размер');
addNodeToTranslate(
  document.querySelector('.search__title_additional-filters') as HTMLElement,
  'additional filters',
  'дополнительные фильтры'
);
addNodeToTranslate(
  document.querySelector('.checkboxes__title_only-popular') as HTMLElement,
  'only popular',
  'только популярные'
);
addNodeToTranslate(
  document.querySelector('.checkboxes__title_also-gaming-models') as HTMLElement,
  'also gaming models',
  'включая игровые модели'
);
addNodeToTranslate(document.querySelector('.search__controls_reset') as HTMLElement, 'reset', 'сбросить');

[...document.querySelectorAll('.goods__feature_in-stock')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'in stock', 'на складе');
});
[...document.querySelectorAll('.goods__feature_release-year')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'release year', 'год выхода');
});
[...document.querySelectorAll('.goods__feature_size')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'size', 'размер');
});
[...document.querySelectorAll('.goods__feature_color')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'color', 'цвет');
});
[...document.querySelectorAll('.goods__feature_gaming')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'gaming', 'игровой');
});
[...document.querySelectorAll('.goods__feature_popular')].forEach((node) => {
  addNodeToTranslate(node as HTMLElement, 'popular', 'популярный');
});

addNodeToTranslate(document.querySelector('.message__title') as HTMLElement, 'message', 'сообщение');
