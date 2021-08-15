import {
  createFeature,
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import * as fromReducers from './messages.reducers';

export * from './messages.reducers';
export interface State {
  messages: fromReducers.MessagesState;
}

export const selectMessageFeature = createFeatureSelector<
  State,
  fromReducers.MessagesState
>('messages');
