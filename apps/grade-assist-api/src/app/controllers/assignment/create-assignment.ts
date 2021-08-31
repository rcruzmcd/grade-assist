import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { Assignment } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const createAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('/processing /POST /classId/assignment request');
  try {
    const params = req.params;
    const classId = params.classId;
    logger.info('getting class id from parameters', classId);
    const { name, type, weight } = req.body;
    logger.info('getting payload from boyd', name, type, weight);

    const classes = await Classes.findById(classId);
    if (!classes) {
      logger.error('class was not found', classId);
      const error: ResponseError = new Error('class needs to be defined');
      error.statusCode = 422;
      throw error;
    }

    const assignment = Assignment.build({
      name,
      type,
      weight,
      class: classId,
    });
    await assignment.save();
    logger.info('assignment created', assignment._id);

    if (!classes.assignments) {
      classes.assignments = [];
      logger.info('initializing assignments array');
    }

    classes.assignments.push(assignment._id);
    await classes.save();
    logger.info('classes updated with assignment id');

    res.status(201).send(assignment);
  } catch (error) {
    next(error);
  }
};
