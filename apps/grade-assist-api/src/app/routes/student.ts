import { Router } from 'express';
import { body } from 'express-validator';
import { isAuth } from '../middleware/is-auth';

import * as fromControllers from '../controllers/student';
import { User } from '../models/users.model';

const router = Router();

router.get(
  '/student',

  fromControllers.getStudents
);

router.post(
  '/student',
  [
    body('firstName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter valid first name'),
    body('lastName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter valid last name'),
    body('password')
      .trim()
      .isStrongPassword()
      .withMessage('Please enter strong password'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .select('firstName lastName email type')
          .then((userDoc) => {
            if (userDoc) {
              return Promise.reject('E-mail address already existis');
            }
          });
      })
      .normalizeEmail(),
  ],
  fromControllers.createStudent
);

router.put('/student/:studentId', isAuth, fromControllers.updateStudent);

router.delete('/student/:studentId', isAuth, fromControllers.deleteStudent);

export { router as studentRoutes };
