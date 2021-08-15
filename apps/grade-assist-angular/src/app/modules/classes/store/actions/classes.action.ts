import { createAction, props } from '@ngrx/store';

export enum ClassesAction {
  SELECT_ASSIGNMENT = '[Classes] Select Assignment',
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
  CLEAR_CLASSES = '[Classes] Clear Classes',
  CLEAR_CLASSES_SUCCESS = '[Classes] Clear Classes success',
  CLEAR_CLASSES_FAILURE = '[Classes] Clear Classes failure',
  GET_STUDENTS_NOT_ASSIGNED = '[Classes] Get Student Not Assigned',
  GET_STUDENTS_NOT_ASSIGNED_SUCCESS = '[Classes] Get Student Not Assigned Success',
  GET_STUDENTS_NOT_ASSIGNED_FAILURE = '[Classes] Get Student Not Assigned Failure',
  ADD_STUDENTS = '[Classes] Add Students',
  ADD_STUDENTS_SUCCESS = '[Classes] Add Students Success',
  ADD_STUDENTS_FAILURE = '[Classes] Add Students Failure',
  DELETE_STUDENTS = '[Classes] Delete Students',
  DELETE_STUDENTS_SUCCESS = '[Classes] Delete Students Success',
  DELETE_STUDENTS_FAILURE = '[Classes] Delete Students Failure',
  LOAD_TEACHERS = '[Classes] Load Teachers',
  LOAD_TEACHERS_SUCCESS = '[Classes] Load Teachers Success',
  LOAD_TEACHERS_FAILURE = '[Classes] Load Teachers Failure',
  ADD_ASSIGN = '[Classes] Add Asssign',
  ADD_ASSIGN_SUCCESS = '[Classes] Add Asssign Success',
  ADD_ASSIGN_FAILURE = '[Classes] Add Asssign Failure',
  DELETE_ASSIGN = '[Classes] Delete Asssign',
  DELETE_ASSIGN_SUCCESS = '[Classes] Delete Asssign Success',
  DELETE_ASSIGN_FAILURE = '[Classes] Delete Asssign Failure',
  GET_ASSIGN_GRADES = '[Classes] Get Asssign Grades',
  GET_ASSIGN_GRADES_SUCCESS = '[Classes] Get Asssign Grades Success',
  GET_ASSIGN_GRADES_FAILURE = '[Classes] Get Asssign Grades Failure',
  ADD_GRADE = '[Classes] Add Grade',
  ADD_GRADE_SUCCESS = '[Classes] Add Grade Success',
  ADD_GRADE_FAILURE = '[Classes] Add Grade Failure',
}

export const selectClass = createAction(
  ClassesAction.SELECT_CLASS,
  props<any>()
);

export const selectAssignment = createAction(
  ClassesAction.SELECT_ASSIGNMENT,
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
export const clearClasses = createAction(
  ClassesAction.CLEAR_CLASSES,
  props<any>()
);
export const clearClassesSuccess = createAction(
  ClassesAction.CLEAR_CLASSES_SUCCESS,
  props<any>()
);
export const clearClassesFailure = createAction(
  ClassesAction.CLEAR_CLASSES_FAILURE,
  props<any>()
);
export const getStudetnsNotAssigned = createAction(
  ClassesAction.GET_STUDENTS_NOT_ASSIGNED,
  props<any>()
);
export const getStudetnsNotAssignedSuccess = createAction(
  ClassesAction.GET_STUDENTS_NOT_ASSIGNED_SUCCESS,
  props<any>()
);
export const getStudetnsNotAssignedFailure = createAction(
  ClassesAction.GET_STUDENTS_NOT_ASSIGNED_FAILURE,
  props<any>()
);
export const addStudents = createAction(
  ClassesAction.ADD_STUDENTS,
  props<any>()
);
export const addStudentsSuccess = createAction(
  ClassesAction.ADD_STUDENTS_SUCCESS,
  props<any>()
);
export const addStudentsFailure = createAction(
  ClassesAction.ADD_STUDENTS_FAILURE,
  props<any>()
);

export const deleteStudents = createAction(
  ClassesAction.DELETE_STUDENTS,
  props<any>()
);
export const deleteStudentsSuccess = createAction(
  ClassesAction.DELETE_STUDENTS_SUCCESS,
  props<any>()
);
export const deleteStudentsFailure = createAction(
  ClassesAction.DELETE_STUDENTS_FAILURE,
  props<any>()
);
export const loadTeachers = createAction(
  ClassesAction.LOAD_TEACHERS,
  props<any>()
);
export const loadTeachersSuccess = createAction(
  ClassesAction.LOAD_TEACHERS_SUCCESS,
  props<any>()
);
export const loadTeachersFailure = createAction(
  ClassesAction.LOAD_TEACHERS_FAILURE,
  props<any>()
);
export const addAssign = createAction(ClassesAction.ADD_ASSIGN, props<any>());
export const addAssignSuccess = createAction(
  ClassesAction.ADD_ASSIGN_SUCCESS,
  props<any>()
);
export const addAssignFailure = createAction(
  ClassesAction.ADD_ASSIGN_FAILURE,
  props<any>()
);
export const deleteAssign = createAction(
  ClassesAction.DELETE_ASSIGN,
  props<any>()
);
export const deleteAssignSuccess = createAction(
  ClassesAction.DELETE_ASSIGN_SUCCESS,
  props<any>()
);
export const deleteAssignFailure = createAction(
  ClassesAction.DELETE_ASSIGN_FAILURE,
  props<any>()
);
export const getAssignGrades = createAction(
  ClassesAction.GET_ASSIGN_GRADES,
  props<any>()
);
export const getAssignGradesSuccess = createAction(
  ClassesAction.GET_ASSIGN_GRADES_SUCCESS,
  props<any>()
);
export const getAssignGradesFailure = createAction(
  ClassesAction.GET_ASSIGN_GRADES_FAILURE,
  props<any>()
);
export const addGrade = createAction(ClassesAction.ADD_GRADE, props<any>());
export const addGradeSuccess = createAction(
  ClassesAction.ADD_GRADE_SUCCESS,
  props<any>()
);
export const addGradeFailure = createAction(
  ClassesAction.ADD_GRADE_FAILURE,
  props<any>()
);
