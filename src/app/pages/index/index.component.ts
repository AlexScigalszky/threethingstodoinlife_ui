import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, startWith } from 'rxjs';

import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';
import { NewItem } from '../../models/new-item';

@Component({
  selector: 'app-index',
  template: `
    <ng-container *ngIf="{ isAuthenticated: isAuthenticated$ | async } as data">
      <div>
        <app-todo-form
          [values]="formValues$ | async"
          (onChanged)="changed($event)"
          (onSubmited)="addNewItem($event)"
        ></app-todo-form>
      </div>

      <div *ngIf="loading$ | async">loading</div>

      <ng-container *ngIf="items$ | async as items">
        <app-item-list [items]="items">
          <ng-template let-item>
            <app-item
              [item]="item"
              (onVote)="vote($event)"
              (onUnvote)="unvote($event)"
              [isAuthenticated]="data.isAuthenticated"
            ></app-item>
          </ng-template>
        </app-item-list>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class IndexComponent implements OnInit {
  items$ = this.store.select(Selectors.selectItemList);
  loading$ = this.store.select(Selectors.selectIsLoading);
  formValues$ = this.store
    .select(Selectors.selectFormValues)
    .pipe(distinctUntilChanged());
  isAuthenticated$ = this.store
    .select(Selectors.selectIsAuthenticated)
    .pipe(startWith(false));

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
