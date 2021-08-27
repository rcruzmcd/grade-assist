import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Assignment } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const getAssignmentGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET /assignment/assignId/grades ');
  try {
    const params = req.params;
    const assignId = params.assignmentId;
    logger.info('getting assignment id from params', assignId);

    const assign = await Assignment.findById(assignId).populate({
      path: 'grades',
      select: 'student grade',
      options: { path: 'student', ref: 'User' },
    });

    if (!assign) {
      logger.error('assignment not found with id ' + assignId);
      const error: ResponseError = new Error(
        'assignment with id ' + assignId + ' not found'
      );
      error.statusCode = 422;
      throw error;
    }

    res.status(200).send(assign);
  } catch (error) {
    res.status(500);
  }
};
