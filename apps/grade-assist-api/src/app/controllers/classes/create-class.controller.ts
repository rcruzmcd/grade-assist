import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /classes request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const { name, teacherId, code } = req.body;
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      logger.error(`teacher with id ${teacherId} does not exist`);
      const error: ResponseError = new Error('Teacher does not exist');
      error.statusCode = 422;
      throw error;
    }

    const classes = Classes.build({
      name,
      teacher: teacherId,
      code,
    });

    await classes.save();
    logger.info('new class creted', classes);

    if (!teacher.classes) {
      logger.info(`creting new classes array for teacher ${teacherId}`);
      teacher.classes = [classes._id];
    }
    teacher.classes.push(classes._id);

    await teacher.save();
    logger.info('teacher model object with class id');
    res.status(201).send(classes);
  } catch (error) {
    next(error);
  }
};
