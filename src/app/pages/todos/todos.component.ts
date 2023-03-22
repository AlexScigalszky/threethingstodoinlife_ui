import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, startWith, take, tap } from 'rxjs';

import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';
import { NewItem } from '../../models/new-item';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';
import { ThingsOrder } from 'src/app/enums/things_order.enum';

@Component({
  selector: 'app-todos',
  template: `
    <ng-container *ngIf="{ isAuthenticated: isAuthenticated$ | async } as data">
      <div class="region d-flex justify-content-center">
        <div>
          <h1 class="text-center"></h1>

          <app-spinner class="row" *ngIf="loading$ | async"></app-spinner>

          <div *ngIf="items$ | async as items; else EmptyList">
            <app-item-list [items]="items">
              <ng-template let-item>
                <div class="card mb-3" *ngIf="item.dones.first === false">
                  <div class="card-body">
                    {{ item.first | uppercase }}
                  </div>
                </div>
                <div class="card mb-3" *ngIf="item.dones.second === false">
                  <div class="card-body">
                    {{ item.second | uppercase }}
                  </div>
                </div>
                <div class="card mb-3" *ngIf="item.dones.third === false">
                  <div class="card-body">
                    {{ item.third | uppercase }}
                  </div>
                </div>
              </ng-template>
            </app-item-list>
          </div>

          <ng-template #EmptyList>
            <div class="card mb-3">
              <div class="card-body p-0">
                <p>Empty list</p>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </ng-container>
  `,
})
export class TodosComponent implements OnInit {
  items$ = this.store
    .select(Selectors.selectItemInTodoList)
    .pipe(map((items) => [...items]));
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
  reset$ = this.store
    .select(Selectors.selectResetThreeThingsForm)
    .pipe(startWith(false));
  ThingsOrder = ThingsOrder;

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
