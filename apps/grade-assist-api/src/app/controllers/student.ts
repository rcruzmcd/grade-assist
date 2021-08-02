import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { teachers_mock_list } from '../mock/teachers.mock';

import { User } from '../models/users.model';

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info('processing GET /student request');
  try {
    const list = await User.find();
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
  console.info('processing POST /student request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }
    const { firstName, lastName, email, classes } = req.body;
    const student = User.build({
      firstName,
      lastName,
      email,
      classes,
      password: '',
      type: 'student',
    });
    console.info('object build');

    await student.save();
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
  console.info('processing PUT /student request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      // error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const tid = params.adminId;

    const student = await User.findById(tid);
    //update what needs to be updated
    await student.save();
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
  console.info('processing DELETE /student request');
  try {
    const params = req.params;
    const tid = params.teacherId;
    const student = await User.findById(tid);

    await User.findByIdAndRemove(tid);
    res.status(200).json({ message: 'Deleted student' });
  } catch (error) {
    next(error);
  }
};
