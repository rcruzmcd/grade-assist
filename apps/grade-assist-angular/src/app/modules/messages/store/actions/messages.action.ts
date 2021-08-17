import { createAction, props } from '@ngrx/store';

export enum MessagesActions {
  GET_MESSAGES = '[Messages] Get Messages',
  GET_MESSAGES_SUCCESS = '[Messages] Get Messages Success',
  GET_MESSAGES_FAILURE = '[Messages] Get Messages Failure',
  SEND_MESSAGES = '[Messages] Send Messages',
  SEND_MESSAGES_SUCCESS = '[Messages] Send Messages Success',
  SEND_MESSAGES_FAILURE = '[Messages] Send Messages Failure',
  SOCKET_MESSAGES = '[Messages] Socket Messages',
  SOCKET_MESSAGES_SUCCESS = '[Messages] Socket Messages Success',
  SOCKET_MESSAGES_FAILURE = '[Messages] Socket Messages Failure',
  SELECT_CONVERSATION = '[Messages] Select Conversation',
  GET_USERS = '[Messages] Get Users',
  GET_USERS_SUCCESS = '[Messages] Get Users Success',
  GET_USERS_FAILURE = '[Messages] Get Users Failure',
}

export const selectConversation = createAction(
  MessagesActions.SELECT_CONVERSATION,
  props<any>()
);

export const getMessages = createAction(
  MessagesActions.GET_MESSAGES,
  props<any>()
);

export const getMessagesSuccess = createAction(
  MessagesActions.GET_MESSAGES_SUCCESS,
  props<any>()
);

export const getMessagesFailure = createAction(
  MessagesActions.GET_MESSAGES_FAILURE,
  props<any>()
);

export const sendMessages = createAction(
  MessagesActions.SEND_MESSAGES,
  props<any>()
);

export const sendMessagesSuccess = createAction(
  MessagesActions.SEND_MESSAGES_SUCCESS,
  props<any>()
);

export const sendMessagesFailure = createAction(
  MessagesActions.SEND_MESSAGES_FAILURE,
  props<any>()
);

export const socketMessages = createAction(
  MessagesActions.SOCKET_MESSAGES,
  props<any>()
);

export const socketMessagesSuccess = createAction(
  MessagesActions.SOCKET_MESSAGES_SUCCESS,
  props<any>()
);

export const socketMessagesFailure = createAction(
  MessagesActions.SOCKET_MESSAGES_FAILURE,
  props<any>()
);

export const getUsers = createAction(MessagesActions.GET_USERS, props<any>());

export const getUsersSuccess = createAction(
  MessagesActions.GET_USERS_SUCCESS,
  props<any>()
);

export const getUsersFailure = createAction(
  MessagesActions.GET_USERS_FAILURE,
  props<any>()
);
