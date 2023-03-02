import { createReducer, on } from '@ngrx/store';
import { Item, ItemStore } from 'src/app/models/item';
import { NewItem } from 'src/app/models/new-item';
import * as AllActions from '../actions';

export type ItemsState = {
  items: ItemStore[];
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
  on(AllActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(AllActions.loadSuccess, (state, action) => ({
    ...state,
    items: action.items.map((item) => ({
      ...item,
      dones: {
        first: null,
        second: null,
        third: null,
      },
    })),
    loading: false,
  })),
  on(AllActions.loadUserDonesSuccess, (state, action) => ({
    ...state,
    items: state.items.map((item) => ({
      ...item,
      dones: {
        first: action.dones.filter((d) => d.doneFirst == true).length > 0,
        second: action.dones.filter((d) => d.doneSecond == true).length > 0,
        third: action.dones.filter((d) => d.doneThird == true).length > 0,
      },
    })),
    loading: false,
  })),
  on(AllActions.loadFailure, (state) => ({
    ...state,
    items: [],
    loading: false,
  })),
  on(AllActions.vote, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          favorites: 1 + Number(item.favorites)
        };
      } else {
        return { ...item };
      }
    }),
  })),
  on(AllActions.voteFailure, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          favorites: Number(item.favorites) - 1
        };
      } else {
        return { ...item };
      }
    }),
  })),
  on(AllActions.unvote, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          favorites: Number(item.favorites) - 1
        };
      } else {
        return { ...item };
      }
    }),
  })),
  on(AllActions.unvoteFailure, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          favorites: 1 + Number(item.favorites)
        };
      } else {
        return { ...item };
      }
    }),
    loading: false,
  })),
  on(AllActions.newItemFormChange, (state, formValues) => ({
    ...state,
    threeThingsForm: { ...formValues },
  })),
  on(AllActions.newItem, (state) => ({
    ...state,
    loading: false,
  })),
  on(AllActions.newItemSuccess, (state) => ({
    ...state,
    loading: true,
    threeThingsForm: {
      first: '',
      second: '',
      third: '',
      userIdentifier: '',
    },
  })),
  on(AllActions.newItemFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
