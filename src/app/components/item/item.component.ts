import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';

@Component({
  selector: 'app-item',
  template: `
    <div class="card mb-3" *ngIf="item">
      <div class="card-header">
        <h2
          class="card-title d-flex justify-content-between align-items-center list-group-item-action"
        >
          <div>{{ item.favorites }} Points</div>
          <div>
            <button (click)="vote()" type="button" class="btn  vote-up">
              <i class="icons bi-arrow-up"></i> Vote Up
            </button>
            <button (click)="unvote()" type="button" class="btn vote-down mf-3">
              <i class="icons bi-arrow-down"></i> Vote Down
            </button>
          </div>
        </h2>
      </div>
      <div class="card-body p-0">
        <ul class="list-group">
          <li class="list-group-item">
            <div
              class="d-flex justify-content-between align-items-center list-group-item-action"
            >
              <div>
                <!-- <i class="icons bi-1-circle-fill gold"></i> -->
                {{ item.first }}
              </div>
              <app-item-actions
                *ngIf="isAuthenticated && !item.dones.loading"
                [item]="item"
                [order]="ThingsOrder.first"
                (onDone)="markAsDone(ThingsOrder.first)"
                (onTodo)="markAsTodo(ThingsOrder.first)"
                (onClear)="clear(ThingsOrder.first)"
              >
              </app-item-actions>
            </div>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
          >
            <div>
              <!-- <i class="icons bi-2-circle-fill platinium"></i> -->
              {{ item.second }}
            </div>
            <app-item-actions
              *ngIf="isAuthenticated && !item.dones.loading"
              [item]="item"
              [order]="ThingsOrder.second"
              (onDone)="markAsDone(ThingsOrder.second)"
              (onTodo)="markAsTodo(ThingsOrder.second)"
              (onClear)="clear(ThingsOrder.second)"
            >
            </app-item-actions>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
          >
            <div>
              <!-- <i class="icons bi-3-circle-fill bronce"></i> -->
              {{ item.third }}
            </div>
            <app-item-actions
              *ngIf="isAuthenticated && !item.dones.loading"
              [item]="item"
              [order]="ThingsOrder.third"
              (onDone)="markAsDone(ThingsOrder.third)"
              (onTodo)="markAsTodo(ThingsOrder.third)"
              (onClear)="clear(ThingsOrder.third)"
            >
            </app-item-actions>
          </li>
        </ul>
        <!-- <div class="card-footer">
          <small> {{ item.date }}</small>
        </div> -->
      </div>
    </div>
  `,
})
export class ItemComponent {
  @Input() item?: Item;
  @Input() isAuthenticated: boolean | null = false;
  @Output() onVote = new EventEmitter<string>();
  @Output() onUnvote = new EventEmitter<string>();
  @Output() onMarkAsDone = new EventEmitter<MarkAsDone>();
  @Output() onMarkAsTodo = new EventEmitter<MarkAsDone>();
  @Output() onClear = new EventEmitter<MarkAsDone>();
  ThingsOrder = ThingsOrder;

  vote(): void {
    this.onVote.emit(this.item!.identifier);
  }

  unvote(): void {
    this.onUnvote.emit(this.item!.identifier);
  }

  markAsDone(order: ThingsOrder): void {
    this.onMarkAsDone.emit({
      identifier: this.item!.identifier,
      order,
      userIdentifier: '',
    });
  }

  markAsTodo(order: ThingsOrder): void {
    this.onMarkAsTodo.emit({
      identifier: this.item!.identifier,
      order,
      userIdentifier: '',
    });
  }

  clear(order: ThingsOrder): void {
    this.onClear.emit({
      identifier: this.item!.identifier,
      order,
      userIdentifier: '',
    });
  }
}
