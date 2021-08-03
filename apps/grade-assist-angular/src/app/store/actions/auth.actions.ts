import { createAction, props } from '@ngrx/store';

export enum AuthActions {
  LOGIN = '[Login] Login',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_FAILURE = '[Login] Login Failure',
  LOGOUT = '[Logout] Logout',
  LOGOUT_SUCCESS = '[Logout] Logout Success',
  LOGOUT_FAILURE = '[Logout] Logout Failure',
}

export const login = createAction(AuthActions.LOGIN, props<any>());

export const loginSuccess = createAction(
  AuthActions.LOGIN_SUCCESS,
  props<any>()
);

export const loginFailure = createAction(
  AuthActions.LOGIN_FAILURE,
  props<any>()
);

export const logout = createAction(AuthActions.LOGOUT, props<any>());

export const logoutSuccess = createAction(
  AuthActions.LOGOUT_SUCCESS,
  props<any>()
);

export const logoutFailure = createAction(
  AuthActions.LOGOUT_FAILURE,
  props<any>()
);
