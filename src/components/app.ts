import { cartItemsIds, setupCart } from './cart/cart';
import { DoubleRange } from './search/DoubleRange';
import translate, { Language } from './translator';
import SoleCheckbox from './search/SoleCheckbox';
import { Message } from './message/message';
import Checkbox from './search/Checkbox';
import Search from './search/Search';
import Select from './search/Select';

// RANGES
const ranges: { [key: string]: DoubleRange } = {};
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
function loadSelects() {
  const sortSelectValue = localStorage.getItem('sort');
  if (sortSelectValue) {
    selects.sort.value = sortSelectValue;
    selects.sort.element.value = sortSelectValue;
  }
}

function loadSettings() {
  loadSearches();
  loadSelects();
  loadRanges();
  loadFilters();
  loadSoleCheckboxes();
  translate(localStorage.getItem('language') as Language);
  setupCart();
}

interface App {
  currentMessageType: Message;
  language: 'ru' | 'en';
}

const app: App = {
  language: 'en',
  currentMessageType: null,
};

function saveSettings() {
  localStorage.setItem(`search-main`, searches.main.value);
  localStorage.setItem(`sort`, selects.sort.value);
  saveRangeSettings();
  saveFilterSettings();
  saveSoleCheckboxes();
  localStorage.setItem(`cartItemsIds`, `${cartItemsIds.slice()}`);
}

export default app;
export { filters, searches, soleCheckboxes, selects, ranges, saveSettings, loadSettings };
