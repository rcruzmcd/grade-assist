import { createAction, props } from '@ngrx/store';

export enum TeachersActions {
  LOAD_ALL_TEACHERS = '[Teachers] Load all teachers',
  LOAD_ALL_TEACHERS_SUCCESS = '[Teachers] Load all teachers success',
  LOAD_ALL_TEACHERS_FAILURE = '[Teachers] Load all teachers failure',
  LOAD_TEACHERS_BY_ID = '[Teachers] Load teachers by id',
  LOAD_TEACHERS_BY_ID_SUCCESS = '[Teachers] Load teachers by id success',
  LOAD_TEACHERS_BY_ID_FAILURE = '[Teachers] Load teachers by id failure',
  CREATE_TEACHERS = '[Teachers] Create teachers',
  CREATE_TEACHERS_SUCCESS = '[Teachers] Create teachers success',
  CREATE_TEACHERS_FAILURE = '[Teachers] Create teachers failure',
  UPDATE_TEACHERS = '[Teachers] Update teachers',
  UPDATE_TEACHERS_SUCCESS = '[Teachers] Update teachers success',
  UPDATE_TEACHERS_FAILURE = '[Teachers] Update teachers failure',
  DELETE_TEACHERS = '[Teachers] Delete teachers',
  DELETE_TEACHERS_SUCCESS = '[Teachers] Delete teachers success',
  DELETE_TEACHERS_FAILURE = '[Teachers] Delete teachers failure',
}

export const loadAllTeachers = createAction(
  TeachersActions.LOAD_ALL_TEACHERS,
  props<any>()
);
export const loadAllTeachersSuccess = createAction(
  TeachersActions.LOAD_ALL_TEACHERS_SUCCESS,
  props<any>()
);
export const loadAllTeachersFailure = createAction(
  TeachersActions.LOAD_ALL_TEACHERS_FAILURE,
  props<any>()
);

export const loadTeachersById = createAction(
  TeachersActions.LOAD_TEACHERS_BY_ID,
  props<any>()
);
export const loadTeachersByIdSuccess = createAction(
  TeachersActions.LOAD_TEACHERS_BY_ID_SUCCESS,
  props<any>()
);
export const loadTeachersByIdFailure = createAction(
  TeachersActions.LOAD_TEACHERS_BY_ID_FAILURE,
  props<any>()
);

export const createTeachers = createAction(
  TeachersActions.CREATE_TEACHERS,
  props<any>()
);
export const createTeachersSuccess = createAction(
  TeachersActions.CREATE_TEACHERS_SUCCESS,
  props<any>()
);
export const createTeachersFailure = createAction(
  TeachersActions.CREATE_TEACHERS_FAILURE,
  props<any>()
);

export const updateTeachers = createAction(
  TeachersActions.UPDATE_TEACHERS,
  props<any>()
);
export const updateTeachersSuccess = createAction(
  TeachersActions.UPDATE_TEACHERS_SUCCESS,
  props<any>()
);
export const updateTeachersFailure = createAction(
  TeachersActions.UPDATE_TEACHERS_FAILURE,
  props<any>()
);

export const deleteTeachers = createAction(
  TeachersActions.DELETE_TEACHERS,
  props<any>()
);
export const deleteTeachersSuccess = createAction(
  TeachersActions.DELETE_TEACHERS_SUCCESS,
  props<any>()
);
export const deleteTeachersFailure = createAction(
  TeachersActions.DELETE_TEACHERS_FAILURE,
  props<any>()
);
