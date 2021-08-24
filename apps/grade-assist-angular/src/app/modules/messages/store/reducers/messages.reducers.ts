import { createReducer, on, Action } from '@ngrx/store';
import { IConversation, User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface MessagesState {
  loaded: boolean;
  loading: boolean;
  conversations: IConversation[];
  selectedConversation?: IConversation;
  userList?: User[];
  convos: idMessage;
}

interface idMessage {
  [id: string]: IConversation;
}

export const initialState: MessagesState = {
  loaded: false,
  loading: false,
  conversations: [],
  convos: {},
};

const messageReducer = createReducer(
  initialState,
  on(fromActions.getMessagesSuccess, (state, action) => {
    const sortedConvos = [...action.payload.conversations];

    sortedConvos.sort((a: any, b: any) => {
      if (a.updatedAt > b.updatedAt) {
        return a;
      }
      if (a.updatedAt < b.updatedAt) {
        return b;
      }
      return a;
    });

    // for (const convo of sortedConvos) {
    //   const sortedMessages = [...convo.messages];
    //   sortedMessages.sort((a: any, b: any) => {
    //     if (a.updatedAt > b.updatedAt) {
    //       return a;
    //     }
    //     if (a.updatedAt < b.updatedAt) {
    //       return b;
    //     }
    //     return a;
    //   });
    //   console.log(convo, sortedMessages);
    //   convo.messages = [...convo.messages, ...sortedMessages];
    // }

    const modifiedConvos = sortedConvos.reduce((map: any, convo: any) => {
      map[convo._id] = convo;
      return map;
    }, {});
    console.log(modifiedConvos);

    // for (const convoId in modifiedConvos) {
    //   console.log(convoId);
    //   const sortedMessages = [...modifiedConvos[convoId].messages];
    //   sortedMessages.sort((a: any, b: any) => {
    //     if (a.updatedAt > b.updatedAt) {
    //       return a;
    //     }
    //     if (a.updatedAt < b.updatedAt) {
    //       return b;
    //     }
    //     return a;
    //   });
    //   console.log(modifiedConvos[convoId], sortedMessages);
    //   modifiedConvos[convoId].messages = [
    //     ...modifiedConvos[convoId].messages,
    //     ...sortedMessages,
    //   ];
    // }

    return {
      ...state,
      conversations: action.payload.conversations,
      convos: modifiedConvos,
    };
  }),
  on(fromActions.sendMessagesSuccess, (state, action) => ({
    ...state,
    selectedConversation: action.payload.convo,
  })),
  on(fromActions.selectConversation, (state, action) => ({
    ...state,
    selectedConversation: action.payload,
  })),
  on(fromActions.getUsersSuccess, (state, action) => ({
    ...state,
    userList: action.payload.userList,
  })),
  on(fromActions.socketMessagesSuccess, (state, action) => {
    if (action.payload.convoId) {
      const convoIdUpdated = action.payload.convoId;
      const newMessage = action.payload.message;
      const oldMessages = state.convos
        ? state.convos[convoIdUpdated].messages
        : [];
      const allMessages = [...oldMessages, newMessage];

      console.log(convoIdUpdated, allMessages);

      return {
        ...state,
        convos: {
          ...state.convos,
          [convoIdUpdated]: {
            ...state.convos[convoIdUpdated],
            messages: allMessages,
          },
        },
      };
    } else {
      return {
        ...state,
      };
    }
  })
);

export function reducer(state: MessagesState | undefined, action: Action) {
  // console.log(jwt_decode.default(action.payload?.token));
  return messageReducer(state, action);
}
