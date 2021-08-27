import { Request, Response, NextFunction } from 'express';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';
export const getAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /admin request');
  try {
    const list = await User.find({ type: 'admin' }).select(
      'firstName lastName email classes type'
    );
    res.status(200).json({ adminList: list });
  } catch (err) {
    res.status(500);
  }
};
