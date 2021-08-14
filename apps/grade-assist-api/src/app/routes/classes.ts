import { Router } from 'express';
import { body } from 'express-validator/check';

import * as classController from '../controllers/classes/';
import { isAuth } from '../middleware/is-auth';

import { Classes } from '../models/classes.model';

const router = Router();

router.get('/classes', isAuth, classController.getClasses);
router.post(
  '/classes',
  isAuth,
  [
    body('code')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a code')
      .custom((value, { req }) => {
        return Classes.findOne({ code: value }).then((classFound) => {
          if (classFound) {
            return Promise.reject('Class with code already exists');
          }
        });
      }),
  ],
  classController.createClass
);
router.put('/classes/:classId', isAuth, classController.updateClass);
router.delete('/classes/:classId', isAuth, classController.deleteClass);

router.post(
  '/classes/:classId/addStudents',
  isAuth,
  [body('students').not().isEmpty().withMessage('Please enter at student(s)')],
  classController.addStudentToClass
);

router.post(
  '/classes/:classId/deleteStudents',
  isAuth,
  [body('students').not().isEmpty().withMessage('Please enter at student(s)')],
  classController.deleteStudentFromClass
);

router.post(
  'classes/:classId/addAssignment',
  isAuth,
  classController.addAssignmentToClass
);

router.post('/classes/:classId/clear', isAuth, classController.clearClass);

// router.get('/classes/:classId/students', isAuth, classController.updateClass);
// router.post('/classes/:classId/students', isAuth, classController.deleteClass);

export { router as classRoutes };
