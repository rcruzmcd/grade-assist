import { hash } from 'bcryptjs';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { User } from '../models/users.model';
import { logger } from '../middleware/audit-logs';
import { Classes } from '../models/classes.model';

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

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /student request', req.body);
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

    const student = User.build({
      firstName,
      lastName,
      email,
      password: hashedPw,
      type: 'student',
    });

    await student.save();
    logger.info('new teacher created', student);
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /student request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);

      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.studentId;

    const classes = req.body.classes;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const student = await User.findById(tid).select(
      'firstName lastName classes'
    );

    if (!student) {
      const error: ResponseError = new Error(
        `Student with id ${tid} not found`
      );
      error.statusCode = 422;
      throw error;
    }

    student.classes = classes;
    student.firstName = firstName;
    student.lastName = lastName;

    await student.save();
    logger.info(
      'updating user ' + tid + ' with values',
      classes,
      firstName,
      lastName
    );
    res.status(200).json({ message: 'User updated', student: student });
  } catch (error) {
    next(error);
  }
};

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
