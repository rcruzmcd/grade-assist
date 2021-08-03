import { createReducer, on, Action } from '@ngrx/store';
import { Teacher } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface TeachersState {
  loaded: boolean;
  loading: boolean;
  teachersList: Teacher[];
  selectedTeacher: Teacher | any;
}

export const initialState: TeachersState = {
  loaded: false,
  loading: false,
  teachersList: [],
  selectedTeacher: {},
};

const teachersReducer = createReducer(
  initialState,
  on(fromActions.loadAllTeachers, (state) => ({ ...state })),
  on(fromActions.loadAllTeachersSuccess, (state, action) => ({
    ...state,
    teachersList: action.payload.teachersList,
  })),
  on(fromActions.loadAllTeachersFailure, (state) => ({ ...state })),

  on(fromActions.loadTeachersById, (state) => ({ ...state })),
  on(fromActions.loadTeachersByIdSuccess, (state) => ({ ...state })),
  on(fromActions.loadTeachersByIdFailure, (state) => ({ ...state })),

  on(fromActions.createTeachers, (state) => ({ ...state })),
  on(fromActions.createTeachersSuccess, (state) => ({ ...state })),
  on(fromActions.createTeachersFailure, (state) => ({ ...state })),

  on(fromActions.updateTeachers, (state) => ({ ...state })),
  on(fromActions.updateTeachersSuccess, (state) => ({ ...state })),
  on(fromActions.updateTeachersFailure, (state) => ({ ...state })),

  on(fromActions.deleteTeachers, (state) => ({ ...state })),
  on(fromActions.deleteTeachersSuccess, (state) => ({ ...state })),
  on(fromActions.deleteTeachersFailure, (state) => ({ ...state }))
);

export function reducer(state: TeachersState | undefined, action: Action) {
  console.log(action);
  return teachersReducer(state, action);
}
