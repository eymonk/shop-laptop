import { showMessage } from './searchMessage/searchMessage';
import app from './app';

type Language = 'en' | 'ru';
type Color = 'blue' | 'синий' | 'gray' | 'серый' | 'black' | 'чёрный' | 'white' | 'белый';

interface Dictionary {
  [key: string]: string;
}

const dictionaryEN: Dictionary = {
  yes: 'да',
  no: 'нет',
  small: 'маленький',
  large: 'большой',
  medium: 'средний',
  white: 'белый',
  blue: 'синий',
  gray: 'серый',
  black: 'чёрный',
};

const dictionaryRU: Dictionary = {
  да: 'yes',
  нет: 'no',
  маленький: 'small',
  большой: 'large',
  средний: 'medium',
  белый: 'white',
  синий: 'blue',
  серый: 'gray',
  чёрный: 'black',
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

function translateCartItem(item: Element, lang: Language) {
  const colorText = item.querySelector('.cart-item__color') as HTMLParagraphElement;
  colorText.textContent = translateWord(colorText.textContent as Color, lang);
}

function translateCards(lang: Language) {
  const cards = document.querySelectorAll('.goods__card');
  cards.forEach((card) => translateCard(card, lang));
}

function translateCartItems(lang: Language) {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => translateCartItem(item, lang));
}

function translateWord(word: string, lang: Language) {
  const result = lang === 'en' ? dictionaryRU[word] : dictionaryEN[word];
  return result ? result : word;
}

function translateCard(card: Element, lang: Language) {
  const stockLabel = card.querySelector('.card__feature-label_in-stock') as HTMLParagraphElement;
  stockLabel.textContent = lang === 'en' ? 'in stock' : 'на складе';
  const yearLabel = card.querySelector('.card__feature-label_release-year') as HTMLParagraphElement;
  yearLabel.textContent = lang === 'en' ? 'release year' : 'год выхода';
  const gamingLabel = card.querySelector('.card__feature-label_gaming') as HTMLParagraphElement;
  gamingLabel.textContent = lang === 'en' ? 'gaming' : 'игровой';
  const popularLabel = card.querySelector('.card__feature-label_popular') as HTMLParagraphElement;
  popularLabel.textContent = lang === 'en' ? 'popular' : 'популярный';
  const colorLabel = card.querySelector('.card__feature-label_color') as HTMLParagraphElement;
  colorLabel.textContent = lang === 'en' ? 'color' : 'цвет';
  const sizeLabel = card.querySelector('.card__feature-label_size') as HTMLParagraphElement;
  sizeLabel.textContent = lang === 'en' ? 'size' : 'размер';
  const btnAddToCart = card.querySelector('.card__btn_add') as HTMLButtonElement;
  btnAddToCart.textContent = lang === 'en' ? 'add to cart' : 'добавить в корзину';
  const colorValue = card.querySelector('.card__feature_color') as HTMLSpanElement;
  colorValue.textContent = translateWord(colorValue.textContent as Color, lang);
  const gamingValue = card.querySelector('.card__feature_gaming') as HTMLSpanElement;
  gamingValue.textContent = translateWord(gamingValue.textContent as string, lang);
  const popularValue = card.querySelector('.card__feature_popular') as HTMLSpanElement;
  popularValue.textContent = translateWord(popularValue.textContent as string, lang);
  const sizeValue = card.querySelector('.card__feature_size') as HTMLSpanElement;
  sizeValue.textContent = translateWord(sizeValue.textContent as string, lang);
}

function translate(lang: Language) {
  if (lang === 'ru') {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.ru));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.ru));
    app.language = 'ru';
  } else {
    nodesToTranslate.forEach((item) => (item.node.textContent = item.en));
    placeholdersToTranslate.forEach((item) => ((item.node as HTMLInputElement).placeholder = item.en));
    app.language = 'en';
  }
  translateCards(lang);
  translateCartItems(lang);
  //to translate system searchMessage
  if (app.currentMessageType) showMessage(app.currentMessageType);
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

addNodeToTranslate(
  document.querySelector('.cart__btn_checkout-open') as HTMLInputElement,
  'checkout',
  'оформить заказ'
);
addNodeToTranslate(document.querySelector('.cart__btn_checkout-close') as HTMLInputElement, 'close', 'закрыть');
addNodeToTranslate(
  document.querySelector('.cart-checkout__text') as HTMLInputElement,
  'Thank you for your time and for visiting this page. If you have any questions or job offers - contact me, please. Have a nice day :)',
  'Спасибо за ваше время и за посещение данной страницы. Если у вас есть какие-либо вопросы или предложения о работе - свяжитесь со мной пожалуйста. Хорошего дня :)'
);

const translateBtn = document.querySelector('.header__btn_translate') as HTMLButtonElement;
translateBtn.addEventListener('click', () => translate(app.language === 'en' ? 'ru' : 'en'));

export default translate;
export { Language, translateCard, translateCards, translateCartItem };
