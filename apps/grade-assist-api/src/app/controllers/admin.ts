import { hash } from 'bcryptjs';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { User } from '../models/users.model';
import { logger } from '../middleware/audit-logs';

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

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /admin request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, classes, password } = req.body;
    const hashedPw = await hash(password, 12);

    const admin = User.build({
      firstName,
      lastName,
      email,
      classes,
      password: hashedPw,
      type: 'admin',
    });

    await admin.save();
    logger.info('new admin created', admin);
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
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.adminId;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const admin = await User.findById(tid).select('firstName lastName classes');

    if (!admin) {
      const error: ResponseError = new Error(`admin with id ${tid} not found`);
      error.statusCode = 422;
      throw error;
    }

    admin.firstName = firstName;
    admin.lastName = lastName;

    await admin.save();
    logger.info('updating user ' + tid + ' with values', firstName, lastName);
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
    logger.info('deleting admin', tid);

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted admin' });
  } catch (error) {
    next(error);
  }
};
