import './components/search/reset';
import controller from './components/controller';
import app from './components/app';

import './assets/svg/search.svg';
import './assets/svg/close.svg';
import './assets/svg/cart.svg';
import './assets/svg/logo.svg';
import './assets/svg/github.svg';
import './assets/svg/rs-school.svg';
import './index.scss';

// create js components for search-tools
controller.createRange('year', [2014, 2022]);
controller.createRange('stock', [1, 10]);

controller.createSearch('main');
controller.createSelect('sort');

controller.createFilter('brand');
controller.createFilter('color');
controller.createFilter('size');

controller.createSoleCheckbox('gaming');
controller.createSoleCheckbox('popular');

app.loadSettings();
