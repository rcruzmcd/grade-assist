import * as authReducer from './index';
import * as messageReducer from '../../modules/messages/store/reducers';

export interface RootState {
  auth: authReducer.AuthState;
  messages: messageReducer.MessagesState;
}
