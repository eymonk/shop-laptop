import { showMessage } from './message/message';
import controller from './controller';

type Language = 'en' | 'ru';
type Color = 'blue' | 'синий' | 'gray' | 'серый' | 'black' | 'чёрный' | 'white' | 'белый';
interface ColorsDictionary {
  [key: string]: Color;
}

interface Dictionary {
  [key: string]: string;
}

const colorsDictionary: ColorsDictionary = {
  white: 'белый',
  белый: 'white',
  blue: 'синий',
  синий: 'blue',
  gray: 'серый',
  серый: 'gray',
  black: 'чёрный',
  чёрный: 'black',
};

const dictionary: Dictionary = {
  yes: 'да',
  да: 'yes',
  no: 'нет',
  нет: 'no',
  маленький: 'small',
  small: 'маленький',
  large: 'большой',
  большой: 'large',
  medium: 'средний',
  средний: 'medium',
};

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

function translateCard(card: Element) {
  const stockLabel = card.querySelector('.goods__feature-label_in-stock') as HTMLParagraphElement;
  stockLabel.textContent = controller.language === 'en' ? 'in stock' : 'на складе';
  const yearLabel = card.querySelector('.goods__feature-label_release-year') as HTMLParagraphElement;
  yearLabel.textContent = controller.language === 'en' ? 'release year' : 'год выхода';
  const gamingLabel = card.querySelector('.goods__feature-label_gaming') as HTMLParagraphElement;
  gamingLabel.textContent = controller.language === 'en' ? 'gaming' : 'игровой';
  const popularLabel = card.querySelector('.goods__feature-label_popular') as HTMLParagraphElement;
  popularLabel.textContent = controller.language === 'en' ? 'popular' : 'популярный';
  const colorLabel = card.querySelector('.goods__feature-label_color') as HTMLParagraphElement;
  colorLabel.textContent = controller.language === 'en' ? 'color' : 'цвет';
  const sizeLabel = card.querySelector('.goods__feature-label_size') as HTMLParagraphElement;
  sizeLabel.textContent = controller.language === 'en' ? 'size' : 'размер';
  const btnAddToCart = card.querySelector('.goods__btn_add') as HTMLButtonElement;
  btnAddToCart.textContent = controller.language === 'en' ? 'add to cart' : 'добавить в корзину';
  const colorValue = card.querySelector('.goods__feature_color') as HTMLSpanElement;
  colorValue.textContent = translateColor(colorValue.textContent as Color);
  const gamingValue = card.querySelector('.goods__feature_gaming') as HTMLSpanElement;
  gamingValue.textContent = translateWord(gamingValue.textContent as string);
  const popularValue = card.querySelector('.goods__feature_popular') as HTMLSpanElement;
  popularValue.textContent = translateWord(popularValue.textContent as string);
  const sizeValue = card.querySelector('.goods__feature_size') as HTMLSpanElement;
  sizeValue.textContent = translateWord(sizeValue.textContent as string);
}

function translateCartItem(item: Element) {
  const colorText = item.querySelector('.cart-item__color') as HTMLParagraphElement;
  colorText.textContent = translateColor(colorText.textContent as Color);
}

function translateCards() {
  const cards = document.querySelectorAll('.goods__card');
  cards.forEach((card) => translateCard(card));
}

function translateCartItems() {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => translateCartItem(item));
}

function translateWord(word: string) {
  const result = dictionary[word];
  return result ? result : word;
}

function translateColor(color: Color) {
  const result = colorsDictionary[color];
  return result ? result : color;
}

function translate(lang: Language) {
  if (lang === 'en') {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.en));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.en));
    controller.language = 'en';
  } else {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.ru));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.ru));
    controller.language = 'ru';
  }
  translateCards();
  translateCartItems();
  //to translate system message
  if (controller.currentMessageType) showMessage(controller.currentMessageType);
  localStorage.setItem('language', lang);
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

addPlaceholderToTranslate(
  document.querySelector('.search_main') as HTMLInputElement,
  'brand / model',
  'бренд / модель'
);

addNodeToTranslate(document.querySelector('.cart__title') as HTMLInputElement, 'Cart', 'Корзина');
addNodeToTranslate(
  document.querySelector('.cart__counter-text') as HTMLInputElement,
  'items added: ',
  'товаров добавлено:'
);

const translateBtn = document.querySelector('.header__btn_translate') as HTMLButtonElement;
translateBtn.addEventListener('click', () => translate(controller.language === 'en' ? 'ru' : 'en'));

export default translate;
export { Language, translateCard, translateCartItem };
