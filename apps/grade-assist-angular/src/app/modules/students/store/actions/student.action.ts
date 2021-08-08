import { createAction, props } from '@ngrx/store';

export enum AdminActions {
  LOAD_ALL_ADMIN = '[Admin] Load all admin',
  LOAD_ALL_ADMIN_SUCCESS = '[Admin] Load all admin success',
  LOAD_ALL_ADMIN_FAILURE = '[Admin] Load all admin failure',
  LOAD_ADMIN_BY_ID = '[Admin] Load teachers by id',
  LOAD_ADMIN_BY_ID_SUCCESS = '[Admin] Load admin by id success',
  LOAD_ADMIN_BY_ID_FAILURE = '[Admin] Load admin by id failure',
  CREATE_ADMIN = '[Admin] Create admin',
  CREATE_ADMIN_SUCCESS = '[Admin] Create admin success',
  CREATE_ADMIN_FAILURE = '[Admin] Create admin failure',
  UPDATE_ADMIN = '[Admin] Update admin',
  UPDATE_ADMIN_SUCCESS = '[Admin] Update admin success',
  UPDATE_ADMIN_FAILURE = '[Admin] Update admin failure',
  DELETE_ADMIN = '[Admin] Delete admin',
  DELETE_ADMIN_SUCCESS = '[Admin] Delete admin success',
  DELETE_ADMIN_FAILURE = '[Admin] Delete admin failure',
}

export const loadAllAdmin = createAction(
  AdminActions.LOAD_ALL_ADMIN,
  props<any>()
);
export const loadAllAdminSuccess = createAction(
  AdminActions.LOAD_ALL_ADMIN_SUCCESS,
  props<any>()
);
export const loadAllAdminFailure = createAction(
  AdminActions.LOAD_ALL_ADMIN_FAILURE,
  props<any>()
);

export const loadAdminById = createAction(
  AdminActions.LOAD_ADMIN_BY_ID,
  props<any>()
);
export const loadAdminByIdSuccess = createAction(
  AdminActions.LOAD_ADMIN_BY_ID_SUCCESS,
  props<any>()
);
export const loadAdminByIdFailure = createAction(
  AdminActions.LOAD_ADMIN_BY_ID_FAILURE,
  props<any>()
);

export const createAdmin = createAction(
  AdminActions.CREATE_ADMIN,
  props<any>()
);
export const createAdminSuccess = createAction(
  AdminActions.CREATE_ADMIN_SUCCESS,
  props<any>()
);
export const createAdminFailure = createAction(
  AdminActions.CREATE_ADMIN_FAILURE,
  props<any>()
);

export const updateAdmin = createAction(
  AdminActions.UPDATE_ADMIN,
  props<any>()
);
export const updateAdminSuccess = createAction(
  AdminActions.UPDATE_ADMIN_SUCCESS,
  props<any>()
);
export const updateAdminFailure = createAction(
  AdminActions.UPDATE_ADMIN_FAILURE,
  props<any>()
);

export const deleteAdmin = createAction(
  AdminActions.DELETE_ADMIN,
  props<any>()
);
export const deleteAdminSuccess = createAction(
  AdminActions.DELETE_ADMIN_SUCCESS,
  props<any>()
);
export const deleteAdminFailure = createAction(
  AdminActions.DELETE_ADMIN_FAILURE,
  props<any>()
);
