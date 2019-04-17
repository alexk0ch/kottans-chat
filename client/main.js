import {UserName} from './modules/user-name.js';
import {Socket} from './modules/socket.js';
import {Messages} from './modules/messages.js';
import {MessageForm} from './modules/message-form.js';
import {TypingStatus} from './modules/typing-status.js';
import {RoomForm} from './modules/room-form.js';
import {Rooms} from './modules/rooms.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const userName = new UserName('#username');
  const messages = new Messages('#messages');
  const messageForm = new MessageForm('#messageForm');
  const typingStatus = new TypingStatus('#typingStatus');
  const roomForm = new RoomForm('#room');
  const rooms = new Rooms('#rooms');

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

  socket.onChatMessage(({ username, message }) => {
    messages.append(username, message);
    typingStatus.removeTypingUser(username);
  });

  socket.onUserTyping(username => {
    typingStatus.addTypingUser(username);
  });

  messageForm.onSubmit(message => {
    socket.emitChatMessage(message);
  });

  messageForm.onKeypress(() => {
    socket.emitUserTyping();
  });

  rooms.render();

  roomForm.onSubmit(room => {
    socket.emitRoomChange(room);
  });

  socket.onRoomChanged(room => {
    rooms.add(room);
    rooms.select(room);
    rooms.render();
    messages.clear();
  });
});
