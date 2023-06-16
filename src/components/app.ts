import { SearchMessage, showMessage } from './searchMessage/searchMessage';
import { DoubleRange, doubleRangeValues } from './search/DoubleRange';
import { cartItemsIds, setupCart } from './cart/cart';
import translate, { Language } from './translator';
import searchFilters from './search/searchFilters';
import SoleCheckbox from './search/SoleCheckbox';
import { createItemCard } from './card/card';
import Checkbox from './search/Checkbox';
import Search from './search/Search';
import Select from './search/Select';
import data from '../assets/goods';

const itemsData = [...data];

interface App {
  currentMessageType: SearchMessage;
  language: 'ru' | 'en';
}

const app: App = {
  language: 'en',
  currentMessageType: null,
};

// RANGES
const ranges: { [key: string]: DoubleRange } = {};

function createRange(name: string, range: doubleRangeValues) {
  const div = document.querySelector(`.search__range_${name}`) as HTMLDivElement;
  const min = document.querySelector(`.search__${name}_min`) as HTMLParagraphElement;
  const max = document.querySelector(`.search__${name}_max`) as HTMLParagraphElement;
  ranges[name] = new DoubleRange(div, range, [min, max]);
}

function saveRangeSettings() {
  Object.keys(ranges).forEach((rangeName) => {
    localStorage.setItem(`${rangeName}`, `${ranges[rangeName].values[0]},${ranges[rangeName].values[1]}`);
  });
}

function loadRanges() {
  const yearRangeValue = localStorage.getItem('year')?.split(',');
  if (yearRangeValue) {
    const min = parseInt(yearRangeValue[0]);
    const max = parseInt(yearRangeValue[1]);
    ranges.year.values = [min, max];
    ranges.year.element.noUiSlider?.setHandle(0, min);
    ranges.year.element.noUiSlider?.setHandle(1, max);
  }

  const stockRangeValue = localStorage.getItem('stock')?.split(',');
  if (stockRangeValue) {
    const min = parseInt(stockRangeValue[0]);
    const max = parseInt(stockRangeValue[1]);
    ranges.stock.values = [min, max];
    ranges.stock.element.noUiSlider?.setHandle(0, min);
    ranges.stock.element.noUiSlider?.setHandle(1, max);
  }
}

// FILTERS
const filters: { [key: string]: { [key: string]: Checkbox } } = {};

function createFilter(name: string) {
  const container = document.querySelector(`.search__${name}`) as HTMLDivElement;
  const wrappers = [...container.querySelectorAll('.checkboxes__item')];
  const checkboxes = [...container.querySelectorAll('.checkboxes__box')];

  filters[name] = {};

  checkboxes.forEach((box, ind) => {
    new Checkbox(name, wrappers[ind], box);
  });
}

function saveFilterSettings() {
  Object.keys(filters).forEach((name) => {
    const filter = filters[name];
    Object.keys(filter).forEach((key) => {
      localStorage.setItem(`filter-${name}-${key}`, `${filter[key].status}`);
    });
  });
}

function loadFilters() {
  Object.keys(filters).forEach((name) => {
    const filter = filters[name];
    Object.keys(filter).forEach((key) => {
      let statusValue: boolean;
      const value = localStorage.getItem(`filter-${name}-${key}`);

      if (value === 'false') {
        statusValue = false;
        filter[key].element.classList.remove('checkboxes__box_active');
      } else {
        statusValue = true;
        filter[key].element.classList.add('checkboxes__box_active');
      }

      filter[key].status = statusValue;
    });
  });
}

// SOLE CHECKBOXES
const soleCheckboxes: { [key: string]: SoleCheckbox } = {};

function createSoleCheckbox(name: string) {
  new SoleCheckbox(name);
}

function saveSoleCheckboxes() {
  Object.keys(soleCheckboxes).forEach((name) => {
    const box = soleCheckboxes[name];
    localStorage.setItem(`sole-checkbox-${name}`, `${box.status}`);
  });
}

