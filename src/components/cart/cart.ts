import app from '../app';

const cart = document.querySelector('.cart') as HTMLDivElement;

function openCart() {
  const itemsCounter = document.querySelector('.cart__counter-number') as HTMLSpanElement;
  itemsCounter.textContent = `${app.cartItems.length}`;
  cart.classList.remove('hidden');
}

function closeCart() {
  cart.classList.add('hidden');
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);