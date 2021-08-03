import { createAction, props } from '@ngrx/store';

export enum AuthActions {
  LOGIN = '[Login] Login',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_FAILURE = '[Login] Login Failure',
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
