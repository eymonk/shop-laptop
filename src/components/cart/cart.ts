import { getItemById, getStockQuantity, LaptopData } from '../../assets/goods';
import { setCardCartCounter, turnCartIcon } from '../card/card';
import { translateCartItem } from '../translator';
import { saveSettings } from '../app';
import app from '../app';

const cartElement = document.querySelector('.cart') as HTMLDivElement;
const cartItemsIds: number[] = [];

function setCartCounters() {
  const itemsCounterCart = document.querySelector('.cart__counter-number') as HTMLSpanElement;
  const itemsCounterHeader = document.querySelector('.header__cart-count') as HTMLParagraphElement;
  itemsCounterCart.textContent = `${cartItemsIds.length}`;
  itemsCounterHeader.textContent = `${cartItemsIds.length}`;
}

function findQuantityInCart(id: number) {
  let number = 0;
  cartItemsIds.forEach((currentId) => currentId === id && number++);
  return number;
}

function setupCart() {
  const idsString = localStorage.getItem('cartItemsIds');
  if (idsString) idsString.split(',').forEach((number) => cartItemsIds.push(Number(number)));
  const idsInCart = new Set(cartItemsIds);
  //create cart items after reload
  idsInCart.forEach((itemId) => {
    const itemData = getItemById(itemId) as LaptopData;
    createCartElement(itemData.id, itemData.color, itemData.brand, itemData.model, itemData.year);
  });
  //set right items quantities in cart
  idsInCart.forEach((id) => {
    const itemCartElement = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
    const itemQuantityElement = itemCartElement.querySelector('.cart-item__quantity-number') as HTMLParagraphElement;
    const quantity = findQuantityInCart(id);
    itemQuantityElement.textContent = `${quantity}`;
  });
  setCartCounters();
}

function addToCart(item: LaptopData) {
  if (cartItemsIds.includes(item.id)) changeItemQuantity(item.id, 'add');
  else {
    cartItemsIds.push(item.id);
    createCartElement(item.id, item.color, item.brand, item.model, item.year);
  }
  saveSettings();
}

function openCart() {
  scrollTo(0, 0);
  cartElement.classList.remove('hidden');
  document.body.classList.add('stop-scrolling');
}

function closeCart() {
  cartElement.classList.add('hidden');
  document.body.classList.remove('stop-scrolling');
}

function appendItemElement(element: DocumentFragment) {
  const cartItemsContainer = document.querySelector('.cart__items') as HTMLDivElement;
  cartItemsContainer.append(element);
}

function removeFromCart(id: number) {
  const cartItemElement = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
  cartItemElement.remove();
  for (let i = 0; i < cartItemsIds.length; i++) {
    if (cartItemsIds[i] === id) {
      cartItemsIds.splice(i, 1);
      i--;
    }
  }
  turnCartIcon(id, 'off');
  setCartCounters();
  saveSettings();
}

function changeItemQuantity(id: number, action: 'add' | 'remove') {
  const cartItem = document.querySelector(`#cart-item-${id}`) as HTMLDivElement;
  const cartItemQuantity = cartItem.querySelector('.cart-item__quantity-number') as HTMLParagraphElement;
  let newItemQuantity = Number(cartItemQuantity.textContent);

  if (action === 'add') {
    if (Number(getStockQuantity(id)) > findQuantityInCart(id)) {
      newItemQuantity = Number(cartItemQuantity.textContent) + 1;
      cartItemsIds.push(id);
    } else alert(app.language === 'en' ? 'No more in stock.' : 'Больше нет на складе.');
  } else if (Number(cartItemQuantity.textContent) > 1) {
    newItemQuantity = Number(cartItemQuantity.textContent) - 1;
    cartItemsIds.splice(cartItemsIds.indexOf(id), 1);
  }

  setCardCartCounter(id);
  cartItemQuantity.textContent = `${newItemQuantity}`;
  setCartCounters();
  saveSettings();
}

function setupCartElement(id: number, element: DocumentFragment) {
  const cartItemBtnDelete = element.querySelector('.cart-item__btn_delete') as HTMLButtonElement;
  cartItemBtnDelete.addEventListener('click', () => removeFromCart(id));
  const cartItemBtnAdd = element.querySelector('.cart-item__btn_add') as HTMLButtonElement;
  cartItemBtnAdd.addEventListener('click', () => changeItemQuantity(id, 'add'));
  const cartItemBtnRemove = element.querySelector('.cart-item__btn_remove') as HTMLButtonElement;
  cartItemBtnRemove.addEventListener('click', () => changeItemQuantity(id, 'remove'));
  const cartItemElement = element.querySelector('.cart__item') as HTMLDivElement;
  cartItemElement.id = `cart-item-${id}`;
  appendItemElement(element);
  app.language === 'ru' && translateCartItem(document.querySelector(`#cart-item-${id}`) as Element, 'ru');
}

function createCartElement(id: number, color: string, brand: string, model: string, year: number) {
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
  setupCartElement(id, cartItem);
  setCartCounters();
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);

const cartCheckout = document.querySelector('.cart-checkout') as HTMLDivElement;
const cartBtnCheckoutOpen = document.querySelector('.cart__btn_checkout-open') as HTMLButtonElement;
const cartBtnCheckoutClose = document.querySelector('.cart__btn_checkout-close') as HTMLButtonElement;
cartBtnCheckoutOpen.addEventListener('click', () => cartCheckout.classList.remove('hidden'));
cartBtnCheckoutClose.addEventListener('click', () => cartCheckout.classList.add('hidden'));

export { addToCart, setupCart, findQuantityInCart, cartItemsIds };
