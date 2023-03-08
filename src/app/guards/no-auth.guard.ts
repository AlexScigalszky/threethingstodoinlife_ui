import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, Observable, of, take, tap } from 'rxjs';
import * as Selectors from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
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
      map((x) => !x),
      take(1),
      mergeMap((fund) => {
        if (fund) {
          console.log('fund', fund)
        } else {
          console.log('no auth guard')
          this.router.navigate(['/login']);
        }
        return of(fund);
      })
    );
  }
}
