import { createReducer, on, Action } from '@ngrx/store';
import { User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface StudentState {
  loaded: boolean;
  loading: boolean;
  studentsList: User[];
  selectedStudent: User | any;
  _id?: string;
}

export const initialState: StudentState = {
  loaded: false,
  loading: false,
  studentsList: [],
  selectedStudent: {},
};

const StudentReducer = createReducer(
  initialState,
  on(fromActions.deleteStudentSuccess, (state, action) => ({
    ...state,
    studentsList: state.studentsList.filter(
      (student) => student._id !== action.payload.id
    ),
  })),
  on(fromActions.loadAllStudentSuccess, (state, action) => ({
    ...state,
    studentsList: action.payload.studentList,
  })),
  on(fromActions.selectStudent, (state, action) => ({
    ...state,
    selectedStudent: action.payload,
  }))
  // on(fromActions.loadAllStudent, (state) => ({ ...state })),
  // on(fromActions.loadAllStudentFailure, (state) => ({ ...state })),
  // on(fromActions.loadStudentById, (state) => ({ ...state })),
  // on(fromActions.loadStudentByIdSuccess, (state) => ({ ...state })),
  // on(fromActions.loadStudentByIdFailure, (state) => ({ ...state })),
  // on(fromActions.createStudent, (state) => ({ ...state })),
  // on(fromActions.createStudentSuccess, (state) => ({ ...state })),
  // on(fromActions.createStudentFailure, (state) => ({ ...state })),
  // on(fromActions.updateStudent, (state) => ({ ...state })),
  // on(fromActions.updateStudentSuccess, (state) => ({ ...state })),
  // on(fromActions.updateStudentFailure, (state) => ({ ...state })),
  // on(fromActions.deleteStudent, (state) => ({ ...state })),
  // on(fromActions.deleteStudentFailure, (state) => ({ ...state }))
);

export function reducer(state: StudentState | undefined, action: Action) {
  return StudentReducer(state, action);
}
