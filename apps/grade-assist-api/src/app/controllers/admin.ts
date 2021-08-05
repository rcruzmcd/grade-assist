import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { teachers_mock_list } from '../mock/teachers.mock';

import { User } from '../models/users.model';
import { logger } from '../middleware/audit-logs';

export const getAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /admin request');
  try {
    const list = await User.find();
    res.status(200).json({ adminList: list });
  } catch (err) {
    res.status(500);
  }
};

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /admin request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, classes } = req.body;
    const admin = User.build({
      firstName,
      lastName,
      email,
      classes,
      password: '',
      type: 'admin',
    });
    logger.info('object build');

    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /admin request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.adminId;

    const admin = await User.findById(tid);
    //update what needs to be updated
    await admin.save();
    res.status(200).json({ message: 'User updated', admin: admin });
  } catch (error) {
    next(error);
  }
};

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

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted admin' });
  } catch (error) {
    next(error);
  }
};
