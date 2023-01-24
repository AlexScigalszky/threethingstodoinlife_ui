import { createReducer, on } from '@ngrx/store';
import { ItemsState, initialState as itemInitialState } from './items/reducer';

// export type AppState = {
//   items: ItemsState;
// };

// export const initialState: AppState = {
//   items: itemInitialState,
// };

// export const itemReducer = createReducer(initialState);

export * from './items/reducer';
