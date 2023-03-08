import { createReducer, on } from '@ngrx/store';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
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
        loading: true,
      },
    })),
    loading: false,
  })),
  on(AllActions.loadUserDonesSuccess, (state, action) => ({
    ...state,
    items: state.items.map(
      (item) =>
        ({
          ...item,
          dones: {
            first:
              action.dones.find((d) => d.tttIdentifier === item.identifier)
                ?.doneFirst ?? null,
            second:
              action.dones.find((d) => d.tttIdentifier === item.identifier)
                ?.doneSecond ?? null,
            third:
              action.dones.find((d) => d.tttIdentifier === item.identifier)
                ?.doneThird ?? null,
            loading: false,
          },
        } as ItemStore)
    ),
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
  })),
  on(AllActions.markAsDone, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.identifier === action.identifier) {
        return {
          ...item,
          dones: {
            first: action.order === ThingsOrder.first ? true : item.dones.first,
            second:
              action.order === ThingsOrder.second ? true : item.dones.second,
            third: action.order === ThingsOrder.third ? true : item.dones.third,
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
              action.order === ThingsOrder.first ? false : item.dones.first,
            second:
              action.order === ThingsOrder.second ? false : item.dones.second,
            third:
              action.order === ThingsOrder.third ? false : item.dones.third,
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
