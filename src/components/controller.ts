import { SearchMessage, showMessage } from './searchMessage/searchMessage';
import { DoubleRange, doubleRangeValues } from './search/DoubleRange';
import { selects, ranges, filters } from './app';
import searchFilters from './search/searchFilters';
import { createItemCard } from './card/card';
import SoleCheckbox from './search/SoleCheckbox';
import Checkbox from './search/Checkbox';
import Search from './search/Search';
import Select from './search/Select';
import data from '../assets/goods';

const itemsData = [...data];

interface Controller {
  currentMessageType: SearchMessage;
  language: 'ru' | 'en';
}

const controller: Controller = {
  language: 'en',
  currentMessageType: null,
};

function createSearch(elementName: string) {
  const input = document.querySelector(`.search_${elementName}`) as HTMLInputElement;
  new Search(input, elementName);
  if (elementName === 'main') input.focus();
}

function createSelect(elementName: string) {
  const select = document.querySelector(`.select_${elementName}`) as HTMLSelectElement;
  new Select(select, elementName);
}

function createRange(name: string, range: doubleRangeValues) {
  const div = document.querySelector(`.search__range_${name}`) as HTMLDivElement;
  const min = document.querySelector(`.search__${name}_min`) as HTMLParagraphElement;
  const max = document.querySelector(`.search__${name}_max`) as HTMLParagraphElement;
  ranges[name] = new DoubleRange(div, range, [min, max]);
}

function createFilter(name: string) {
  const container = document.querySelector(`.search__${name}`) as HTMLDivElement;
  const wrappers = [...container.querySelectorAll('.checkboxes__item')];
  const checkboxes = [...container.querySelectorAll('.checkboxes__box')];

  filters[name] = {};

  checkboxes.forEach((box, ind) => {
    new Checkbox(name, wrappers[ind], box);
  });
}

function createSoleCheckbox(name: string) {
  new SoleCheckbox(name);
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
  controller.currentMessageType = null;
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

export default controller;
export { createSelect, createSearch, createRange, createSoleCheckbox, createFilter, draw };
