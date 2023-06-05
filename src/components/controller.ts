import { DoubleRange, doubleRangeValues } from './search/DoubleRange';
import SoleCheckbox from './search/SoleCheckbox';
import {Card, LaptopData, removeFromCart} from './goods/goodsItem';
import Checkbox from './search/Checkbox';
import filters from './search/filters';
import Search from './search/Search';
import Select from './search/Select';
import data from '../assets/goods';
import app from './app';
import { showMessage } from './message/message';
import { cartItemsIds, createCartElement } from './cart/cart';

const controller = {
  data: [...data],

  sortData() {
    switch (app.selects.sort.value) {
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
    app.ranges[name] = new DoubleRange(div, range, [min, max]);
  },

  createFilter(name: string) {
    const container = document.querySelector(`.search__${name}`) as HTMLDivElement;
    const wrappers = [...container.querySelectorAll('.checkboxes__item')];
    const checkboxes = [...container.querySelectorAll('.checkboxes__box')];

    app.filters[name] = {};

    checkboxes.forEach((box, ind) => {
      new Checkbox(name, wrappers[ind], box);
    });
  },

  createSoleCheckbox(name: string) {
    new SoleCheckbox(name);
  },

  checkMatches() {
    if (!app.elements.goods.textContent) {
      if (app.elements.mainMessage) app.elements.goods.append(app.elements.mainMessage);
      else showMessage('no-matches');
    }
  },

  checkCart(item: LaptopData) {
    let result = false;
    const idValue = localStorage.getItem(`cart-item-id${item.id}`);

    if (idValue) {
      const cartCountElement = document.querySelector('.header__cart-count') as HTMLParagraphElement;
      cartCountElement.textContent = `${cartItemsIds.length}`;
      createCartElement(item.id, item.color, item.brand, item.model, item.year);
      if (!cartItemsIds.includes(item.id)) cartItemsIds.push(item.id);
      result = true;
    }

    return result;
  },

  deleteItemFromCart(id: number) {
    const cartItemElement = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
    cartItemElement.remove();
    removeFromCart(id);
  },

  draw() {
    app.elements.goods.textContent = '';
    app.currentMessageType = null;
    controller.sortData();

    controller.data.forEach((item) => {
      let result = true;

      if (!filters.search(item, 'main')) result = false;
      if (!filters.stock(item, app.ranges.stock.values)) result = false;
      if (!filters.year(item, app.ranges.year.values)) result = false;
      if (!filters.checkbox(item, 'brand')) result = false;
      if (!filters.checkbox(item, 'color')) result = false;
      if (!filters.checkbox(item, 'size')) result = false;
      if (!filters.soleCheckbox(item, 'gaming', false)) result = false;
      if (!filters.soleCheckbox(item, 'popular', true)) result = false;
      const inCart = controller.checkCart(item);

      if (result) {
        const card = new Card(item);

        if (inCart) {
          const cartIcon = card.element.querySelector('.goods__icon_in-cart') as HTMLImageElement;
          cartIcon.style.display = 'block';
        }
      }
    });
    controller.checkMatches();
  },
};

export default controller;
