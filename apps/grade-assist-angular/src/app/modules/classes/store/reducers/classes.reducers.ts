import { createReducer, on, Action } from '@ngrx/store';
import { Classes, User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface ClassesState {
  loaded: boolean;
  loading: boolean;
  classesList: Classes[];
  selectedClass: Classes | any;
  studentsNotInSelected?: User[];
  _id?: string;
}

export const initialState: ClassesState = {
  loaded: false,
  loading: false,
  classesList: [],
  selectedClass: {},
};

const ClassesReducer = createReducer(
  initialState,
  on(fromActions.loadAllClasses, (state) => ({ ...state })),
  on(fromActions.loadAllClassesSuccess, (state, action) => ({
    ...state,
    classesList: action.payload.classes,
  })),
  on(fromActions.loadAllClassesFailure, (state) => ({ ...state })),

  on(fromActions.loadClassesById, (state) => ({ ...state })),
  on(fromActions.loadClassesByIdSuccess, (state) => ({ ...state })),
  on(fromActions.loadClassesByIdFailure, (state) => ({ ...state })),

  on(fromActions.createClasses, (state) => ({ ...state })),
  on(fromActions.createClassesSuccess, (state) => ({ ...state })),
  on(fromActions.createClassesFailure, (state) => ({ ...state })),

  on(fromActions.updateClasses, (state) => ({ ...state })),
  on(fromActions.updateClassesSuccess, (state) => ({ ...state })),
  on(fromActions.updateClassesFailure, (state) => ({ ...state })),

  on(fromActions.deleteClasses, (state) => ({ ...state })),
  on(fromActions.deleteClassesSuccess, (state, action) => ({
    ...state,
    classesList: state.classesList.filter(
      (classes) => classes._id !== action.payload.id
    ),
  })),
  on(fromActions.deleteClassesFailure, (state) => ({ ...state })),
  on(fromActions.selectClass, (state, action) => ({
    ...state,
    selectedClass: action.payload,
  })),
  on(fromActions.getStudetnsNotAssigned, (state) => ({
    ...state,
  })),
  on(fromActions.getStudetnsNotAssignedSuccess, (state, action) => ({
    ...state,
    studentsNotInSelected: action.payload?.studentList.filter(
      (student: any) => !state.selectedClass.students.includes(student._id)
    ),
  })),
  on(fromActions.addStudentsSuccess, (state, action) => ({
    ...state,
    selectedClass: action.payload.class,
  })),
  on(fromActions.addAssignSuccess, (state, action) => ({
    ...state,
    selectedClass: {
      ...state.selectedClass,
      assignments: [...state.selectedClass.assignments, action.payload],
    },
  }))
);

export function reducer(state: ClassesState | undefined, action: Action) {
  return ClassesReducer(state, action);
}
