import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../../models/classes.model';
import { User } from '../../models/users.model';
import { logger } from '../../middleware/audit-logs';
import { Assignment } from '../../models/assignment.model';

export const clearClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /POST /classes/id/clear');
  try {
    const params = req.params;
    logger.info(`params found `, params);
    const classId = params.classId;

    logger.info(`searching for class ${classId}`);
    const classes = await Classes.findById(classId);
    logger.info(`class found ${classes}`);

    if (!classes) {
      logger.error('class not found ', classId);
      const error: ResponseError = new Error('class not found');
      error.statusCode = 422;
      throw error;
    }

    // clear teacher
    logger.info(`searching for teacher ${classes.teacher}`);
    const classTeacher = await User.findById(classes.teacher);
    logger.info(`searched completed ${classTeacher}`);
    if (!classTeacher) {
      logger.info('teacher does not exist');
      classes.teacher = null;
      await classes.save();
      logger.info('classes updated');
    }
    if (classTeacher) {
      logger.info('filtering teachers');
      classTeacher.classes = classTeacher.classes.filter(
        (_class) => _class._id != classId
      );
      await classTeacher.save();
      logger.info('teacher updated ' + classTeacher);
    }
    classes.teacher = null;
    logger.info('setting teacher to null');

    //clear assignments
    logger.info(`processign assignments ${classes.assignments}`);
    for (const assignsId of classes.assignments) {
      logger.info('searching for assign ' + assignsId);
      const assign = await Assignment.findById(assignsId);
      logger.info(`searched completed ${assign}`);
      if (assign) {
        logger.info(`looping assign students ${assign.students}`);
        for (const studentId in assign.students) {
          logger.info('searching for student ' + studentId);
          const student = await User.findById(studentId);
          logger.info(`searched finished ${student}`);
          if (student) {
            logger.info('student found ' + student);
            student.assignments = student.assignments.filter(
              (assign) => assign._id != assignsId
            );
            student.save();
            logger.info('student updated w/o assignment');
          }
        }

        await Assignment.findByIdAndRemove(assignsId);
        logger.info('assignment removed');
      }
    }

    classes.assignments = [];
    logger.info('assignments resetted');
    logger.info('processing studetns');
    for (const studentsId of classes.students) {
      logger.info(`searching for student ${studentsId}`);
      const student = await User.findById(studentsId);
      logger.info(`student found ${student}`);
      if (student) {
        logger.info(`filtering student classes`);
        student.classes = student.classes.filter(
          (_class) => _class.id != classId
        );
        await student.save();
        logger.info('student updated');
      }
    }
    classes.students = [];
    logger.info('students resetteed');

    await classes.save();
    logger.info('classes updated');

    // send response
    res.status(200).json({
      message: 'Classes cleared',
      class: classes,
    });
  } catch (error) {
    next(error);
  }
};
