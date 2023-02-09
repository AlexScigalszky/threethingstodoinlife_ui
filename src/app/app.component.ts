import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';

import * as Actions from '../app/store/actions';
import * as Selectors from '../app/store/selectors';
import { NewItem } from './models/new-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'threethingstodoinlife_ui';
  items$ = this.store.select(Selectors.selectItemList);
  loading$ = this.store.select(Selectors.selectIsLoading);
  formValues$ = this.store
    .select(Selectors.selectFormValues)
    .pipe(distinctUntilChanged());

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(Actions.load());
  }

  vote(identifier: string): void {
    this.store.dispatch(Actions.vote({ identifier }));
  }

  unvote(identifier: string): void {
    this.store.dispatch(Actions.unvote({ identifier }));
  }

  changed(newItem: NewItem) {
    this.store.dispatch(Actions.newItemFormChange(newItem));
  }

  addNewItem(newItem: NewItem) {
    this.store.dispatch(Actions.newItem(newItem));
  }
}
