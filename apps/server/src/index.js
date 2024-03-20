const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { envNumber, env } = require('./config');

const port = envNumber('PORT');
const origin = env('ORIGIN');
const clearMessagesInterval = envNumber('CLEAR_MESSAGES_INTERVAL');

const app = express();

app.use(cors({ origin }));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, { cors: { origin } });

let users = new Map();
let messages = [];

io.on('connect', (s) => {
  s.on('join', (username) => {
    if (users.has(username)) {
      s.emit('join-response', null);
    } else {
      const user = { id: s.id, username };
      users.set(username, user);

      const left = () => {
        users.delete(username);
        s.broadcast.emit('left', username);
        s.removeAllListeners('message');
      };
      s.once('disconnect', left);
      s.once('leave', left);

      s.on('message', (msg) => {
        messages.push(msg);
        s.broadcast.emit('new-message', msg);
      });

      s.once('users', () => {
        s.emit('users-response', Array.from(users.values()));
      });

      s.once('messages', () => {
        s.emit('messages-response', messages);
      });

      s.emit('join-response', s.id);
      s.broadcast.emit('joined', user);
    }
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);

  setInterval(() => {
    messages = [];
  }, clearMessagesInterval);

  console.log(`messages will be cleared every ${clearMessagesInterval / 1000} seconds`);
});
