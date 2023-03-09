import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThingsOrder } from 'src/app/enums/things_order.enum';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-actions',
  template: `
    <div class="actions">
      <button
        (click)="markAsDone()"
        type="button"
        class="btn btn-sm mr-2 btn-done"
        [class.btn-outline-success]="!done"
        [class.btn-success]="done"
      >
        Done
      </button>

      <button
        (click)="markAsTodo()"
        type="button"
        class="btn btn-sm mr-2 btn-todo"
        [class.btn-outline-primary]="!todo"
        [class.btn-primary]="todo"
      >
        To do
      </button>
<!-- 
      <button
        (click)="clear()"
        type="button"
        class="btn btn-sm btn-link-danger"
      >
        Reset
      </button> -->
    </div>
  `,
  styles: [
    '.actions { min-width: 125px; }',
    'button { margin-left: 10px; margin-rigth: 10px }',
    '.btn-done { color: "#fefefe"; }',
    '.btn-todo { color: "#fefefe"; }',
  ],
})
export class ItemActionsComponent {
  @Input() item!: Item;
  @Input() order!: ThingsOrder;

  @Output() onDone = new EventEmitter<boolean>();
  @Output() onTodo = new EventEmitter<boolean>();
  @Output() onClear = new EventEmitter<boolean>();

  get done() {
    return this.item.dones[this.order] === true;
  }

  get todo() {
    return this.item.dones[this.order] === false;
  }

  // get reset() {
  //   return !(this.item.dones[this.order] !== null);
  // }

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
