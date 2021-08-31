import { Request, Response, NextFunction } from 'express';

import { Assignment } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const listAllAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET allAssignments request');
  try {
    const list = await Assignment.find()
      .select('name type weight class')
      .populate({ path: 'class', select: 'name code teacher' });
    logger.info('retrieved list', list);
    res.status(200).json({ assignments: list });
  } catch (error) {
    logger.error('error while processing get request', error);
    res.status(500);
  }
};
export const listAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET /classId/assignments');
  try {
    const params = req.params;
    const classId = params.classId;
    const list = await Assignment.find({ class: classId })
      .select('name type weight class')
      .populate({ path: 'class', select: 'name code teacher' });
    logger.info(`retrieved list for class ${classId}`, list);
    res.status(200).json({ assignments: list });
  } catch (error) {
    res.status(500);
  }
};
