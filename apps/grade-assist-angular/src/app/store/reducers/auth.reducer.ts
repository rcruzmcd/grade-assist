import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../actions';

export interface AuthState {
  loaded: boolean;
  loading: boolean;
  jwt: string;
  userId: string;
}

export const initialState: AuthState = {
  loaded: false,
  loading: false,
  jwt: '',
  userId: '',
};

const authReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({ ...state })),
  on(fromActions.loginSuccess, (state, action) => ({
    ...state,
    jwt: action.payload.token,
  })),
  on(fromActions.loginFailure, (state) => ({ ...state }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
