import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './classes.reducers';

export const FeatureKey = 'classes';

export interface State {
  classes: fromReducers.ClassesState;
}

export const getState = createFeatureSelector<State>(FeatureKey);
export * from './classes.reducers';
