import { Request, Response, NextFunction } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';

import { User } from '../models/users.model';
import { ResponseError } from '@grade-assist/data';
import { logger } from '../middleware/audit-logs';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      throw error;
    }

    const { email, password } = req.body;

    const hashedPw = await hash(password, 12);
    const user = new User({ email, password: hashedPw });

    const result = await user.save();

    res.status(201).json({ message: 'User created', userId: result._id });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /POST login', req.body);
  const { email, password } = req.body;
  try {
    logger.info('searching for user', email);
    const user = await User.findOne({ email });
    logger.info('results from search', user);
    if (!user) {
      const error = new Error('A user with this email could not be found');
      throw error;
    }

    const isEqual = await compare(password, user.password);
    logger.info('comparing passwords', isEqual);
    if (!isEqual) {
      const error: ResponseError = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    logger.info('signing jwt');
    const token = sign(
      { email: user.email, userId: user._id.toString(), userType: user.type },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    logger.info('jwt signed', token);
    res.status(200).json({ token, userId: user._id.toString() });
  } catch (error) {
    next(error);
  }
};
