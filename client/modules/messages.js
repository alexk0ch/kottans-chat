export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  append(username, message) {
    this.node.innerHTML += `[${username}] ${message}\n`;
  }

  appendSystem(message) {
    this.append('system', message);
  }

  clear() {
    this.node.innerHTML = '';
  }
}
