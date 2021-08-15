import { createServer } from 'http';
import * as socketio from 'socket.io';

let io: socketio.Server;

const init = (httpServer) => {
  io = new socketio.Server({ cors: { origin: '*' } });
  io.attach(httpServer);
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('socket.io not initialized!');
  }
  return io;
};

export { init, getIO };
