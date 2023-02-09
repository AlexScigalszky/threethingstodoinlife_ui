import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { NewItem } from 'src/app/models/new-item';

export const load = createAction('[Items] Load');
export const loadSuccess = createAction(
  '[Items] Load Success',
  props<{ items: Item[] }>()
);
export const loadFailure = createAction('[Items] Load Failure');

export const vote = createAction(
  '[Items votes] Vote',
  props<{ identifier: string }>()
);
export const voteSuccess = createAction('[Items votes] Vote Sucess');
export const voteFailure = createAction('[Items votes] Vote Failure');

export const unvote = createAction(
  '[Items votes] Unvote',
  props<{ identifier: string }>()
);
export const unvoteSuccess = createAction('[Items votes] Unvote Sucess');
export const unvoteFailure = createAction('[Items votes] Unvote Failure');

export const newItemFormChange = createAction('[Items Form] Change', props<NewItem>());

export const newItem = createAction('[Items] New', props<NewItem>());
export const newItemSuccess = createAction('[Items] New Sucess');
export const newItemFailure = createAction('[Items] New Failure');
