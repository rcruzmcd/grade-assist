import { Router } from 'express';
import { body } from 'express-validator';

import { isAuth } from '../middleware/is-auth';
import * as fromControllers from '../controllers/messages';

const router = Router();

router.get('/conversation/:userId', isAuth, fromControllers.getConversations);

router.post('/conversation/send', isAuth, fromControllers.sendMessage);

export { router as messagesRoutes };
