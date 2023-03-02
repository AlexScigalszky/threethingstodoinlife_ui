import { createAction, props } from '@ngrx/store';
import { DoneInfo } from 'src/app/models/done_info';
import { Item } from 'src/app/models/item';
import { NewItem } from 'src/app/models/new-item';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';

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
export const voteFailure = createAction(
  '[Items votes] Vote Failure',
  props<{ identifier: string }>()
);

export const unvote = createAction(
  '[Items votes] Unvote',
  props<{ identifier: string }>()
);
export const unvoteSuccess = createAction('[Items votes] Unvote Sucess');
export const unvoteFailure = createAction(
  '[Items votes] Unvote Failure',
  props<{ identifier: string }>()
);

export const newItemFormChange = createAction(
  '[Items Form] Change',
  props<NewItem>()
);

export const newItem = createAction('[Items] New', props<NewItem>());
export const newItemSuccess = createAction('[Items] New Sucess');
export const newItemFailure = createAction('[Items] New Failure');

export const loadUserDones = createAction('[Done] Load user dones');
export const loadUserDonesSuccess = createAction(
  '[Done] Load user dones Success',
  props<{ dones: DoneInfo[] }>()
);
export const loadUserDonesFailure = createAction(
  '[Done] Load user dones Failure'
);

export const markAsDone = createAction(
  '[Done] Mark as Done',
  props<MarkAsDone>()
);
export const markAsDoneSuccess = createAction('[Done] Mark as Done Success');
export const markAsDoneFailure = createAction('[Done] Mark as Done Failure');

export const markAsUndone = createAction(
  '[Done] Mark as Undone',
  props<MarkAsDone>()
);
export const markAsUndoneSuccess = createAction(
  '[Done] Mark as Undone Success'
);
export const markAsUndoneFailure = createAction(
  '[Done] Mark as Undone Failure'
);
