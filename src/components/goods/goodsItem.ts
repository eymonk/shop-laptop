import app, { saveSettings } from '../app';
import { cartItemsIds, changeItemQuantity, createCartElement } from '../cart/cart';
import { LaptopData } from '../../assets/goods';
import { translateCard } from '../translator';

type itemKeys = 'brand' | 'model' | 'year' | 'stock' | 'color' | 'size' | 'gaming' | 'popular';

function removeFromCart(id: number) {
  const indexInCart = cartItemsIds.indexOf(id);
  const card = document.querySelector(`#good-card-${id}`) as HTMLDivElement;
  cartItemsIds.splice(indexInCart, 1);
  if (card) {
    const cartIcon = card.querySelector('.goods__icon_in-cart') as HTMLDivElement;
    cartIcon.classList.add('hidden');
  }
  if (app.elements.mainMessage) app.elements.mainMessage.remove();
}

class Card {
  readonly #itemData: LaptopData;
  element: HTMLDivElement;
  constructor(itemData: LaptopData) {
    this.#itemData = itemData;

    const [clone, itemElements] = this.#createClone();
    itemData = this.#itemData;

    //assign common props from incoming data-object to current card;
    Object.keys(itemElements).forEach((key) => {
      const currentElement = itemElements[key as keyof typeof itemElements] as HTMLElement;
      currentElement.textContent = itemData[key as itemKeys].toString();
    });

    const goodsSection = document.querySelector('.goods');
    const card = (clone as HTMLElement).querySelector('.goods__card') as HTMLDivElement;
    const img = card.querySelector('.goods__card-img') as HTMLImageElement;

    card.id = `good-card-${this.#itemData.id}`;
    img.src = `https://github.com/jaysuno0/for-tasks/blob/main/laptops/${this.#itemData.id}.jpg?raw=true`;
    goodsSection?.appendChild(card);
    this.element = card;
    app.language === 'ru' && translateCard(card);
    const btnAddToCart = card.querySelector('.goods__btn_add') as HTMLButtonElement;
    btnAddToCart.addEventListener('click', () => this.addToCart());
    if (cartItemsIds.includes(this.#itemData.id)) {
      const cartIcon = card.querySelector('.goods__icon_in-cart') as HTMLImageElement;
      cartIcon.classList.remove('hidden');
    }
  }

  #createClone() {
    const template = document.querySelector('#goods-item') as HTMLTemplateElement;
    const clone = template.content.cloneNode(true) as HTMLElement;
    return [
      clone,
      {
        brand: clone.querySelector('.goods__brand') as HTMLHeadingElement,
        model: clone.querySelector('.goods__model') as HTMLParagraphElement,
        year: clone.querySelector('.goods__feature_year') as HTMLSpanElement,
        stock: clone.querySelector('.goods__feature_stock') as HTMLSpanElement,
        size: clone.querySelector('.goods__feature_size') as HTMLSpanElement,
        color: clone.querySelector('.goods__feature_color') as HTMLSpanElement,
        gaming: clone.querySelector('.goods__feature_gaming') as HTMLSpanElement,
        popular: clone.querySelector('.goods__feature_popular') as HTMLSpanElement,
      },
    ];
  }

  addToCart() {
    if (!cartItemsIds.includes(this.#itemData.id)) {
      const cartIcon = this.element.querySelector('.goods__icon_in-cart') as HTMLDivElement;
      cartIcon.style.display = 'block';
      createCartElement(
        this.#itemData.id,
        this.#itemData.color,
        this.#itemData.brand,
        this.#itemData.model,
        this.#itemData.year
      );
    } else changeItemQuantity(this.#itemData.id, 'add');
    saveSettings();
  }
}

export { LaptopData, Card, itemKeys, removeFromCart };
