import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private readonly _authService: SocialAuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(() => AuthActions.loginSuccess())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
      of(this._authService.signOut()).pipe(
          map(() => { 
            this.router.navigate(['/login']);
            return AuthActions.logoutSuccess();
          }),
          catchError(() => of(AuthActions.logoutFailure()))
        )
      )
    )
  );

  subscribeLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.subscribeLogin),
      tap(console.log),
      mergeMap(() =>
        this._authService.authState.pipe(
          map((user) => AuthActions.login(user)),
          catchError(() => of(AuthActions.subscribeLoginFailure()))
        )
      )
    )
  );

  refreshAuthToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshAuthToken),
      mergeMap(() =>
        of(
          this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
        ).pipe(
          map(() => AuthActions.refreshAuthTokenSuccess()),
          catchError(() => of(AuthActions.refreshAuthTokenFailure()))
        )
      )
    )
  );
}
