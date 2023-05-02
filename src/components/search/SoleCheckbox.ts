import app from '../app';
import controller from '../controller';

class SoleCheckbox {
  name: string;
  element: HTMLDivElement;
  status: boolean;

  static setStatus(box: SoleCheckbox) {
    if (box.status) box.status = false;
    else box.status = true;
  }

  constructor(name: string) {
    this.name = name;
    this.element = document.querySelector(`.solebox-${name}`) as HTMLDivElement;
    this.status = true;
    if (name === 'popular') this.status = false;

    app.soleCheckboxes[name] = this;

    this.element.parentElement?.addEventListener('click', () => {
      this.element.classList.toggle('checkboxes__box_active');
      SoleCheckbox.setStatus(this);
      app.saveSettings();
      controller.draw();
    });
  }
}

export default SoleCheckbox;
