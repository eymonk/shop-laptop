import { selects, saveSettings } from '../app';
import { draw } from '../controller';

class Select {
  name: string;
  element: HTMLSelectElement;
  value: string;

  constructor(element: HTMLSelectElement, name: string) {
    this.name = name;
    this.element = element;
    this.value = this.element.value;

    selects[name] = this;
    this.element.addEventListener('change', (event) => {
      this.value = (event.target as HTMLSelectElement).value;
      saveSettings();
      setTimeout(draw);
    });
  }
}

export default Select;
