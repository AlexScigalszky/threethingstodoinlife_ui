import { createReducer, on } from '@ngrx/store';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { Item, ItemStore } from 'src/app/models/item';
import { NewItem } from 'src/app/models/new-item';
import * as AllActions from '../actions';

export type ItemsState = {
  items: ItemStore[];
  loading: boolean;
  threeThingsForm: NewItem;
  resetThreeThingsForm: boolean;
};

export const initialState: ItemsState = {
  items: [],
  loading: false,
  resetThreeThingsForm: false,
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
        loading: true,
      },
    })),
    loading: false,
  })),
  on(AllActions.loadUserDonesSuccess, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      const done = action.dones.find(
        (d) => d.tttIdentifier === item.identifier
      );
      return {
        ...item,
        dones: {
          first: done?.doneFirst ?? null,
          second: done?.doneSecond ?? null,
          third: done?.doneThird ?? null,
          loading: false,
        },
      } as ItemStore;
    }),
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
          votes: 1 + Number(item.votes),
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
          votes: Number(item.votes) - 1,
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
          votes: Number(item.votes) - 1,
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
          votes: 1 + Number(item.votes),
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
    resetThreeThingsForm: false,
  })),
  on(AllActions.newItemSuccess, (state) => ({
    ...state,
    resetThreeThingsForm: true,
    threeThingsForm: {
      first: '',
      second: '',
      third: '',
      userIdentifier: '',
    },
  })),
  on(AllActions.newItemFailure, (state) => ({
    ...state,
    resetThreeThingsForm: true,
  })),
  on(AllActions.markAsDone, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          dones: {
            first:
              action.order === ThingsOrder.first
                ? item.dones.first === true
                  ? null
                  : true
                : item.dones.first,
            second:
              action.order === ThingsOrder.second
                ? item.dones.second === true
                  ? null
                  : true
                : item.dones.second,
            third:
              action.order === ThingsOrder.third
                ? item.dones.third === true
                  ? null
                  : true
                : item.dones.third,
            loading: item.dones.loading,
          },
        };
      } else {
        return { ...item };
      }
    }),
  })),
  on(AllActions.markAsTodo, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          dones: {
            first:
              action.order === ThingsOrder.first
                ? item.dones.first === false
                  ? null
                  : false
                : item.dones.first,
            second:
              action.order === ThingsOrder.second
                ? item.dones.second === false
                  ? null
                  : false
                : item.dones.second,
            third:
              action.order === ThingsOrder.third
                ? item.dones.third === false
                  ? null
                  : false
                : item.dones.third,
            loading: item.dones.loading,
          },
        };
      } else {
        return { ...item };
      }
    }),
  })),
  on(AllActions.clear, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          dones: {
            first: action.order === ThingsOrder.first ? null : item.dones.first,
            second:
              action.order === ThingsOrder.second ? null : item.dones.second,
            third: action.order === ThingsOrder.third ? null : item.dones.third,
            loading: item.dones.loading,
          },
        };
      } else {
        return { ...item };
      }
    }),
  }))
);
