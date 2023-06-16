import * as noUiSlider from 'nouislider';
import { saveSettings, draw } from '../app';

type doubleRangeValues = [number, number];
type doubleRangeInfo = [HTMLParagraphElement, HTMLParagraphElement];

class DoubleRange {
  element: noUiSlider.target;
  values: doubleRangeValues;
  info: doubleRangeInfo;

  constructor(div: noUiSlider.target, startRange: doubleRangeValues, info: doubleRangeInfo) {
    this.element = div;
    this.values = startRange;
    this.info = info;

    noUiSlider.create(div, {
      start: startRange,
      connect: true,
      step: 1,
      range: {
        min: startRange[0],
        max: startRange[1],
      },
    });

    div.noUiSlider?.on('update', () => {
      let [min, max]: doubleRangeValues = div.noUiSlider?.get(true) as doubleRangeValues;
      min = Math.round(min);
      max = Math.round(max);

      this.values = [min, max];
      this.info[0].textContent = min.toString();
      this.info[1].textContent = max.toString();

      setTimeout(() => {
        draw();
        saveSettings();
      }, 0);
    });
  }
}

export { DoubleRange, doubleRangeValues };
