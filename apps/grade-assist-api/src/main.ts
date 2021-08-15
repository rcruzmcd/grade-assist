import express, { Request, Response, NextFunction, Errback } from 'express';
import { json } from 'body-parser';
import { connect } from 'mongoose';
import { createServer } from 'http';
import * as socketio from 'socket.io';

import { teachersRoutes } from './app/routes/teachers';
import { adminRoutes } from './app/routes/admin';
import { studentRoutes } from './app/routes/student';
import { authRoutes } from './app/routes/auth';
import { classRoutes } from './app/routes/classes';
import { messagesRoutes } from './app/routes/messages';

import { mongodb } from './app/models/mongoose';

import { logger } from './app/middleware/audit-logs';
import { assignRouter } from './app/routes/assignments';
import * as socket from './socket';

logger.log({
  level: 'info',
  message: '...loading express and dependencies',
});
const app = express();

logger.info('...loading middlewares');
app.use(json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

logger.log({
  level: 'info',
  message: '...loading routes',
});
app.use('/api', authRoutes);
app.use('/api', teachersRoutes);
app.use('/api', adminRoutes);
app.use('/api', studentRoutes);
app.use('/api', classRoutes);
app.use('/api', assignRouter);
app.use('/api', messagesRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.log({
    level: 'error',
    message: 'error catch',
    error,
  });
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

logger.info('...attempting db connection');
connect(mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then((result: any) => {
    const httpServer = createServer(app);
    const io = socket.init(httpServer);
    httpServer.listen(3000);

    io.on('connection', (socket: socketio.Socket) => {
      console.log('client connected');
    });

    io.on('message', (message) => {
      console.log(message);
      io.emit('message', 'some text');
    });

    io.on('disconnect', () => {
      console.log('a user disconnect!');
    });

    logger.log({
      level: 'info',
      message: '...server listening on 3000',
    });
  })
  .catch((err: any) => {
    logger.log({
      level: 'error',
      message: 'error init db',
      error: err,
    });
  });
