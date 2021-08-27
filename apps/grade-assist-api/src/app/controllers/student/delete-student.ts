import { Request, Response, NextFunction } from 'express';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing DELETE /student request');
  try {
    const params = req.params;
    const tid = params.teacherId;
    const student = await User.findById(tid);
    logger.info('deleting student', tid);

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted student' });
  } catch (error) {
    next(error);
  }
};
