import { Router } from 'express';
import { body } from 'express-validator';

import * as fromControllers from '../controllers/admin';
import { User } from '../models/users.model';

const router = Router();

router.get('/admin', fromControllers.getAdmins);

router.post('/admin', fromControllers.createAdmin);

router.put('/admin/:adminId', fromControllers.updateAdmin);

router.delete('/admin/:adminId', fromControllers.deleteAdmin);

export { router as adminRoutes };
