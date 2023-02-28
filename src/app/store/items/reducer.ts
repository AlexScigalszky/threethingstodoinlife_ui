import { createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { NewItem } from 'src/app/models/new-item';
import * as ItemActions from './actions';

export type ItemsState = {
  items: Item[];
  loading: boolean;
  threeThingsForm: NewItem;
};

export const initialState: ItemsState = {
  items: [],
  loading: false,
  threeThingsForm: {
    first: '',
    second: '',
    third: '',
    userIdentifier: '',
  },
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
  })),
  on(ItemActions.vote, (state) => ({
    ...state,
    loading: true,
  })),
  on(ItemActions.voteFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(ItemActions.unvote, (state) => ({
    ...state,
    loading: true,
  })),
  on(ItemActions.unvoteFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(ItemActions.newItemFormChange, (state, formValues) => ({
    ...state,
    threeThingsForm: { ...formValues },
  })),
  on(ItemActions.newItem, (state) => ({
    ...state,
    loading: false,
  })),
  on(ItemActions.newItemSuccess, (state) => ({
    ...state,
    loading: true,
    threeThingsForm: {
      first: '',
      second: '',
      third: '',
      userIdentifier: '',
    },
  })),
  on(ItemActions.newItemFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
