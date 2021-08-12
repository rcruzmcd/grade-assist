import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../models/classes.model';
import { User } from '../models/users.model';
import { logger } from '../middleware/audit-logs';

export const getClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /classes request');
  try {
    const list = await Classes.find()
      .select('name teacher code students assignments')
      .populate({ path: 'teacher', select: 'firstName lastName email' })
      .populate({ path: 'students', select: 'firstName lastName email' })
      .populate({ path: 'assignments', select: 'name type' });
    res.status(200).json({ classes: list });
  } catch (err) {
    res.status(500);
  }
};

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /classes request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const { name, teacherId, code } = req.body;
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      logger.error(`teacher with id ${teacherId} does not exist`);
      const error: ResponseError = new Error('Teacher does not exist');
      error.statusCode = 422;
      throw error;
    }

    const classes = Classes.build({
      name,
      teacher: teacherId,
      code,
    });

    await classes.save();
    logger.info('new class creted', classes);

    if (!teacher.classes) {
      logger.info(`creting new classes array for teacher ${teacherId}`);
      teacher.classes = [classes._id];
    }
    teacher.classes.push(classes._id);

    await teacher.save();
    logger.info('teacher model object with class id');
    res.status(201).send(classes);
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing PUT /classes request');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('validation failed', errors);
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const params = req.params;
    const classId = params.classId;

    const className = req.body.name;
    const teacher = req.body.teacher;
    logger.info(
      `gathering needed info id ${classId} name ${className} teacher ${teacher}`
    );

    const classes = await Classes.findById(classId).select(
      'name code teacher students'
    );
    logger.info('class found', classes);
    if (!classes) {
      const error: ResponseError = new Error(
        'class with id ' + classId + ' not found'
      );
      error.statusCode = 422;
      throw error;
    }
    classes.name = className;
    if (teacher) classes.teacher = teacher;

    await classes.save();
    logger.info(
      `updating class ${classId} with name ${className} and teacher ${teacher} `
    );
    res.status(200).json({ message: 'Class updated', class: classes });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing DELETE /class request');
  try {
    const params = req.params;
    const classId = params.classId;
    const classes = await Classes.findById(classId);
    if (!classes) {
      const error: ResponseError = new Error('class not found');
      error.statusCode = 422;
      throw error;
    }

    if (classes.students.length > 0 || classes.teacher) {
      const error: ResponseError = new Error(
        'class still assigned to student or teacher'
      );
      error.statusCode = 422;
      throw error;
    }

    logger.info('deleting class ' + classId);
    await Classes.findByIdAndRemove(classId);
    res.status(200).json({ message: 'Class Delete' });
  } catch (error) {
    next(error);
  }
};

export const addStudentToClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /POST /classes/id/addToStudent');
  try {
    const params = req.params;
    const classId = params.classId;

    const classes = await Classes.findById(classId)
      .populate({ path: 'teacher', select: 'firstName lastName email' })
      .populate({ path: 'students', select: 'firstName lastName email' })
      .populate({ path: 'assignments', select: 'name type' });
    if (!classes) {
      logger.error('class not found ', classId);
      const error: ResponseError = new Error('class not found');
      error.statusCode = 422;
      throw error;
    }

    const studentsId = req.body.students;
    const studentsNotFound: string[] = [];
    logger.info('preparing to add students', studentsId);
    for (const id of studentsId) {
      logger.info('preparing to search for ', id);
      const studentFound = await User.findById(id);

      if (!studentFound || classes.students.includes(id)) {
        studentsNotFound.push(id);
      } else {
        if (!classes.students) {
          logger.info('initiationg student array in class ');
          classes.students = [];
        }
        logger.info(`adding student ${id} to class`);
        classes.students.push(id);
        studentFound.classes.push(classId);
        await studentFound.save();
        logger.info('saving class to student profile', studentFound);
      }
    }

    await classes.save();
    logger.info('adding students to classes', studentsId, classes);
    res.status(200).json({
      message: 'Students added',
      class: classes,
      errStudents: studentsNotFound,
    });
  } catch (error) {
    next(error);
  }
};

export const addAssignmentToClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
