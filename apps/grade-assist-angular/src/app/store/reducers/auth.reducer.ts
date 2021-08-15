import { User } from '@grade-assist/data';
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
  user?: User;
}

export const initialState: AuthState = {
  loaded: false,
  loading: false,
  jwt: '',
  userId: '',
  userType: '',
  userEmail: '',
};

interface IJwt {
  userId: string;
  userType: string;
  email: string;
  exp: string;
}

const authReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({ ...state })),
  on(fromActions.loginSuccess, (state, action) => ({
    ...state,
    jwt: action.payload.token,
    userId: action.payload.userId,
    userType: jwt_decode.default<IJwt>(action.payload?.token).userType,
    userEmail: jwt_decode.default<IJwt>(action.payload?.token).email,
  })),
  on(fromActions.loginFailure, (state) => ({ ...state })),
  on(fromActions.logout, (state) => ({ ...state, jwt: '' })),
  on(fromActions.logoutSuccess, (state) => ({
    ...state,
  })),
  on(fromActions.logoutFailure, (state) => ({ ...state })),
  on(fromActions.getUserSuccess, (state, action) => ({
    ...state,
    user: action.payload.user,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  // console.log(jwt_decode.default(action.payload?.token));
  return authReducer(state, action);
}
