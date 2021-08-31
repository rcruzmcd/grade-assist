import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Assignment } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /PUT /assignment/assignmentId');
  try {
    const { name, type, weight } = req.body;
    logger.info('getting update values from body', name, type, weight);

    const params = req.params;
    const assignmentId = params.assignmentId;
    logger.info('gettting assignment id from params', assignmentId);

    const assign = await Assignment.findById(assignmentId).select(
      'name type weight class'
    );

    if (!assign) {
      logger.error('assignment not found', assignmentId);
      const error: ResponseError = new Error(
        'assignment not found ' + assignmentId
      );
      error.statusCode = 422;
      throw error;
    }

    assign.name = name;
    assign.type = type;
    assign.weight = weight;

    await assign.save();
    logger.info(
      `assignment updated with name ${name} type ${type} weight ${weight}`
    );
    res.status(201).send(assign);
  } catch (error) {
    next(error);
  }
};
