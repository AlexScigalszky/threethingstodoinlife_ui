import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       tap(console.log)
//     )
//   );

}
