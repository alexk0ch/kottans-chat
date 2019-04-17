import {UserName} from './modules/user-name.js';
import {Socket} from './modules/socket.js';
import {Messages} from './modules/messages.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const userName = new UserName('#username');
  const messages = new Messages('#messages');

  socket.onNameAssigned(username => {
    userName.render(username);
    messages.appendSystem(`<b>${username}</b> assigned to you.`);
  });

  socket.onUserJoined(username => {
    messages.appendSystem(`<b>${username}</b> joined.`);
  });

  socket.onUserLeft(username => {
    messages.appendSystem(`<b>${username}</b> left.`);
  });
});
