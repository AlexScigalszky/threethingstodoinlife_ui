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
      ofType(ItemActions.load),
      mergeMap(() =>
        this.itemsService.getAll().pipe(
          tap(console.log),
          map((items) => ItemActions.loadSuccess({ items: items })),
          catchError(() => of(ItemActions.loadFailure()))
        )
      )
    )
  );
}
