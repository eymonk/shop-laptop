import { createFilter, createRange, createSearch, createSelect, createSoleCheckbox } from './components/app';
import { loadSettings } from './components/app';
import './components/search/reset';
import './assets/svg/telegram-icon.svg';
import './assets/svg/github-icon.svg';
import './assets/svg/page-icon.svg';
import './assets/svg/trash-bin.svg';
import './assets/svg/translate.svg';
import './assets/svg/search.svg';
import './assets/svg/close.svg';
import './assets/svg/cart.svg';
import './assets/svg/logo.svg';
import './index.scss';

// create js components for search-tools
createRange('year', [2014, 2022]);
createRange('stock', [1, 10]);
createSearch('main');
createSelect('sort');
createFilter('brand');
createFilter('color');
createFilter('size');
createSoleCheckbox('gaming');
createSoleCheckbox('popular');
loadSettings();
