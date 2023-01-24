import { Component, OnInit } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { map, of, tap } from 'rxjs';

import * as Actions from '../app/store/actions';
import * as Selectors from '../app/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'threethingstodoinlife_ui';
  items$ = of([1, 2, 3]);

  constructor(private store: Store) {
    this.items$ = store.select(Selectors.selectItemList).pipe(
      tap(console.log)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(Actions.load());
  }
}
