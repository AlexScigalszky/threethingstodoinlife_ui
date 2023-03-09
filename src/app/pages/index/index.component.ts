import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, startWith, take } from 'rxjs';

import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';
import { NewItem } from '../../models/new-item';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';

@Component({
  selector: 'app-index',
  template: `
    <ng-container *ngIf="{ isAuthenticated: isAuthenticated$ | async } as data">
      <h1 class="display-1 text-center p-5">
        The three thing everybody have to do in life
      </h1>

      <div class="region d-flex justify-content-center p-2">
        <app-todo-form
          [values]="formValues$ | async"
          (onChanged)="changed($event)"
          (onSubmited)="addNewItem($event)"
        ></app-todo-form>
      </div>

      <div class="region d-flex justify-content-center">
        <div>
          <h1 class="text-center">What people say</h1>

          <app-spinner class="row" *ngIf="loading$ | async"></app-spinner>

          <ng-container *ngIf="items$ | async as items">
            <app-item-list [items]="items">
              <ng-template let-item>
                <app-item
                  [item]="item"
                  (onVote)="vote($event)"
                  (onUnvote)="unvote($event)"
                  (onMarkAsDone)="markAsDone($event)"
                  (onMarkAsTodo)="markAsTodo($event)"
                  (onClear)="clear($event)"
                  [isAuthenticated]="data.isAuthenticated"
                ></app-item>
              </ng-template>
            </app-item-list>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `,
  styles: ['.main-title { font-size:7rem; }', '.region { min-height: 45vh; }'],
})
export class IndexComponent implements OnInit {
  items$ = this.store.select(Selectors.selectItemList).pipe(
    map((items) => [...items]),
    map((items) => items.sort((a, b) => b.votes - a.votes))
  );
  loading$ = this.store.select(Selectors.selectIsLoading);
  formValues$ = this.store
    .select(Selectors.selectFormValues)
    .pipe(distinctUntilChanged());
  isAuthenticated$ = this.store
    .select(Selectors.selectIsAuthenticated)
    .pipe(startWith(false));
  userIdentifier$ = this.store.select(Selectors.selectUserIdentifier).pipe(
    filter((userIdentifier) => userIdentifier !== null),
    take(1)
  );

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

  markAsDone(data: MarkAsDone): void {
    this.userIdentifier$.subscribe((userIdentifier) => {
      this.store.dispatch(
        Actions.markAsDone({
          ...data,
          userIdentifier: userIdentifier!,
        })
      );
    });
  }

  markAsTodo(data: MarkAsDone): void {
    this.userIdentifier$.subscribe((userIdentifier) => {
      this.store.dispatch(
        Actions.markAsTodo({
          ...data,
          userIdentifier: userIdentifier!,
        })
      );
    });
  }

  clear(data: MarkAsDone): void {
    this.userIdentifier$.subscribe((userIdentifier) => {
      this.store.dispatch(
        Actions.clear({
          ...data,
          userIdentifier: userIdentifier!,
        })
      );
    });
  }
}
