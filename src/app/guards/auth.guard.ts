import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, mergeMap, Observable, of, take, tap } from 'rxjs';
import * as Selectors from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(Selectors.selectIsAuthenticated).pipe(
      take(1),
      mergeMap((fund) => {
        if (fund) {
          return of(fund);
        } else {
          this.router.navigate(['/login']);
          return EMPTY;
        }
      })
    );
  }
}
