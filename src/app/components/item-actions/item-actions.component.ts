import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-actions',
  template: `
    <div>
      <small>Mark as </small>
      <button
        *ngIf="item.dones[order] === false || item.dones[order] === null"
        (click)="markAsDone()"
        type="button"
        class="btn btn-sm btn-outline-success mr-2"
      >
      <!-- <i class="icon bi-check2-circle"></i> -->
      Done
      </button>

      <button
        *ngIf="item.dones[order] === true || item.dones[order] === null"
        (click)="markAsTodo()"
        type="button"
        class="btn btn-sm btn-outline-secondary mr-2"
      >
      <!-- <i class="icon bi-question-circle"></i> -->
      To do
      </button>
      <button
        *ngIf="item.dones[order] !== null"
        (click)="clear()"
        type="button"
        class="btn btn-sm btn-link-danger"
      >
        <!-- <i class="icon bi-x"></i> -->
        Clear
      </button>
    </div>
  `,
  styles: [],
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
