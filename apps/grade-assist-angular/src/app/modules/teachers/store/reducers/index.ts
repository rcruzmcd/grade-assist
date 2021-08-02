import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './teachers.reducers';

export const FeatureKey = 'teachers';

export interface State {
  teachers: fromReducers.TeachersState;
}

export const getState = createFeatureSelector<State>(FeatureKey);
export * from './teachers.reducers';
