import app, { saveSettings } from '../app';
import controller from '../controller';

class Search {
  element: HTMLInputElement;
  value: string;

  constructor(element: HTMLInputElement, name: string) {
    this.element = element;
    this.value = '';
    const icon = document.querySelector(`.search_${name}-icon`) as HTMLImageElement;

    this.element.addEventListener('input', (event) => {
      this.value = (event.target as HTMLInputElement).value;
      if (this.value.length) icon.src = 'svg/close.svg';
      else icon.src = 'svg/search.svg';
      saveSettings();
      controller.draw();
    });

    icon.addEventListener('click', () => {
      if (this.value.length) {
        this.value = '';
        this.element.value = '';
        this.element.focus();
        icon.src = 'svg/search.svg';
        saveSettings();
        controller.draw();
      }
    });

    app.searches[name] = this;
  }
}

export default Search;
