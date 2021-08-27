import { hash } from 'bcryptjs';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /admin request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, classes, password } = req.body;
    const hashedPw = await hash(password, 12);

    const admin = User.build({
      firstName,
      lastName,
      email,
      classes,
      password: hashedPw,
      type: 'admin',
    });

    await admin.save();
    logger.info('new admin created', admin);
    res.status(201).send(admin);
  } catch (error) {
    next(error);
  }
};
