import { DoubleRange, doubleRangeValues } from './search/DoubleRange';
import { createItemCard } from './goods/goodsItem';
import SoleCheckbox from './search/SoleCheckbox';
import { showMessage } from './message/message';
import Checkbox from './search/Checkbox';
import searchFilters from './search/searchFilters';
import Search from './search/Search';
import Select from './search/Select';
import data from '../assets/goods';
import app, { selects, ranges, filters } from './app';

const controller = {
  data: [...data],

  sortData() {
    switch (selects.sort.value) {
      case 'alphabet-hl':
        this.data.sort((currentItem, nextItem) => {
          let result = 1;
          if (currentItem.brand.toLowerCase() > nextItem.brand.toLowerCase()) result = -1;
          return result;
        });
        break;

      case 'year-hl':
        this.data.sort((currentItem, nextItem) => nextItem.year - currentItem.year);
        break;

      case 'year-lh':
        this.data.sort((currentItem, nextItem) => currentItem.year - nextItem.year);
        break;

      case 'stock-hl':
        this.data.sort((currentItem, nextItem) => nextItem.stock - currentItem.stock);
        break;

      case 'stock-lh':
        this.data.sort((currentItem, nextItem) => currentItem.stock - nextItem.stock);
        break;

      default:
        this.data.sort((currentItem, nextItem) => {
          let result = 1;
          if (currentItem.brand.toLowerCase() < nextItem.brand.toLowerCase()) result = -1;
          return result;
        });
    }
  },

  createSearch(elementName: string) {
    const input = document.querySelector(`.search_${elementName}`) as HTMLInputElement;
    new Search(input, elementName);
    if (elementName === 'main') input.focus();
  },

  createSelect(elementName: string) {
    const select = document.querySelector(`.select_${elementName}`) as HTMLSelectElement;
    new Select(select, elementName);
  },

  createRange(name: string, range: doubleRangeValues) {
    const div = document.querySelector(`.search__range_${name}`) as HTMLDivElement;
    const min = document.querySelector(`.search__${name}_min`) as HTMLParagraphElement;
    const max = document.querySelector(`.search__${name}_max`) as HTMLParagraphElement;
    ranges[name] = new DoubleRange(div, range, [min, max]);
  },

  createFilter(name: string) {
    const container = document.querySelector(`.search__${name}`) as HTMLDivElement;
    const wrappers = [...container.querySelectorAll('.checkboxes__item')];
    const checkboxes = [...container.querySelectorAll('.checkboxes__box')];

    filters[name] = {};

    checkboxes.forEach((box, ind) => {
      new Checkbox(name, wrappers[ind], box);
    });
  },

  createSoleCheckbox(name: string) {
    new SoleCheckbox(name);
  },

  checkMatches() {
    const cards = document.querySelector('.goods') as HTMLDivElement;
    if (!cards.textContent) showMessage('no-matches');
  },

  draw() {
    const cards = document.querySelector('.goods') as HTMLDivElement;
    cards.textContent = '';
    app.currentMessageType = null;
    controller.sortData();

    controller.data.forEach((item) => {
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
    controller.checkMatches();
  },
};

export default controller;
