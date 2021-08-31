import { Request, Response, NextFunction } from 'express';

import { logger } from '../../middleware/audit-logs';
import { Conversation } from '../../models/conversation';

// get's a user conversation
export const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing GET /conversation/:userId request');
  try {
    const params = req.params;
    logger.info(`params found ` + params);
    const userId = params.userId;

    logger.info(`searching for convo for user ${userId}`);
    const convo = await Conversation.find({ participants: userId })
      .populate({ path: 'messages', options: { updatedAt: 'asc' } })
      .populate({
        path: 'participants',
        select: 'firstName lastName email type',
      })
      .sort({ updatedAt: 'asc' });

    logger.info(`searched finished ${convo}`);
    res.status(200).json({ conversations: convo });
  } catch (error) {
    next(error);
  }
};
