import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './reducer';

const getUserFeatureState = createFeatureSelector<ItemsState>('items');

export const selectItemList = createSelector(
  getUserFeatureState,
  (state: ItemsState) => state.items
);

export const selectIsLoading = createSelector(
  getUserFeatureState,
  (state: ItemsState) => state.loading
);

export const selectFormValues = createSelector(
  getUserFeatureState,
  (state: ItemsState) => state.threeThingsForm
);

export const selectResetThreeThingsForm = createSelector(
  getUserFeatureState,
  (state: ItemsState) => state.resetThreeThingsForm
);

export const selectItemInTodoList = createSelector(
  getUserFeatureState,
  (state: ItemsState) =>
    state.items.filter(
      (item) =>
        item.dones.first === false ||
        item.dones.second === false ||
        item.dones.third === false
    )
);
