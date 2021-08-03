import * as fromReducers from './auth.reducer';

export * from './auth.reducer';
export interface State {
  auth: fromReducers.AuthState;
}
