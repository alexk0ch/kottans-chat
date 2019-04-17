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
  socket.emit('name assigned', socket.username);

  socket.broadcast.emit('user joined', socket.username);

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', socket.username);
  });

  socket.on('user typing', () => {
    socket.broadcast.emit('user typing', socket.username);
  });

  socket.on('chat message', message => {
    io.emit('chat message', {
      username: socket.username,
      message,
    });
  });
});
