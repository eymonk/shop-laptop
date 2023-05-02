import app from '../app';
import controller from '../controller';

class Checkbox {
  wrapper: Element;
  element: Element;
  status: boolean;
  filter: string;
  key: string;

  constructor(name: string, wrapper: Element, element: Element) {
    this.element = element;
    this.wrapper = wrapper;
    this.key = (element as HTMLElement).dataset.value as string;
    this.status = true;
    this.filter = name;

    this.wrapper.addEventListener('click', () => {
      this.element.classList.toggle('checkboxes__box_active');
      this.status = this.setStatus();
      app.saveSettings();
      controller.draw();
    });

    app.filters[name][this.key] = this;
  }

  setStatus() {
    return !app.filters[this.filter][this.key].status;
  }
}

export default Checkbox;
