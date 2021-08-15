import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { ResponseError } from '@grade-assist/data';

import { Classes, IClasses } from '../models/classes.model';
import { User } from '../models/users.model';
import {
  Assignment,
  Grade,
  IAssignment,
  IGrade,
} from '../models/assignment.model';
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
      classes.assignments = [];
      logger.info('initializing assignments array');
    }

    classes.assignments.push(assignment._id);
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

export const getAssignmentGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /GET /assignment/assignId/grades ');
  try {
    const params = req.params;
    const assignId = params.assignmentId;
    logger.info('getting assignment id from params', assignId);

    const assign = await Assignment.findById(assignId).populate({
      path: 'grades',
      select: 'student grade',
      options: { path: 'student', ref: 'User' },
    });

    if (!assign) {
      logger.error('assignment not found with id ' + assignId);
      const error: ResponseError = new Error(
        'assignment with id ' + assignId + ' not found'
      );
      error.statusCode = 422;
      throw error;
    }

    res.status(200).send(assign);
  } catch (error) {
    res.status(500);
  }
};

export const updateGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing /put /grade/gradeId updating grade');
  try {
    const params = req.params;
    const gradeId = params.gradeId;
    logger.info('getting grade id from params', gradeId);

    const newGrade = req.body.grade;
    logger.info('new grade to be updated', newGrade);

    const grade = await Grade.findById(gradeId).select(
      'studentId grade assignment'
    );
    if (!grade) {
      logger.error('grade not found with id ' + gradeId);
      const error: ResponseError = new Error(
        'grade not found wiht id ' + gradeId
      );
      error.statusCode = 422;
      throw error;
    }

    grade.grade = newGrade;
    await grade.save();
    logger.info('new grade saved', grade);
    res.status(201).json({ message: 'grade updated', grade });
  } catch (error) {
    next(error);
  }
};
