import { createAction, props } from '@ngrx/store';

export enum ClassesAction {
  SELECT_CLASS = '[Classes] Select Class',
  LOAD_ALL_CLASSES = '[Classes] Load all Classes',
  LOAD_ALL_CLASSES_SUCCESS = '[Classes] Load all Classes success',
  LOAD_ALL_CLASSES_FAILURE = '[Classes] Load all Classes failure',
  LOAD_CLASSES_BY_ID = '[Classes] Load teachers by id',
  LOAD_CLASSES_BY_ID_SUCCESS = '[Classes] Load Classes by id success',
  LOAD_CLASSES_BY_ID_FAILURE = '[Classes] Load Classes by id failure',
  CREATE_CLASSES = '[Classes] Create Classes',
  CREATE_CLASSES_SUCCESS = '[Classes] Create Classes success',
  CREATE_CLASSES_FAILURE = '[Classes] Create Classes failure',
  UPDATE_CLASSES = '[Classes] Update Classes',
  UPDATE_CLASSES_SUCCESS = '[Classes] Update Classes success',
  UPDATE_CLASSES_FAILURE = '[Classes] Update Classes failure',
  DELETE_CLASSES = '[Classes] Delete Classes',
  DELETE_CLASSES_SUCCESS = '[Classes] Delete Classes success',
  DELETE_CLASSES_FAILURE = '[Classes] Delete Classes failure',
}

export const selectClass = createAction(
  ClassesAction.SELECT_CLASS,
  props<any>()
);

export const loadAllClasses = createAction(
  ClassesAction.LOAD_ALL_CLASSES,
  props<any>()
);
export const loadAllClassesSuccess = createAction(
  ClassesAction.LOAD_ALL_CLASSES_SUCCESS,
  props<any>()
);
export const loadAllClassesFailure = createAction(
  ClassesAction.LOAD_ALL_CLASSES_FAILURE,
  props<any>()
);

export const loadClassesById = createAction(
  ClassesAction.LOAD_CLASSES_BY_ID,
  props<any>()
);
export const loadClassesByIdSuccess = createAction(
  ClassesAction.LOAD_CLASSES_BY_ID_SUCCESS,
  props<any>()
);
export const loadClassesByIdFailure = createAction(
  ClassesAction.LOAD_CLASSES_BY_ID_FAILURE,
  props<any>()
);

export const createClasses = createAction(
  ClassesAction.CREATE_CLASSES,
  props<any>()
);
export const createClassesSuccess = createAction(
  ClassesAction.CREATE_CLASSES_SUCCESS,
  props<any>()
);
export const createClassesFailure = createAction(
  ClassesAction.CREATE_CLASSES_FAILURE,
  props<any>()
);

export const updateClasses = createAction(
  ClassesAction.UPDATE_CLASSES,
  props<any>()
);
export const updateClassesSuccess = createAction(
  ClassesAction.UPDATE_CLASSES_SUCCESS,
  props<any>()
);
export const updateClassesFailure = createAction(
  ClassesAction.UPDATE_CLASSES_FAILURE,
  props<any>()
);

export const deleteClasses = createAction(
  ClassesAction.DELETE_CLASSES,
  props<any>()
);
export const deleteClassesSuccess = createAction(
  ClassesAction.DELETE_CLASSES_SUCCESS,
  props<any>()
);
export const deleteClassesFailure = createAction(
  ClassesAction.DELETE_CLASSES_FAILURE,
  props<any>()
);
