import { Request, Response, NextFunction } from 'express';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /student request');
  try {
    const list = await User.find({ type: 'student' })
      .select('firstName lastName email classes type')
      .populate({ path: 'classes', select: 'name code teacher' });
    res.status(200).json({ studentList: list });
  } catch (err) {
    res.status(500);
  }
};
