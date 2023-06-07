import app, { saveSettings } from '../app';
import controller from '../controller';

class Select {
  name: string;
  element: HTMLSelectElement;
  value: string;

  constructor(element: HTMLSelectElement, name: string) {
    this.name = name;
    this.element = element;
    this.value = this.element.value;

    app.selects[name] = this;
    this.element.addEventListener('change', (event) => {
      this.value = (event.target as HTMLSelectElement).value;
      saveSettings();
      setTimeout(controller.draw);
    });
  }
}

export default Select;
