import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/item';

export const load = createAction('[Items] Load');
export const loadSuccess = createAction(
  '[Items] Load Success',
  props<{ items: Item[] }>()
);
export const loadFailure = createAction('[Items] Load Failure');
