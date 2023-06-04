const cartElement = document.querySelector('.cart') as HTMLDivElement;
const cartItemsIds: number[] = [];

function openCart() {
  const itemsCounter = document.querySelector('.cart__counter-number') as HTMLSpanElement;
  itemsCounter.textContent = `${cartItemsIds.length}`;
  cartElement.classList.remove('hidden');
  console.log(cartItemsIds);
}

function closeCart() {
  cartElement.classList.add('hidden');
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);

export { cartItemsIds }