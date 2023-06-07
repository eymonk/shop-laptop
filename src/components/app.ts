import { cartItemsIds, setupCart } from './cart/cart';
import { DoubleRange } from './search/DoubleRange';
import translate, { Language } from './translator';
import SoleCheckbox from './search/SoleCheckbox';
import { Message } from './message/message';
import Checkbox from './search/Checkbox';
import Search from './search/Search';
import Select from './search/Select';

interface App {
  currentMessageType: Message;
  language: 'ru' | 'en';
  searches: { [key: string]: Search };
  ranges: { [key: string]: DoubleRange };
  filters: { [key: string]: { [key: string]: Checkbox } };
  soleCheckboxes: { [key: string]: SoleCheckbox };
  selects: { [key: string]: Select };
  elements: { [key: string]: Element };

  saveRangeSettings: () => void;
  saveFilterSettings: () => void;
  saveSoleCheckboxes: () => void;
  loadSettings: () => void;
}

const app: App = {
  language: 'en',
  currentMessageType: null,
  searches: {},
  ranges: {},
  filters: {},
  soleCheckboxes: {},
  selects: {},
  elements: {
    cart: document.querySelector('.header__link_cart') as HTMLElement,
    goods: document.querySelector('.goods') as HTMLElement,
  },

  saveRangeSettings() {
    Object.keys(this.ranges).forEach((rangeName) => {
      localStorage.setItem(`${rangeName}`, `${this.ranges[rangeName].values[0]},${this.ranges[rangeName].values[1]}`);
    });
  },

  saveFilterSettings() {
    Object.keys(this.filters).forEach((name) => {
      const filter = this.filters[name];
      Object.keys(filter).forEach((key) => {
        localStorage.setItem(`filter-${name}-${key}`, `${filter[key].status}`);
      });
    });
  },

  saveSoleCheckboxes() {
    Object.keys(this.soleCheckboxes).forEach((name) => {
      const box = this.soleCheckboxes[name];
      localStorage.setItem(`sole-checkbox-${name}`, `${box.status}`);
    });
  },

  loadSettings() {
    setupCart();
    //search
    const mainSearchValue = localStorage.getItem('search-main');
    if (mainSearchValue) {
      const icon = document.querySelector(`.search_main-icon`) as HTMLImageElement;
      this.searches.main.value = mainSearchValue;
      this.searches.main.element.value = mainSearchValue;
      icon.src = 'svg/close.svg';
    }

    //select
    const sortSelectValue = localStorage.getItem('sort');
    if (sortSelectValue) {
      this.selects.sort.value = sortSelectValue;
      this.selects.sort.element.value = sortSelectValue;
    }

    //ranges
    const yearRangeValue = localStorage.getItem('year')?.split(',');
    if (yearRangeValue) {
      const min = parseInt(yearRangeValue[0]);
      const max = parseInt(yearRangeValue[1]);
      this.ranges.year.values = [min, max];
      this.ranges.year.element.noUiSlider?.setHandle(0, min);
      this.ranges.year.element.noUiSlider?.setHandle(1, max);
    }

    const stockRangeValue = localStorage.getItem('stock')?.split(',');
    if (stockRangeValue) {
      const min = parseInt(stockRangeValue[0]);
      const max = parseInt(stockRangeValue[1]);
      this.ranges.stock.values = [min, max];
      this.ranges.stock.element.noUiSlider?.setHandle(0, min);
      this.ranges.stock.element.noUiSlider?.setHandle(1, max);
    }

    //filters
    Object.keys(this.filters).forEach((name) => {
      const filter = this.filters[name];
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

    //soleCheckboxes
    Object.keys(this.soleCheckboxes).forEach((boxName) => {
      const value = localStorage.getItem(`sole-checkbox-${boxName}`);
      const currentBox = this.soleCheckboxes[boxName];
      let statusValue = true;

      if (value) {
        if (value === 'false') statusValue = false;
      } else if (boxName === 'popular') statusValue = false;

      if (statusValue) currentBox.element.classList.add('checkboxes__box_active');
      else currentBox.element.classList.remove('checkboxes__box_active');
      currentBox.status = statusValue;
    });
    //language
    translate(localStorage.getItem('language') as Language);
  },
};

function saveSettings() {
  localStorage.setItem(`search-main`, app.searches.main.value);
  localStorage.setItem(`sort`, app.selects.sort.value);
  app.saveRangeSettings();
  app.saveFilterSettings();
  app.saveSoleCheckboxes();
  localStorage.setItem(`cartItemsIds`, `${cartItemsIds.slice()}`);
}

export default app;
export { saveSettings };
