import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';
import * as ItemActions from './actions';

@Injectable()
export class ItemEffects {

  constructor(private actions$: Actions, private itemsService: ItemsService) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.load, ItemActions.voteSuccess, ItemActions.unvoteSuccess, ItemActions.newItemSuccess),
      mergeMap(() =>
        this.itemsService.getAll().pipe(
          map((items) => ItemActions.loadSuccess({ items: items })),
          catchError(() => of(ItemActions.loadFailure()))
        )
      )
    )
  );

  voteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.vote),
      mergeMap(({identifier}) =>
        this.itemsService.vote(identifier).pipe(
          map(() => ItemActions.voteSuccess()),
          catchError((err) => of(ItemActions.voteFailure()))
        )
      )
    )
  );

  unvoteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.unvote),
      mergeMap(({identifier}) =>
        this.itemsService.unvote(identifier).pipe(
          map(() => ItemActions.unvoteSuccess()),
          catchError((err) => of(ItemActions.unvoteFailure()))
        )
      )
    )
  );

  newItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.newItem),
      mergeMap((item) =>
        this.itemsService.add(item).pipe(
          map(() => ItemActions.newItemSuccess()),
          catchError((err) => of(ItemActions.newItemFailure()))
        )
      )
    )
  );
}
