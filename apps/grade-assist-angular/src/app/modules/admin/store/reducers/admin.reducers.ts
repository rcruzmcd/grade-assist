import { createReducer, on, Action } from '@ngrx/store';
import { User } from '@grade-assist/data';

import * as fromActions from '../actions';

export interface AdminState {
  loaded: boolean;
  loading: boolean;
  adminsList: User[];
  selectedAdmin: User | any;
  _id?: string;
}

export const initialState: AdminState = {
  loaded: false,
  loading: false,
  adminsList: [],
  selectedAdmin: {},
};

const AdminReducer = createReducer(
  initialState,
  on(fromActions.loadAllAdminSuccess, (state, action) => ({
    ...state,
    adminsList: action.payload.adminList,
  })),
  on(fromActions.deleteAdminSuccess, (state, action) => ({
    ...state,
    adminsList: state.adminsList.filter(
      (admin) => admin._id !== action.payload.id
    ),
  }))

  // on(fromActions.loadAllAdmin, (state) => ({ ...state })),
  // on(fromActions.loadAllAdminFailure, (state) => ({ ...state })),
  // on(fromActions.loadAdminById, (state) => ({ ...state })),
  // on(fromActions.loadAdminByIdSuccess, (state) => ({ ...state })),
  // on(fromActions.loadAdminByIdFailure, (state) => ({ ...state })),
  // on(fromActions.createAdmin, (state) => ({ ...state })),
  // on(fromActions.createAdminSuccess, (state) => ({ ...state })),
  // on(fromActions.createAdminFailure, (state) => ({ ...state })),
  // on(fromActions.updateAdmin, (state) => ({ ...state })),
  // on(fromActions.updateAdminSuccess, (state) => ({ ...state })),
  // on(fromActions.updateAdminFailure, (state) => ({ ...state })),
  // on(fromActions.deleteAdmin, (state) => ({ ...state })),
  // on(fromActions.deleteAdminFailure, (state) => ({ ...state }))
);

export function reducer(state: AdminState | undefined, action: Action) {
  return AdminReducer(state, action);
}
