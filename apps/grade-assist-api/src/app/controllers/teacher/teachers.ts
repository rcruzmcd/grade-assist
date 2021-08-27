import { hash } from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

import { User } from '../models/users.model';
import { ResponseError } from '@grade-assist/data';

import { logger } from '../middleware/audit-logs';

export const getTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /teacher request');
  try {
    const list = await User.find({ type: 'teacher' })
      .select('firstName lastName email classes type')
      .populate({ path: 'classes', select: 'code name students' });
    logger.info('db call success', list);
    res.status(200).json({ teachersList: list });
  } catch (err) {
    res.status(500);
  }
};

export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /teacher request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, password } = req.body;
    const hashedPw = await hash(password, 12);
    const teacher = User.build({
      firstName,
      lastName,
      email,
      password: hashedPw,
      type: 'teacher',
    });

    await teacher.save();
    logger.info('new teacher created', teacher);
    res
      .status(201)
      .json({ message: 'Teacher successfully created.', newId: teacher._id });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /teacher request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.teacherId;

    const classes = req.body.classes;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const teacher = await User.findById(tid).select(
      'firstName lastName classes type'
    );

    if (!teacher) {
      const error: ResponseError = new Error(
        `Teacher with id ${tid} not found`
      );
      error.statusCode = 422;
      throw error;
    }
    //need to compare url with user type to make sure is same
    teacher.classes = classes;
    teacher.firstName = firstName;
    teacher.lastName = lastName;

    await teacher.save();
    logger.info(
      'updating user ' + tid + ' with values',
      classes,
      firstName,
      lastName
    );
    res.status(200).json({ message: 'User updated', teacher: teacher });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing DELETE /teacher request');
  try {
    const params = req.params;
    const tid = params.teacherId;
    const teacher = await User.findById(tid);
    logger.info('deleting teacher', tid);
    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted teacher' });
  } catch (error) {
    next(error);
  }
};

// export const clearTeacherClasses =
