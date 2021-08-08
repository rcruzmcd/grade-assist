import express, { Request, Response, NextFunction, Errback } from 'express';
import { json } from 'body-parser';
import { connect } from 'mongoose';

import { teachersRoutes } from './app/routes/teachers';
import { adminRoutes } from './app/routes/admin';
import { studentRoutes } from './app/routes/student';
import { authRoutes } from './app/routes/auth';
import { classRoutes } from './app/routes/classes';

import { mongodb } from './app/models/mongoose';

import { logger } from './app/middleware/audit-logs';

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
    app.listen(3000);
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
