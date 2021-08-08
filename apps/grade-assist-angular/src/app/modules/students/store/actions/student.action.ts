import { createAction, props } from '@ngrx/store';

export enum StudentActions {
  LOAD_ALL_STUDENT = '[Student] Load all Student',
  LOAD_ALL_STUDENT_SUCCESS = '[Student] Load all Student success',
  LOAD_ALL_STUDENT_FAILURE = '[Student] Load all Student failure',
  LOAD_STUDENT_BY_ID = '[Student] Load teachers by id',
  LOAD_STUDENT_BY_ID_SUCCESS = '[Student] Load Student by id success',
  LOAD_STUDENT_BY_ID_FAILURE = '[Student] Load Student by id failure',
  CREATE_STUDENT = '[Student] Create Student',
  CREATE_STUDENT_SUCCESS = '[Student] Create Student success',
  CREATE_STUDENT_FAILURE = '[Student] Create Student failure',
  UPDATE_STUDENT = '[Student] Update Student',
  UPDATE_STUDENT_SUCCESS = '[Student] Update Student success',
  UPDATE_STUDENT_FAILURE = '[Student] Update Student failure',
  DELETE_STUDENT = '[Student] Delete Student',
  DELETE_STUDENT_SUCCESS = '[Student] Delete Student success',
  DELETE_STUDENT_FAILURE = '[Student] Delete Student failure',
}

export const loadAllStudent = createAction(
  StudentActions.LOAD_ALL_STUDENT,
  props<any>()
);
export const loadAllStudentSuccess = createAction(
  StudentActions.LOAD_ALL_STUDENT_SUCCESS,
  props<any>()
);
export const loadAllStudentFailure = createAction(
  StudentActions.LOAD_ALL_STUDENT_FAILURE,
  props<any>()
);

export const loadStudentById = createAction(
  StudentActions.LOAD_STUDENT_BY_ID,
  props<any>()
);
export const loadStudentByIdSuccess = createAction(
  StudentActions.LOAD_STUDENT_BY_ID_SUCCESS,
  props<any>()
);
export const loadStudentByIdFailure = createAction(
  StudentActions.LOAD_STUDENT_BY_ID_FAILURE,
  props<any>()
);

export const createStudent = createAction(
  StudentActions.CREATE_STUDENT,
  props<any>()
);
export const createStudentSuccess = createAction(
  StudentActions.CREATE_STUDENT_SUCCESS,
  props<any>()
);
export const createStudentFailure = createAction(
  StudentActions.CREATE_STUDENT_FAILURE,
  props<any>()
);

export const updateStudent = createAction(
  StudentActions.UPDATE_STUDENT,
  props<any>()
);
export const updateStudentSuccess = createAction(
  StudentActions.UPDATE_STUDENT_SUCCESS,
  props<any>()
);
export const updateStudentFailure = createAction(
  StudentActions.UPDATE_STUDENT_FAILURE,
  props<any>()
);

export const deleteStudent = createAction(
  StudentActions.DELETE_STUDENT,
  props<any>()
);
export const deleteStudentSuccess = createAction(
  StudentActions.DELETE_STUDENT_SUCCESS,
  props<any>()
);
export const deleteStudentFailure = createAction(
  StudentActions.DELETE_STUDENT_FAILURE,
  props<any>()
);
