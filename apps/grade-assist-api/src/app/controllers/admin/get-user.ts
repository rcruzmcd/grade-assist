import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /user request');
  try {
    const list = await User.find().select(
      'firstName lastName email classes type'
    );
    res.status(200).json({ userList: list });
  } catch (err) {
    res.status(500);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /user/userId request');
  try {
    const params = req.params;
    const userId = params.userId;

    const user = await User.findById(userId)
      .select('classes grades assignments firstName lastName email type')
      .populate({ path: 'grades' })
      .populate({ path: 'classes' });
    if (!user) {
      const error: ResponseError = new Error(
        `admin with id ${userId} not found`
      );
      error.statusCode = 422;
      throw error;
    }
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500);
  }
};
