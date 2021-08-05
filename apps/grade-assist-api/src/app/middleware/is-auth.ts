import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { NetConnectOpts } from 'net';

import { ResponseError } from '@grade-assist/data';
import { logger } from './audit-logs';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  // console.info('req received', req, authHeader);
  logger.log({ level: 'info', message: 'req received', req, authHeader });
  if (!authHeader) {
    const error: ResponseError = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = verify(token, 'somesupersecretsecret');

  next();
};
