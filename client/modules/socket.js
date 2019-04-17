export class Socket {
  constructor() {
    this.socket = io();
  }

  onNameAssigned(handler) {
    this.socket.on('name assigned', handler);
  }
}
