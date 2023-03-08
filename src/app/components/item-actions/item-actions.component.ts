import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-actions',
  template: `
    <div class="actions">
      <button
        [class.disabled]="done"
        (click)="markAsDone()"
        type="button"
        class="btn btn-sm  mr-2"
        [class.btn-success]="done"
        [class.btn-outline-success]="!done"
      >
        Done
      </button>

      <button
        [class.disabled]="todo"
        (click)="markAsTodo()"
        type="button"
        class="btn btn-sm btn-outline-secondary mr-2"
        [class.btn-success]="todo"
        [class.btn-outline-secondary]="!todo"
      >
        To do
      </button>
      <button
        [class.disabled]="reset"
        (click)="clear()"
        type="button"
        class="btn btn-sm btn-link-danger"
        [class.btn-success]="reset"
        [class.btn-outline-secondary]="!reset"
      >
        Reset
      </button>
    </div>
  `,
  styles: ['.actions { min-width: 160px; }'],
})
export class ItemActionsComponent {
  @Input() item!: Item;
  @Input() order!: ThingsOrder;

  @Output() onDone = new EventEmitter<boolean>();
  @Output() onTodo = new EventEmitter<boolean>();
  @Output() onClear = new EventEmitter<boolean>();

  get done() {
    return !(this.item.dones[this.order] === false || this.item.dones[this.order] === null);
  }

  get todo() {
    return !(this.item.dones[this.order] === true || this.item.dones[this.order] === null);
  }

  get reset() {
    return !(this.item.dones[this.order] !== null)
  }
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
