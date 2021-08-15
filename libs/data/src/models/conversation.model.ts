export interface IConversation {
  participants: string[];
  messages: IMessage[];
  _id?: string;
}

export interface IMessage {
  sender: string;
  message: string;
  datetime: Date;
  _id?: string;
}
