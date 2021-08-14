import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { logger } from '../../middleware/audit-logs';

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing DELETE /class request');
  try {
    const params = req.params;
    const classId = params.classId;
    const classes = await Classes.findById(classId);
    if (!classes) {
      const error: ResponseError = new Error('class not found');
      error.statusCode = 422;
      throw error;
    }

    if (classes.students.length > 0 || classes.teacher) {
      const error: ResponseError = new Error(
        'class still assigned to student or teacher'
      );
      error.statusCode = 422;
      throw error;
    }

    logger.info('deleting class ' + classId);
    await Classes.findByIdAndRemove(classId);
    res.status(200).json({ message: 'Class Delete' });
  } catch (error) {
    next(error);
  }
};
