import controller from '../controller';
import app from '../app';
import {translateCard, translateCartItem} from "../translator";

const cartElement = document.querySelector('.cart') as HTMLDivElement;
const itemsCounter = document.querySelector('.cart__counter-number') as HTMLSpanElement;
const cartItemsIds: number[] = [];

function openCart() {
  itemsCounter.textContent = `${cartItemsIds.length}`;
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

function createCartElement(id: number, color: string, brand: string, model: string, year: number) {
  if (!cartItemsIds.includes(id)) {
    const cardItemTemplate = document.querySelector('.template__cart-item') as HTMLTemplateElement;
    const cartItem = document.importNode(cardItemTemplate.content, true);
    const cartItemImg = cartItem.querySelector('.cart-item__img') as HTMLImageElement;
    const cartItemColor = cartItem.querySelector('.cart-item__color') as HTMLParagraphElement;
    const cartItemBrand = cartItem.querySelector('.cart-item__brand') as HTMLParagraphElement;
    const cartItemModel = cartItem.querySelector('.cart-item__model') as HTMLParagraphElement;
    const cartItemYear = cartItem.querySelector('.cart-item__year') as HTMLParagraphElement;
    const cartItemBtnDelete = cartItem.querySelector('.cart-item__btn_delete') as HTMLButtonElement;
    cartItemImg.src = `https://github.com/jaysuno0/for-tasks/blob/main/laptops/${id}.jpg?raw=true`;
    cartItemColor.textContent = color;
    cartItemBrand.textContent = brand;
    cartItemModel.textContent = model;
    cartItemYear.textContent = `${year}`;
    cartItemBtnDelete.addEventListener('click', () => {
      controller.deleteItemFromCart(id);
      itemsCounter.textContent = `${cartItemsIds.length}`;
    });
    const cartItemElement = cartItem.querySelector('.cart__item') as HTMLDivElement;
    cartItemElement.id = `cart-item-${id}`;
    addToCart(cartItem);
    app.language === 'ru' && translateCartItem(document.querySelector(`#cart-item-${id}`) as Element);
  }
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);

export { cartItemsIds, createCartElement };
