const cartElement = document.querySelector('.cart') as HTMLDivElement;
const cartItemsIds: number[] = [];

function openCart() {
  const itemsCounter = document.querySelector('.cart__counter-number') as HTMLSpanElement;
  itemsCounter.textContent = `${cartItemsIds.length}`;
  cartElement.classList.remove('hidden');
}

function closeCart() {
  cartElement.classList.add('hidden');
}

function addToCart(element: HTMLDivElement) {
  const cartItemsContainer = document.querySelector('.cart__items') as HTMLDivElement;
  cartItemsContainer.append(element);
}

function createCartElement(id: number, color: string, brand: string, model: string, year: number) {
  const cardItemTemplate = document.querySelector('.template__cart-item') as HTMLTemplateElement;
  const cartItem = cardItemTemplate.content.cloneNode(true) as HTMLDivElement;
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
  addToCart(cartItem);
}

const cartIcon = document.querySelector('.header__link_cart') as HTMLAnchorElement;
cartIcon.addEventListener('click', openCart);

const cartBtnClose = document.querySelector('.cart__btn_close') as HTMLButtonElement;
cartBtnClose.addEventListener('click', closeCart);

export { cartItemsIds, createCartElement };
