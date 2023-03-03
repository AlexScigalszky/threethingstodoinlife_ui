import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-actions',
  template: `
    <div>
      <label>Mark as</label>
      <button *ngIf="item.dones[order] === false || item.dones[order] === null" (click)="markAsDone()">Done</button>
      <button *ngIf="item.dones[order] === true || item.dones[order] === null" (click)="markAsTodo()">To do</button>
      <button *ngIf="item.dones[order] !== null" (click)="clear()">clear</button>
    </div>
  `,
  styles: [
  ]
})
export class ItemActionsComponent {
  @Input() item!: Item;
  @Input() order!: ThingsOrder;

  @Output() onDone = new EventEmitter<boolean>();
  @Output() onTodo = new EventEmitter<boolean>();
  @Output() onClear = new EventEmitter<boolean>();

  markAsDone(): void {
    this.onDone.emit(true);
  }
  
  markAsTodo(): void {
    this.onTodo.emit(true);
  }
  
  clear(): void {
    this.onClear.emit(true);
  }
}
