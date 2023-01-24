import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './reducer';

const getUserFeatureState = createFeatureSelector<ItemsState>('items');

export const selectItemList = createSelector(
  getUserFeatureState,
  (state: ItemsState) => state.items
);
