import { soleCheckboxes, saveSettings, draw } from '../app';

class SoleCheckbox {
  name: string;
  element: HTMLDivElement;
  status: boolean;

  static setStatus(box: SoleCheckbox) {
    box.status = !box.status;
  }

  constructor(name: string) {
    this.name = name;
    this.element = document.querySelector(`.solebox-${name}`) as HTMLDivElement;
    this.status = name !== 'popular';

    soleCheckboxes[name] = this;

    this.element.parentElement?.addEventListener('click', () => {
      this.element.classList.toggle('checkboxes__box_active');
      SoleCheckbox.setStatus(this);
      saveSettings();
      draw();
    });
  }
}

export default SoleCheckbox;
