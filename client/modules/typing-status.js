import {Label} from './label.js';

export class TypingStatus extends Label {
  constructor(...args) {
    super(...args);

    this.timeout = 3000;
    this.timer = null;
  }

  render = (message = '') => {
    super.render(message);

    clearInterval(this.timer);
    this.timer = this.scheduleClear();
  };

  scheduleClear() {
    return setTimeout(this.render, this.timeout);
  }
}
