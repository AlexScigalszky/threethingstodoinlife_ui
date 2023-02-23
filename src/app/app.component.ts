import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from './store/selectors';
import * as Actions from './store/actions';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, skip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userName$ = this.store.select(Selectors.selectUsername);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(Actions.subscribeLogin());
    this.store
      .select(Selectors.selectIsAuthenticated)
      .pipe(
        skip(1),
        filter((x) => x),
        distinctUntilChanged()
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  signOut(): void {
    this.store.dispatch(Actions.logout());
    this.router.navigate(['/login']);
  }

  chau() {
    this.router.navigate(['/login']);
  }
}
