import { hash } from 'bcryptjs';

import { Request, Response, NextFunction } from 'express';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing DELETE /admin request');
  try {
    const params = req.params;
    const tid = params.teacherId;
    const admin = await User.findById(tid);
    logger.info('deleting admin', tid);

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted admin' });
  } catch (error) {
    next(error);
  }
};
