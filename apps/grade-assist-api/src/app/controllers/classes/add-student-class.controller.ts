import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';

import { isStudentInClass } from '../../helpers';

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
    logger.info('preparing to add students ' + studentsId);
    for (const id of studentsId) {
      logger.info('preparing to search for ' + id);
      const studentFound = await User.findById(id);

      if (!studentFound || isStudentInClass(classes, id)) {
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
