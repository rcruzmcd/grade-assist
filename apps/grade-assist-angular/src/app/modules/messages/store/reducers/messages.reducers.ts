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
    const modifiedConvos = action.payload.conversations.reduce(
      (map: any, convo: any) => {
        map[convo._id] = convo;
        return map;
      },
      {}
    );

    console.log(modifiedConvos);

    return {
      ...state,
      conversations: action.payload.conversations,
      convos: modifiedConvos,
      selectedConversation: modifiedConvos[0],
    };
  }),
  on(fromActions.sendMessagesSuccess, (state, action) => {
    return {
      ...state,
      selectedConversation: action.payload.convo,
      conversations: [...state.conversations, action.payload.convo],
      convos: {
        ...state.convos,
        [action.payload.convo._id]: action.payload.convo,
      },
    };
  }),
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
      const newMessage = {
        ...action.payload.message,
        sender: action.payload.message.sender[0],
      };
      const oldMessages = state.convos
        ? state.convos[convoIdUpdated].messages
        : [];
      const allMessages = [...oldMessages, newMessage];

      console.log(convoIdUpdated, allMessages);

      // const updatedSelected: IConversation =
      //   state.selectedConversation &&
      //   convoIdUpdated !== state.selectedConversation._id
      //     ? state.selectedConversation
      //     : {
      //         ...state.selectedConversation,
      //         messages: allMessages,
      //       };

      return {
        ...state,
        convos: {
          ...state.convos,
          [convoIdUpdated]: {
            ...state.convos[convoIdUpdated],
            messages: allMessages,
          },
        },
        // selectedConversation: updatedSelected
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
