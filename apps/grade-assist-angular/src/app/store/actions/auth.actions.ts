import { createAction, props } from '@ngrx/store';

export enum AuthActions {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
  GET_USER = '[Auth] Get User',
  GET_USER_SUCCESS = '[Auth] Get User Success',
  GET_USER_FAILURE = '[Auth] Get User Failure',
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

export const getUser = createAction(AuthActions.GET_USER, props<any>());

export const getUserSuccess = createAction(
  AuthActions.GET_USER_SUCCESS,
  props<any>()
);

export const getUserFailure = createAction(
  AuthActions.GET_USER_FAILURE,
  props<any>()
);
