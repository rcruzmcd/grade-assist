import { Router } from 'express';
import { body } from 'express-validator';
import { isAuth } from '../middleware/is-auth';

import * as fromControllers from '../controllers/admin';
import { User } from '../models/users.model';

const router = Router();

router.get('/admin', fromControllers.getAdmins);

router.post(
  '/admin',
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
  fromControllers.createAdmin
);

router.put('/admin/:adminId', isAuth, fromControllers.updateAdmin);

router.delete('/admin/:adminId', isAuth, fromControllers.deleteAdmin);

export { router as adminRoutes };
