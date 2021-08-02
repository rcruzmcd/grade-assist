import { Router } from 'express';
import { body } from 'express-validator';

import * as fromControllers from '../controllers/teachers';
import { User } from '../models/users.model';

const router = Router();

router.get('/teacher', fromControllers.getTeachers);

router.post(
  '/teacher',
  [
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-mail address already existis');
          }
        });
      })
      .normalizeEmail(),
  ],
  fromControllers.createTeacher
);

router.put('/teacher/:teacherId', fromControllers.updateTeacher);

router.delete('/teacher/:teacherId', fromControllers.deleteTeacher);

export { router as teachersRoutes };