function loadSoleCheckboxes() {
  Object.keys(soleCheckboxes).forEach((boxName) => {
    const value = localStorage.getItem(`sole-checkbox-${boxName}`);
    const currentBox = soleCheckboxes[boxName];
    let statusValue = true;

    if (value) {
      if (value === 'false') statusValue = false;
    } else if (boxName === 'popular') statusValue = false;

    if (statusValue) currentBox.element.classList.add('checkboxes__box_active');
    else currentBox.element.classList.remove('checkboxes__box_active');
    currentBox.status = statusValue;
  });
}

// SEARCHES
const searches: { [key: string]: Search } = {};

function createSearch(elementName: string) {
  const input = document.querySelector(`.search_${elementName}`) as HTMLInputElement;
  new Search(input, elementName);
  if (elementName === 'main') input.focus();
}

function loadSearches() {
  const mainSearchValue = localStorage.getItem('search-main');
  if (mainSearchValue) {
    const icon = document.querySelector(`.search_main-icon`) as HTMLImageElement;
    searches.main.value = mainSearchValue;
    searches.main.element.value = mainSearchValue;
    icon.src = 'svg/close.svg';
  }
}

// SELECTS
const selects: { [key: string]: Select } = {};

function createSelect(elementName: string) {
  const select = document.querySelector(`.select_${elementName}`) as HTMLSelectElement;
  new Select(select, elementName);
}

function loadSelects() {
  const sortSelectValue = localStorage.getItem('sort');
  if (sortSelectValue) {
    selects.sort.value = sortSelectValue;
    selects.sort.element.value = sortSelectValue;
  }
}

// APP MANIPULATIONS

function loadSettings() {
  loadSearches();
  loadSelects();
  loadRanges();
  loadFilters();
  loadSoleCheckboxes();
  translate(localStorage.getItem('language') as Language);
  setupCart();
}

function saveSettings() {
  localStorage.setItem(`search-main`, searches.main.value);
  localStorage.setItem(`sort`, selects.sort.value);
  saveRangeSettings();
  saveFilterSettings();
  saveSoleCheckboxes();
  localStorage.setItem(`cartItemsIds`, `${cartItemsIds.slice()}`);
}

function checkMatches() {
  const cards = document.querySelector('.goods') as HTMLDivElement;
  if (!cards.textContent) showMessage('no-matches');
}

function sortData() {
  switch (selects.sort.value) {
    case 'alphabet-hl':
      itemsData.sort((currentItem, nextItem) => {
        let result = 1;
        if (currentItem.brand.toLowerCase() > nextItem.brand.toLowerCase()) result = -1;
        return result;
      });
      break;

    case 'year-hl':
      itemsData.sort((currentItem, nextItem) => nextItem.year - currentItem.year);
      break;

    case 'year-lh':
      itemsData.sort((currentItem, nextItem) => currentItem.year - nextItem.year);
      break;

    case 'stock-hl':
      itemsData.sort((currentItem, nextItem) => nextItem.stock - currentItem.stock);
      break;

    case 'stock-lh':
      itemsData.sort((currentItem, nextItem) => currentItem.stock - nextItem.stock);
      break;

    default:
      itemsData.sort((currentItem, nextItem) => {
        let result = 1;
        if (currentItem.brand.toLowerCase() < nextItem.brand.toLowerCase()) result = -1;
        return result;
      });
  }
}

function draw() {
  const cards = document.querySelector('.goods') as HTMLDivElement;
  cards.textContent = '';
  app.currentMessageType = null;
  sortData();

  itemsData.forEach((item) => {
    let result = true;
    if (!searchFilters.search(item, 'main')) result = false;
    if (!searchFilters.stock(item, ranges.stock.values)) result = false;
    if (!searchFilters.year(item, ranges.year.values)) result = false;
    if (!searchFilters.checkbox(item, 'brand')) result = false;
    if (!searchFilters.checkbox(item, 'color')) result = false;
    if (!searchFilters.checkbox(item, 'size')) result = false;
    if (!searchFilters.soleCheckbox(item, 'gaming', false)) result = false;
    if (!searchFilters.soleCheckbox(item, 'popular', true)) result = false;
    if (result) createItemCard(item);
  });
  checkMatches();
}

export default app;
export {
  createSelect,
  selects,
  createSearch,
  searches,
  createRange,
  ranges,
  createSoleCheckbox,
  soleCheckboxes,
  createFilter,
  filters,
  loadSettings,
  saveSettings,
  draw,
};
