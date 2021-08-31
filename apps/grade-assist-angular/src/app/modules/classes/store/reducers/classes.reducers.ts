import { createReducer, on, Action } from '@ngrx/store';
import { assignment, Classes, User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface ClassesState {
  loaded: boolean;
  loading: boolean;
  classesList: Classes[];
  selectedClass: Classes | any;
  studentsNotInSelected?: User[];
  selectedAssign: assignment;
  teacherList: User[];
  _id?: string;
}

export const initialState: ClassesState = {
  loaded: false,
  loading: false,
  classesList: [],
  selectedClass: {},
  teacherList: [],
  selectedAssign: {
    name: '',
    type: '',
    grades: [],
  },
};

const ClassesReducer = createReducer(
  initialState,
  on(fromActions.loadAllClasses, (state) => ({ ...state, loading: true })),
  on(fromActions.loadAllClassesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromActions.loadAllClassesSuccess, (state, action) => ({
    ...state,
    loaded: true,
    classesList: action.payload.classes,
    loading: false,
  })),

  on(fromActions.deleteClassesSuccess, (state, action) => ({
    ...state,
    loaded: true,
    classesList: state.classesList.filter(
      (classes) => classes._id !== action.payload.id
    ),
  })),

  on(fromActions.selectClass, (state, action) => ({
    ...state,
    selectedClass: action.payload,
  })),

  on(fromActions.getStudetnsNotAssignedSuccess, (state, action) => ({
    ...state,
    studentsNotInSelected: action.payload?.studentList.filter(
      (student: any) => !isStudentInClass(state.selectedClass, student._id)
    ),
  })),
  on(fromActions.addStudentsSuccess, (state, action) => ({
    ...state,
    selectedClass: action.payload.class,
  })),
  on(fromActions.deleteStudentsSuccess, (state, action) => ({
    ...state,
    selectedClass: action.payload.class,
  })),
  on(fromActions.clearClassesSuccess, (state, action) => ({
    ...state,
    selectedClass: action.payload.class,
  })),
  on(fromActions.addAssignSuccess, (state, action) => ({
    ...state,
    selectedClass: {
      ...state.selectedClass,
      assignments: [...state.selectedClass.assignments, action.payload],
    },
  })),
  on(fromActions.getAssignGradesSuccess, (state, action) => ({
    ...state,
    selectedAssign: {
      ...state.selectedAssign,
      grades: action.payload.grades,
    },
  })),
  on(fromActions.loadTeachersSuccess, (state, action) => ({
    ...state,
    teacherList: action.payload.teachersList,
  })),
  on(fromActions.addGradeSuccess, (state, action) => ({
    ...state,
    selectedAssign: {
      ...state.selectedAssign,
      grades: [...state.selectedAssign.grades],
    },
  })),

  on(fromActions.selectAssignment, (state, action) => ({
    ...state,
    selectedAssign: action.payload,
  }))

  // on(fromActions.loadClassesById, (state) => ({ ...state })),
  // on(fromActions.loadClassesByIdSuccess, (state) => ({ ...state })),
  // on(fromActions.loadClassesByIdFailure, (state) => ({ ...state })),
  // on(fromActions.createClasses, (state) => ({ ...state })),
  // on(fromActions.createClassesSuccess, (state) => ({ ...state })),
  // on(fromActions.createClassesFailure, (state) => ({ ...state })),
  // on(fromActions.updateClasses, (state) => ({ ...state })),
  // on(fromActions.updateClassesSuccess, (state) => ({ ...state })),
  // on(fromActions.updateClassesFailure, (state) => ({ ...state })),
  // on(fromActions.deleteClasses, (state) => ({ ...state })),
  // on(fromActions.deleteClassesFailure, (state) => ({ ...state })),
  // on(fromActions.getStudetnsNotAssigned, (state) => ({
  //   ...state,
  // })),
);

export function reducer(state: ClassesState | undefined, action: Action) {
  return ClassesReducer(state, action);
}

const isStudentInClass = (_class: any, studentId: any) => {
  for (const classStu of _class.students) {
    if (classStu._id == studentId) return true;
  }
  return false;
};
