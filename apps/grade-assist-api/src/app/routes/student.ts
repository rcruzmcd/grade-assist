import { Router } from 'express';
import { body } from 'express-validator';

import * as fromControllers from '../controllers/student';
import { User } from '../models/users.model';

const router = Router();

router.get('/teacher', fromControllers.getStudents);

router.post('/teacher', fromControllers.createStudent);

router.put('/teacher/:teacherId', fromControllers.updateStudent);

router.delete('/teacher/:teacherId', fromControllers.deleteStudent);

export { router as studentRoutes };
