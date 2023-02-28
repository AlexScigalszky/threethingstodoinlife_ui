import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  tap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';
import * as AllActions from './actions';
import * as AllSelectors from '../selectors';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
    private store: Store
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AllActions.load,
        AllActions.voteSuccess,
        AllActions.unvoteSuccess,
        AllActions.newItemSuccess
      ),
      mergeMap(() =>
        this.itemsService.getAll().pipe(
          map((items) => AllActions.loadSuccess({ items: items })),
          catchError(() => of(AllActions.loadFailure()))
        )
      )
    )
  );

  voteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllActions.vote),
      withLatestFrom(this.store.select(AllSelectors.selectUserIdentifier)),
      filter(([item, userIdentifier]) => userIdentifier !== null),
      mergeMap(([{ identifier }, userIdentifier]) =>
        this.itemsService.vote(identifier, userIdentifier!).pipe(
          map(() => AllActions.voteSuccess()),
          catchError((err) => of(AllActions.voteFailure()))
        )
      )
    )
  );

  unvoteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllActions.unvote),
      withLatestFrom(this.store.select(AllSelectors.selectUserIdentifier)),
      filter(([item, userIdentifier]) => userIdentifier !== null),
      mergeMap(([{ identifier }, userIdentifier]) =>
        this.itemsService.unvote(identifier, userIdentifier!).pipe(
          map(() => AllActions.unvoteSuccess()),
          catchError((err) => of(AllActions.unvoteFailure()))
        )
      )
    )
  );

  newItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllActions.newItem),
      withLatestFrom(this.store.select(AllSelectors.selectUserIdentifier)),
      filter(([item, userIdentifier]) => userIdentifier !== null),
      mergeMap(([item, userIdentifier]) => {
        return this.itemsService.add(item, userIdentifier!).pipe(
          map(() => AllActions.newItemSuccess()),
          catchError((err) => of(AllActions.newItemFailure()))
        );
      })
    )
  );
}
