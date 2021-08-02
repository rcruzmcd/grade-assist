import { Router } from 'express';
import { body } from 'express-validator';

import * as fromControllers from '../controllers/admin';
import { User } from '../models/users.model';

const router = Router();

router.get('/teacher', fromControllers.getAdmins);

router.post('/teacher', fromControllers.createAdmin);

router.put('/teacher/:teacherId', fromControllers.updateAdmin);

router.delete('/teacher/:teacherId', fromControllers.deleteAdmin);

export { router as adminRoutes };
