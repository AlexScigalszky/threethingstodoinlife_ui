import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  template: `
    <div *ngIf="item">
      <h3>
        {{ item.favorites }} Votes
        <button (click)="vote()">Vote</button>
        <button (click)="unvote()">Un vote</button>
      </h3>
      <ul>
        <li>{{ item.first }}</li>
        <li>{{ item.second }}</li>
        <li>{{ item.third }}</li>
      </ul>
    </div>
  `,
  styles: [],
})
export class ItemComponent {
  @Input() item?: Item;
  @Output() onVote = new EventEmitter<string>();
  @Output() onUnvote = new EventEmitter<string>();

  vote(): void {
    this.onVote.emit(this.item?.identifier);
  }

  unvote(): void {
    this.onUnvote.emit(this.item?.identifier);
  }
}
