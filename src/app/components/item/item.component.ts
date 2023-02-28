import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

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
  @Input() isAuthenticated: boolean | null = false;
  @Output() onVote = new EventEmitter<string>();
  @Output() onUnvote = new EventEmitter<string>();

  vote(): void {
    this.onVote.emit(this.item?.identifier);
  }

  unvote(): void {
    this.onUnvote.emit(this.item?.identifier);
  }
}
