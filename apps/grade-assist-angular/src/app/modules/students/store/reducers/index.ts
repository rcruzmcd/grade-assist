import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './admin.reducers';

export const FeatureKey = 'admin';

export interface State {
  admin: fromReducers.AdminState;
}

export const getState = createFeatureSelector<State>(FeatureKey);
export * from './admin.reducers';
