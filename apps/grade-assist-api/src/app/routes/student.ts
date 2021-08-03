import { Router } from 'express';
import { body } from 'express-validator';

import * as fromControllers from '../controllers/student';
import { User } from '../models/users.model';

const router = Router();

router.get('/student', fromControllers.getStudents);

router.post('/student', fromControllers.createStudent);

router.put('/student/:studentId', fromControllers.updateStudent);

router.delete('/student/:studentId', fromControllers.deleteStudent);

export { router as studentRoutes };
