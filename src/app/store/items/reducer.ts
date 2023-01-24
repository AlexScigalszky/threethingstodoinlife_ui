import { createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import * as ItemActions from './actions';

export type ItemsState = {
  items: Item[];
};

export const initialState: ItemsState = {
  items: [],
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.load, (state) => state),
  on(ItemActions.loadSuccess, (state, action) => ({
    ...state,
    items: action.items,
  })),
  on(ItemActions.loadFailure, (state) => ({
    ...state,
    items: [],
  }))
);
