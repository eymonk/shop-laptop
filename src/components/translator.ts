import app from './app';
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

const placeholdersToTranslate: nodeToTranslate[] = [];
function addPlaceholderToTranslate(node: HTMLElement, en: string, ru: string) {
  placeholdersToTranslate.push({
    node,
    en,
    ru,
  });
}

function translate() {
  if (app.language === 'ru') {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.en));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.en));
    app.language = 'en';
  } else {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.ru));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.ru));
    app.language = 'ru';
  }
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
addNodeToTranslate(document.querySelector('.search__colors-text_black') as HTMLElement, 'black', 'чёрный');
addNodeToTranslate(document.querySelector('.search__colors-text_white') as HTMLElement, 'white', 'белый');
addNodeToTranslate(document.querySelector('.search__colors-text_gray') as HTMLElement, 'gray', 'серый');
addNodeToTranslate(document.querySelector('.search__colors-text_blue') as HTMLElement, 'blue', 'синий');

addNodeToTranslate(document.querySelector('.search__title_size') as HTMLElement, 'size', 'размер');
addNodeToTranslate(
  document.querySelector('.checkboxes__title_small') as HTMLElement,
  'small (12-14")',
  'маленький (12-14")'
);
addNodeToTranslate(
  document.querySelector('.checkboxes__title_medium') as HTMLElement,
  'medium (14-16")',
  'средний (14-16")'
);
addNodeToTranslate(
  document.querySelector('.checkboxes__title_large') as HTMLElement,
  'large (16-18")',
  'большой (16-18")'
);

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

addPlaceholderToTranslate(
  document.querySelector('.search_main') as HTMLInputElement,
  'brand / model',
  'бренд / модель'
);

const translateBtn = document.querySelector('.header__btn_translate') as HTMLButtonElement;
translateBtn.addEventListener('click', translate);
