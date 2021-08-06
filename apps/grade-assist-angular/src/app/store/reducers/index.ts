import {
  createFeature,
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import * as fromReducers from './auth.reducer';

export * from './auth.reducer';
export interface State {
  auth: fromReducers.AuthState;
}

export const selectAuthFeature = createFeatureSelector<
  State,
  fromReducers.AuthState
>('auth');
export const selectAuthFeatureToken = createSelector(
  selectAuthFeature,
  (state: fromReducers.AuthState) => state.jwt
);
