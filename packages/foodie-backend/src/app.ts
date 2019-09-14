import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import AuthRouter from './app/auth/AuthRouter';
import UserRouter from './app/user/UserRouter';
import VendorRouter from './app/vendor/VendorRouter';

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.set('trust proxy', 1); // trust first proxy

app.use('/v1', [AuthRouter, UserRouter, VendorRouter]);

/**
 * TODO
 * - Create 404 error
 */
// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: any) => {
  res.status(404).send('INVALID RESOURCE');
});

app.use((error: any, req: Request, res: Response) => {
  console.log(error);

  res.status(error.status || 500).send({ body: error.message });
});

export default app;
