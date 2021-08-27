import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@grade-assist/data';

import { User } from '../../models/users.model';
import { Assignment, Grade } from '../../models/assignment.model';
import { logger } from '../../middleware/audit-logs';

export const gradeAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /POST /assignmentId/grade');
  try {
    const params = req.params;
    const assignId = params.assignmentId;
    logger.info('gettting assign id from params', assignId);

    const { grade, studentId } = req.body;
    logger.info('getting grade and student id from body', grade, studentId);

    const assign = await Assignment.findById(assignId);
    if (!assign) {
      logger.error('assignment not found', assignId);
      const error: ResponseError = new Error(
        'assignment not found with id ' + assignId
      );
      error.statusCode = 422;
      throw error;
    }

    const student = await User.findById(studentId);
    if (!student) {
      logger.error('student not found with id ' + studentId);
      const error: ResponseError = new Error(
        'student not found with id ' + studentId
      );
      error.statusCode = 422;
      throw error;
    }

    const gradeObject = await new Grade({
      grade,
      assignment: assignId,
      student: studentId,
    });

    await gradeObject.save().populate({ path: 'student' });
    logger.info('grade created and saved', gradeObject);

    if (!assign.grades) {
      assign.grades = [];
      logger.info('instatiating grades array if needed');
    }

    assign.grades.push(gradeObject._id);
    await assign.save();
    logger.info('assignment updated with grade id', assign, grade);

    res.status(200).json({ message: 'Grade saved', grade: gradeObject });
  } catch (error) {
    next(error);
  }
};
