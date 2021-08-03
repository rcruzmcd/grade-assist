import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { connect } from 'mongoose';

import { teachersRoutes } from './app/routes/teachers';
import { adminRoutes } from './app/routes/admin';
import { studentRoutes } from './app/routes/student';
import { authRoutes } from './app/routes/auth';

console.info('...loading express and dependencies');
const app = express();

console.info('...loading middlewares');
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

console.info('...loading routes');
app.use('/api', authRoutes);
app.use('/api', teachersRoutes);
app.use('/api', adminRoutes);
app.use('/api', studentRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('error catch', error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

console.info('...attempting db connection');
connect(
  'mongodb+srv://gradeadmin:mysuperextraadminpassword56!!@cluster0.7iafc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
)
  .then((result: any) => {
    app.listen(3000);
    console.info('...server listening on 3000');
  })
  .catch((err: any) => {
    console.error('error init db', err);
  });
