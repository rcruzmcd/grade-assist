import { Router } from 'express';
import { body } from 'express-validator/check';

import * as assignController from '../controllers/assignment';
import { isAuth } from '../middleware/is-auth';

import { Classes } from '../models/classes.model';
import { User } from '../models/users.model';
import { Assignment, Grade } from '../models/assignment.model';

const router = Router();

router.get('/assignments', isAuth, assignController.listAllAssignments);

router.get(
  '/classes/:classId/assignments',
  isAuth,
  assignController.listAssignments
);

router.post(
  '/classes/:classId/assignment',
  isAuth,
  [
    body('name').not().isEmpty().withMessage('Please enter assignment name'),
    body('type').not().isEmpty().withMessage('Please enter assignment type'),
  ],
  assignController.createAssignment
);

router.put(
  '/assignments/:assignmentId',
  isAuth,
  assignController.updateAssignment
);

router.delete(
  '/assignments/:assignmentId',
  isAuth,
  assignController.deleteAssignment
);

router.post(
  '/assignments/:assignmentId/grade',
  isAuth,
  [
    body('grade').not().isEmpty().withMessage('Please enter grade'),
    body('studentId').not().isEmpty().withMessage('Please enter student id'),
  ],
  assignController.gradeAssignment
);

router.put('grade/:gradeId', isAuth, assignController.updateGrade);

router.get(
  '/assignments/:assignmentId/grade',
  isAuth,
  assignController.getAssignmentGrades
);

export { router as assignRouter };
