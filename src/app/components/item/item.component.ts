import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  template: `
    <div *ngIf="item">
      <h3>{{ item.favorites }} Votes</h3>
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
}
