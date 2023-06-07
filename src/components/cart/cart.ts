import { getItemById, LaptopData } from '../../assets/goods';
import { translateCartItem } from '../translator';
import app from '../app';

const cartElement = document.querySelector('.cart') as HTMLDivElement;
const cartItemsIds: number[] = [];

function setCartCounters() {
  console.log('set cart counters');
  const itemsCounterCart = document.querySelector('.cart__counter-number') as HTMLSpanElement;
  const itemsCounterHeader = document.querySelector('.header__cart-count') as HTMLParagraphElement;
  itemsCounterCart.textContent = `${cartItemsIds.length}`;
  itemsCounterHeader.textContent = `${cartItemsIds.length}`;
}

function setupCart() {
  const idsString = localStorage.getItem('cartItemsIds');
  if (idsString) idsString.split(',').forEach((number) => cartItemsIds.push(Number(number)));
  const idsInCart = new Set(cartItemsIds);
  idsInCart.forEach((itemId) => {
    const itemData = getItemById(itemId) as LaptopData;
    createCartElement(itemData.id, itemData.color, itemData.brand, itemData.model, itemData.year);
  });
  cartItemsIds.forEach((id) => {
    if (idsInCart.has(id)) {
      console.log('has');
      const itemCartElement = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
      const itemQuantityElement = itemCartElement.querySelector('.cart-item__quantity-number') as HTMLParagraphElement;
      itemQuantityElement.textContent = `${Number(itemQuantityElement.textContent) + 1}`;
    }
  });
  setCartCounters();
}

function openCart() {
  cartElement.classList.remove('hidden');
  document.body.classList.add('stop-scrolling');
}

function closeCart() {
  cartElement.classList.add('hidden');
  document.body.classList.remove('stop-scrolling');
}

function addToCart(element: DocumentFragment) {
  const cartItemsContainer = document.querySelector('.cart__items') as HTMLDivElement;
  cartItemsContainer.append(element);
}

function removeFromCart(id: number) {
  const cartItemElement = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
  cartItemElement.remove();
  removeFromCart(id);
  setCartCounters();
}

function changeItemQuantity(id: number, action: 'add' | 'remove') {
  const cartItem = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
  const cartItemQuantity = cartItem.querySelector('.cart-item__quantity-number') as HTMLParagraphElement;
  let newItemQuantity = cartItemQuantity.textContent;
  if (action === 'add') {
    newItemQuantity = `${Number(cartItemQuantity.textContent) + 1}`;
    cartItemsIds.push(id);
  } else if (Number(cartItemQuantity.textContent) > 1) {
    newItemQuantity = `${Number(cartItemQuantity.textContent) - 1}`;
    const indexInCart = cartItemsIds.indexOf(id);
    cartItemsIds.splice(indexInCart, 1);
  }
  cartItemQuantity.textContent = newItemQuantity;
  setCartCounters();
}

function createCartElement(id: number, color: string, brand: string, model: string, year: number) {
  cartItemsIds.push(id);
  const cardItemTemplate = document.querySelector('.template__cart-item') as HTMLTemplateElement;
  const cartItem = document.importNode(cardItemTemplate.content, true);
  const cartItemImg = cartItem.querySelector('.cart-item__img') as HTMLImageElement;
  const cartItemColor = cartItem.querySelector('.cart-item__color') as HTMLParagraphElement;
  const cartItemBrand = cartItem.querySelector('.cart-item__brand') as HTMLParagraphElement;
  const cartItemModel = cartItem.querySelector('.cart-item__model') as HTMLParagraphElement;
  const cartItemYear = cartItem.querySelector('.cart-item__year') as HTMLParagraphElement;
  cartItemImg.src = `https://github.com/jaysuno0/for-tasks/blob/main/laptops/${id}.jpg?raw=true`;
  cartItemColor.textContent = color;
  cartItemBrand.textContent = brand;
  cartItemModel.textContent = model;
  cartItemYear.textContent = `${year}`;
  const cartItemBtnDelete = cartItem.querySelector('.cart-item__btn_delete') as HTMLButtonElement;
  cartItemBtnDelete.addEventListener('click', () => removeFromCart(id));
  const cartItemBtnAdd = cartItem.querySelector('.cart-item__btn_add') as HTMLButtonElement;
  cartItemBtnAdd.addEventListener('click', () => changeItemQuantity(id, 'add'));
  const cartItemBtnRemove = cartItem.querySelector('.cart-item__btn_remove') as HTMLButtonElement;
  cartItemBtnRemove.addEventListener('click', () => changeItemQuantity(id, 'remove'));
  const cartItemElement = cartItem.querySelector('.cart__item') as HTMLDivElement;
  cartItemElement.id = `cart-item-${id}`;
  addToCart(cartItem);
  app.language === 'ru' && translateCartItem(document.querySelector(`#cart-item-${id}`) as Element);
  setCartCounters();
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);

export { setupCart, cartItemsIds, createCartElement, changeItemQuantity };
