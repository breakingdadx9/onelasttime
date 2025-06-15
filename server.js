const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messages = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('load old messages', messages);

  socket.on('new message', (msg) => {
    const message = {
      text: msg,
      time: new Date().toLocaleString()
    };
    messages.push(message);
    io.emit('message', message);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
