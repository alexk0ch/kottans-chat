import {UserName} from './modules/user-name.js';
import {Socket} from './modules/socket.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const userName = new UserName('#username');

  socket.onNameAssigned(username => {
    userName.render(username);
  });
});
