export interface IConversation {
  participants: string[];
  messages: IMessage[];
  _id?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IMessage {
  sender: string;
  message: string;
  datetime: Date;
  _id?: string;
}
