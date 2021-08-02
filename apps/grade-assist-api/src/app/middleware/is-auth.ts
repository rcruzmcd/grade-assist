import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { NetConnectOpts } from 'net';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    // error code 401
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = verify(token, 'somesupersecretsecret');
  } catch (error) {
    throw error;
  }

  //   req.userId = decodedToken.userId;
  next();
};
