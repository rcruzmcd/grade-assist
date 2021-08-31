import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /student request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.studentId;

    const classes = req.body.classes;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const student = await User.findById(tid).select(
      'firstName lastName classes'
    );

    if (!student) {
      const error: ResponseError = new Error(
        `Student with id ${tid} not found`
      );
      error.statusCode = 422;
      throw error;
    }

    student.classes = classes;
    student.firstName = firstName;
    student.lastName = lastName;

    await student.save();
    logger.info(
      'updating user ' + tid + ' with values',
      classes,
      firstName,
      lastName
    );
    res.status(200).json({ message: 'User updated', student: student });
  } catch (error) {
    next(error);
  }
};
