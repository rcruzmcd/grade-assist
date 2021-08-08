import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes } from '../models/classes.model';
import { User } from '../models/users.model';
import { Assignment, Grade } from '../models/assignment.model';
import { logger } from '../middleware/audit-logs';

export const listAllAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET allAssignments request');
  try {
    const list = await Assignment.find()
      .select('name type weight class')
      .populate({ path: 'class', select: 'name code teacher' });
    logger.info('retrieved list', list);
    res.status(200).json({ assignments: list });
  } catch (error) {
    logger.error('error while processing get request', error);
    res.status(500);
  }
};
export const listAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET /classId/assignments');
  try {
    const params = req.params;
    const classId = params.classId;
    const list = await Assignment.find({ class: classId })
      .select('name type weight class')
      .populate({ path: 'class', select: 'name code teacher' });
    logger.info(`retrieved list for class ${classId}`, list);
    res.status(200).json({ assignments: list });
  } catch (error) {
    res.status(500);
  }
};
export const createAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('/processing /POST /classId/assignment request');
  try {
    const params = req.params;
    const classId = params.classId;
    logger.info('getting class id from parameters', classId);
    const { name, type, weight } = req.body;
    logger.info('getting payload from boyd', name, type, weight);

    const classes = await Classes.findById(classId);
    if (!classes) {
      logger.error('class was not found', classId);
      const error: ResponseError = new Error('class needs to be defined');
      error.statusCode = 422;
      throw error;
    }

    const assignment = Assignment.build({
      name,
      type,
      weight,
      class: classId,
    });
    await assignment.save();
    logger.info('assignment created', assignment._id);

    if (!classes.assignments) {
      classes.assignment = [];
      logger.info('initializing assignments array');
    }

    classes.assignment.push(assignment._id);
    await classes.save();
    logger.info('classes updated with assignment id');

    res.status(201).send(assignment);
  } catch (error) {
    next(error);
  }
};
export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /PUT /assignment/assignmentId');
  try {
    const { name, type, weight } = req.body;
    logger.info('getting update values from body', name, type, weight);

    const params = req.params;
    const assignmentId = params.assignmentId;
    logger.info('gettting assignment id from params', assignmentId);

    const assign = await Assignment.findById(assignmentId).select(
      'name type weight class'
    );

    if (!assign) {
      logger.error('assignment not found', assignmentId);
      const error: ResponseError = new Error(
        'assignment not found ' + assignmentId
      );
      error.statusCode = 422;
      throw error;
    }

    assign.name = name;
    assign.type = type;
    assign.weight = weight;

    await assign.save();
    logger.info(
      `assignment updated with name ${name} type ${type} weight ${weight}`
    );
    res.status(201).send(assign);
  } catch (error) {
    next(error);
  }
};
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
      // need to remove assignment from class record
    }

    for (const grade of grades) {
      const gradeObject = await Grade.findById(grade);
      if (gradeObject) {
        logger.info('grade found with assignment on record');
        //delete grade
        const studentId = gradeObject.student;
        const student = await User.findById(studentId);
        if (student) {
          logger.info('student found wiht grade on record');
          // need to remove grade from student record
        }
        await Grade.findByIdAndDelete(grade);
      }
    }

    await Assignment.findByIdAndDelete(assignId);
    logger.info('deleting assignment', assignId);
    res.status(200).json({ message: 'Assignment Deleted' });
  } catch (error) {
    next(error);
  }
};
export const gradeAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /POST /assignmentId/grade');
  try {
    const params = req.params;
    const assignId = params.assignmentId;

    const { grade, studentId } = req.body;

    const assign = await Assignment.findById(assignId);
    if (!assign) {
      // throw error assignent not found
    }

    const student = await User.findById(studentId);
    if (!student) {
      //throw error student not found
    }

    const gradeObject = await new Grade({
      grade,
      assignment: assignId,
      student: studentId,
    });

    await gradeObject.save();

    if (!assign.grades) {
      assign.grades = [];
    }

    assign.grades.push(gradeObject._id);
    await assign.save();

    res.status(200).json({ message: 'Grade saved', grade: gradeObject });
  } catch (error) {
    next(error);
  }
};
