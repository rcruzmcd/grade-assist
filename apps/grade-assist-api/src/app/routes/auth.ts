import { Router } from 'express';
import { body } from 'express-validator/check';

import { User } from '../models/users.model';
import * as fromController from '../controllers/auth';

const router = Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already exists');
          }
        });
      })
      .normalizeEmail(),
  ],
  fromController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').trim().notEmpty(),
  ],
  fromController.login
);

//reset password .. set it and send it back in response

export { router as authRoutes };
