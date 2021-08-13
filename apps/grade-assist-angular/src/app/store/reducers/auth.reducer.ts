import { createReducer, on, Action } from '@ngrx/store';
import * as jwt_decode from 'jwt-decode';

import * as fromActions from '../actions';

export interface AuthState {
  loaded: boolean;
  loading: boolean;
  jwt: string;
  userId?: string;
  userType: string;
  userEmail: string;
}

export const initialState: AuthState = {
  loaded: false,
  loading: false,
  jwt: '',
  userId: '',
  userType: '',
  userEmail: '',
};

const authReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({ ...state })),
  on(fromActions.loginSuccess, (state, action) => ({
    ...state,
    jwt: action.payload.token,
    userId: jwt_decode.default<{
      userId: string;
      userType: string;
      email: string;
      exp: string;
    }>(action.payload?.token).userId,
    userType: jwt_decode.default<{
      userId: string;
      userType: string;
      email: string;
      exp: string;
    }>(action.payload?.token).userType,
    userEmail: jwt_decode.default<{
      userId: string;
      userType: string;
      email: string;
      exp: string;
    }>(action.payload?.token).email,
  })),
  on(fromActions.loginFailure, (state) => ({ ...state })),
  on(fromActions.logout, (state) => ({ ...state, jwt: '' })),
  on(fromActions.logoutSuccess, (state) => ({
    ...state,
  })),
  on(fromActions.logoutFailure, (state) => ({ ...state }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  // console.log(jwt_decode.default(action.payload?.token));
  return authReducer(state, action);
}
