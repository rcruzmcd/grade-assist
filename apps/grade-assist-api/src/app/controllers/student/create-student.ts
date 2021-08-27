import { hash } from 'bcryptjs';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /student request', req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, password } = req.body;
    const hashedPw = await hash(password, 12);

    const student = User.build({
      firstName,
      lastName,
      email,
      password: hashedPw,
      type: 'student',
    });

    await student.save();
    logger.info('new teacher created', student);
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
};
