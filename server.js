const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Moniker = require('moniker');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/multiview', (req, res) => {
  res.sendFile(__dirname + '/client/multiview.html');
});

app.use(express.static('./client'));

server.listen(port, () => {
  console.log('listening on *:' + port);
});

io.on('connection', (socket) => {
  socket.username = Moniker.choose();
  socket.room = 'general';

  socket.emit('name assigned', socket.username);
  socket.join('general');

  socket.to(socket.room).emit('user joined', socket.username);

  socket.on('disconnect', () => {
    socket.to(socket.room).emit('user left', socket.username);
  });

  socket.on('user typing', () => {
    socket.to(socket.room).emit('user typing', socket.username);
  });

  socket.on('chat message', message => {
    io.to(socket.room).emit('chat message', {
      username: socket.username,
      message,
    });
  });

  socket.on('change room', nextRoom => {
    socket.leave(socket.room);
    socket.join(nextRoom);

    socket.to(socket.room).emit('user left', socket.username);
    socket.to(nextRoom).emit('user joined', socket.username);

    socket.room = nextRoom;
    socket.emit('room changed', nextRoom);
  });
});
