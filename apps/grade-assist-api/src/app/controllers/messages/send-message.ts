import { Request, Response, NextFunction } from 'express';

import { logger } from '../../middleware/audit-logs';
import { Conversation, Message } from '../../models/conversation';

import * as io from '../../../socket';

// get's a user conversation
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('processing POST /conversation/send request');
  try {
    logger.info('parsing body...');
    const { messageText, sender, convoId, receivers } = req.body;
    logger.info(
      `retrieving convo info ${messageText} ${sender} ${convoId} ${receivers}`
    );

    const message = Message.build({
      datetime: new Date(),
      message: messageText,
      sender,
    });
    logger.info(`message created ${message}`);

    await message.save();
    logger.info(`message saved`);

    let convo: any;
    if (convoId) {
      logger.info(`updating existing conversation`);
      logger.info(`searching for convo ${convoId}`);
      convo = await Conversation.findById(convoId)
        .populate({ path: 'messages' })
        .populate({ path: 'participants' });
      if (!convo) {
        throw new Error('convo not found');
      }

      logger.info(`searched finished ${convo}`);

      convo.messages.push(message._id);
      await convo.save();
      logger.info(`convo updated with message ${convo}`);
    } else {
      logger.info('creating new conversation');
      convo = Conversation.build({
        participants: [...receivers, sender],
        messages: [message._id],
      });
      logger.info(`convo created ${convo}`);
      await convo.save();
      logger.info(`convo saved`);
    }

    // notify receiver(s)
    for (const receiver of receivers) {
      io.getIO().emit(`message${receiver}`, {
        action: 'new message',
        message: message,
      });
    }

    res.status(200).json({ message: 'Message sent!', convo: convo });
  } catch (error) {
    next(error);
  }
};
