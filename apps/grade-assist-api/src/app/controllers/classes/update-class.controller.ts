import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { logger } from '../../middleware/audit-logs';

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /classes request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const classId = params.classId;

    const className = req.body.name;
    const teacher = req.body.teacher;
    logger.info(
      `gathering needed info id ${classId} name ${className} teacher ${teacher}`
    );

    const classes = await Classes.findById(classId).select(
      'name code teacher students'
    );
    logger.info('class found', classes);
    if (!classes) {
      const error: ResponseError = new Error(
        'class with id ' + classId + ' not found'
      );
      error.statusCode = 422;
      throw error;
    }
    classes.name = className;
    if (teacher) classes.teacher = teacher;

    await classes.save();
    logger.info(
      `updating class ${classId} with name ${className} and teacher ${teacher} `
    );
    res.status(200).json({ message: 'Class updated', class: classes });
  } catch (error) {
    next(error);
  }
};
