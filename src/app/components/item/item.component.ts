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
          {{ item.first }} -  {{item.dones.first}}
          <div *ngIf="isAuthenticated">
            <button (click)="markAsDone(ThingsOrder.first)">
              I already did 
            </button>
            <button (click)="markAsUndone(ThingsOrder.first)">
              I have never did it
            </button>
          </div>
        </li>
        <li>
          {{ item.second }} - {{item.dones.second}}
          <div *ngIf="isAuthenticated">
            <button (click)="markAsDone(ThingsOrder.second)">
              I already did 
            </button>
            <button (click)="markAsUndone(ThingsOrder.second)">
              I have never did it
            </button>
          </div>
        </li>
        <li>
          {{ item.third }} - {{item.dones.third}}
          <div *ngIf="isAuthenticated">
            <button (click)="markAsDone(ThingsOrder.third)">
              I already did 
            </button>
            <button (click)="markAsUndone(ThingsOrder.third)">
              I have never did it
            </button>
          </div>
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
  @Output() onMarkAsUndone = new EventEmitter<MarkAsDone>();
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

  markAsUndone(order: ThingsOrder): void {
    this.onMarkAsUndone.emit({
      identifier: this.item!.identifier,
      order,
      userIdentifier: '',
    });
  }
}
