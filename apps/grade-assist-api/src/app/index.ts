// import express, { Request, Response, NextFunction } from 'express';
// import { json } from 'body-parser';
// import mongoose from 'mongoose';

// import { teachersRoutes } from './routes/teachers';
// import { adminRoutes } from './routes/admin';
// import { studentRoutes } from './routes/student';

// console.info('...loading express and dependencies');
// const app = express();

// console.info('...loading middlewares');
// app.use(json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// console.info('...loading routes');
// // app.use()
// app.use(teachersRoutes);
// app.use(adminRoutes);
// app.use(studentRoutes);

// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

// console.info('...attempting db connection');
// mongoose
//   .connect(
//     'mongodb+srv://gradeadmin:mysuperextraadminpassword56!!@cluster0.7iafc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then((result: any) => {
//     app.listen(3000);
//     console.info('...server listening on 3000');
//   })
//   .catch((err: any) => {
//     console.error('error init db', err);
//   });
