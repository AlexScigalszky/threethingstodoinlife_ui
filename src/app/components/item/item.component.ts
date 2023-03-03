import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { MarkAsDone } from 'src/app/types/mark_as_done.type';

@Component({
  selector: 'app-item',
  template: `
    <div *ngIf="item">
      <h3>
        {{ item.favorites }} Votes
        <div *ngIf="isAuthenticated">
          <button (click)="vote()">Vote Up</button>
          <button (click)="unvote()">Vote Down</button>
        </div>
      </h3>
      <ul>
        <hr />
        <li>
          {{ item.first }}
          <app-item-actions
            *ngIf="isAuthenticated"
            [item]="item"
            [order]="ThingsOrder.first"
            (onDone)="markAsDone(ThingsOrder.first)"
            (onTodo)="markAsTodo(ThingsOrder.first)"
            (onClear)="clear(ThingsOrder.first)"
          >
          </app-item-actions>
        </li>
        <li>
          {{ item.second }}
          <app-item-actions
            *ngIf="isAuthenticated"
            [item]="item"
            [order]="ThingsOrder.second"
            (onDone)="markAsDone(ThingsOrder.second)"
            (onTodo)="markAsTodo(ThingsOrder.second)"
            (onClear)="clear(ThingsOrder.second)"
          >
          </app-item-actions>
        </li>
        <li>
          {{ item.third }}
          <app-item-actions
            *ngIf="isAuthenticated"
            [item]="item"
            [order]="ThingsOrder.third"
            (onDone)="markAsDone(ThingsOrder.third)"
            (onTodo)="markAsTodo(ThingsOrder.third)"
            (onClear)="clear(ThingsOrder.third)"
          >
          </app-item-actions>
        </li>
      </ul>
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
