import { Request, Response, NextFunction } from 'express';

import { Classes } from '../../models/classes.model';
import { logger } from '../../middleware/audit-logs';

export const getClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /classes request');
  try {
    const list = await Classes.find()
      .select('name teacher code students assignments')
      .populate({ path: 'teacher', select: 'firstName lastName email' })
      .populate({ path: 'students', select: 'firstName lastName email' })
      .populate({ path: 'assignments', select: 'name type' });
    res.status(200).json({ classes: list });
  } catch (err) {
    res.status(500);
  }
};
