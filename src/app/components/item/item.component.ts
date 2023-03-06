import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';

@Component({
  selector: 'app-item',
  template: `
    <div class="card" *ngIf="item">
      <div class="card-header">
        <h2 class="card-title">{{ item.favorites }} Points</h2>
      </div>
      <div class="card-body">
        <ul class="list-group">
           <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
            <div>
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
          </li>
           <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
            <div>
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
           <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
            <div>
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
        <div class="card-footer">
          <button (click)="vote()" type="button" class="btn btn-success mr-2">
            <i class="icons bi-arrow-up"></i> Vote Up
            
          </button>
          <button (click)="unvote()" type="button" class="btn btn-danger">
          <i class="icons bi-arrow-down"></i> Vote Down
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
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
