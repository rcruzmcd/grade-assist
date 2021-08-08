import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './student.reducers';

export const FeatureKey = 'student';

export interface State {
  student: fromReducers.StudentState;
}

export const getState = createFeatureSelector<State>(FeatureKey);
export * from './student.reducers';
