import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { Assignment, Grade } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const deleteAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /DELETE /assignment/assingmentId assignment');
  try {
    const params = req.params;
    const assignId = params.assignmentId;
    logger.info('getting assignment id from params', assignId);

    const assign = await Assignment.findById(assignId);
    if (!assign) {
      logger.error('assignment not found', assignId);
      const error: ResponseError = new Error('assingment not found');
      error.statusCode = 422;
      throw error;
    }
    logger.info('assignment found', assign);

    const classId = assign.class;
    const grades = assign.grades;

    const classes = await Classes.findById(classId);
    if (classes) {
      logger.info('class found with assignment in records');
      classes.assignments = classes.assignments.filter(
        (assign) => assign._id !== assignId
      );
      await classes.save();
      logger.info(`assignment with id ${assignId} removed from class`, classes);
    }

    for (const grade of grades) {
      const gradeObject = await Grade.findById(grade);
      if (gradeObject) {
        logger.info('grade found with assignment on record');
        //delete grade
        // const studentId = gradeObject.student;
        // const student = await User.findById(studentId);
        // if (student) {
        //   logger.info('student found wiht grade on record');
        //   // need to remove grade from student record
        // }
        await Grade.findByIdAndDelete(grade);
        logger.info('deleteing grade', grade);
      }
    }

    await Assignment.findByIdAndDelete(assignId);
    logger.info('deleting assignment', assignId);
    res.status(200).json({ message: 'Assignment Deleted' });
  } catch (error) {
    next(error);
  }
};
