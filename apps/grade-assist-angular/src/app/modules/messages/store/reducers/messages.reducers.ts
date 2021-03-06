import { createReducer, on, Action } from '@ngrx/store';
import { IConversation, User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface MessagesState {
  loaded: boolean;
  loading: boolean;
  conversations: IConversation[];
  selectedConversation?: IConversation;
  userList?: User[];
}

export const initialState: MessagesState = {
  loaded: false,
  loading: false,
  conversations: [],
};

const messageReducer = createReducer(
  initialState,
  on(fromActions.getMessagesSuccess, (state, action) => ({
    ...state,
    conversations: action.payload.conversations,
  })),
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
  }))
);

export function reducer(state: MessagesState | undefined, action: Action) {
  // console.log(jwt_decode.default(action.payload?.token));
  return messageReducer(state, action);
}
