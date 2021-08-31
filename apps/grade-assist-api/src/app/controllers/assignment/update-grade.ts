import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Grade } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const updateGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /put /grade/gradeId updating grade');
  try {
    const params = req.params;
    const gradeId = params.gradeId;
    logger.info('getting grade id from params', gradeId);

    const newGrade = req.body.grade;
    logger.info('new grade to be updated', newGrade);

    const grade = await Grade.findById(gradeId).select(
      'studentId grade assignment'
    );
    if (!grade) {
      logger.error('grade not found with id ' + gradeId);
      const error: ResponseError = new Error(
        'grade not found wiht id ' + gradeId
      );
      error.statusCode = 422;
      throw error;
    }

    grade.grade = newGrade;
    await grade.save();
    logger.info('new grade saved', grade);
    res.status(201).json({ message: 'grade updated', grade });
  } catch (error) {
    next(error);
  }
};
