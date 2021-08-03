import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { teachers_mock_list } from '../mock/teachers.mock';

import { User } from '../models/users.model';

export const getTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info('processing GET /teacher request');
  try {
    const list = await User.find();
    console.info('db call success', list);
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
  console.info('processing POST /teacher request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, classes, password } = req.body;
    const teacher = User.build({
      firstName,
      lastName,
      email,
      classes,
      password,
      type: 'teacher',
    });
    console.info('object build');

    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info('processing PUT /teacher request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.teacherId;

    const teacher = await User.findById(tid);
    //update what needs to be updated
    await teacher.save();
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
  console.info('processing DELETE /teacher request');
  try {
    const params = req.params;
    const tid = params.teacherId;
    const teacher = await User.findById(tid);

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted teacher' });
  } catch (error) {
    next(error);
  }
};
