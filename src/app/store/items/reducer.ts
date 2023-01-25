import { createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import * as ItemActions from './actions';

export type ItemsState = {
  items: Item[];
  loading: boolean;
};

export const initialState: ItemsState = {
  items: [],
  loading: false,
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(ItemActions.loadSuccess, (state, action) => ({
    ...state,
    items: action.items,
    loading: false,
  })),
  on(ItemActions.loadFailure, (state) => ({
    ...state,
    items: [],
    loading: false,
  }))
);
