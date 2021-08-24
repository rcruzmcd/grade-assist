import mongoose from 'mongoose';
import { User } from './users.model';

export interface IConversation {
  participants: string[];
  messages: IMessage[];
}

export interface IMessage {
  sender: string;
  message: string;
  datetime: Date;
  status: MessageStatus;
}

export enum MessageStatus {
  Delivered,
  Failed,
  Read,
  Sent,
}

interface ConversationInteface extends mongoose.Model<any> {
  build(attr: IConversation): any;
}

interface MessageInteface extends mongoose.Model<any> {
  build(attr: IMessage): any;
}

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Message',
    },
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

conversationSchema.statics.build = (attr: IConversation) => {
  return new Conversation(attr);
};

messageSchema.statics.build = (attr: IMessage) => {
  return new Message(attr);
};

const Conversation = mongoose.model<any, ConversationInteface>(
  'Conversation',
  conversationSchema
);

const Message = mongoose.model<any, MessageInteface>('Message', messageSchema);

export { Conversation, Message };
